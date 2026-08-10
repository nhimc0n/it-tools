// Core logic: Tính thuế VAT (Thuận & Ngược) với quy tắc làm tròn theo Nghị định 174/2016/NĐ-CP (Round-Half-Up đến hàng đơn vị đồng)

export const MAX_AMOUNT = 1_000_000_000_000; // 1.000 tỷ VNĐ

export type VatMode = 'forward' | 'reverse';

export interface VatResult {
  mode: VatMode;
  ratePercent: number;
  amountBeforeTax: number;
  vatAmount: number;
  amountAfterTax: number;
}

/**
 * Làm tròn số theo quy tắc Round Half Up (Nghị định 174/2016/NĐ-CP) đến hàng đơn vị (đồng)
 */
export function roundHalfUp(val: number): number {
  // Thêm EPSILON nhỏ để khắc phục lỗi sai số điểm động (floating-point representation error) của JS
  return Math.floor(val + 0.5 + Number.EPSILON);
}

/**
 * Tính toán thuế VAT
 * @param mode 'forward' (nhập trước thuế) hoặc 'reverse' (nhập sau thuế)
 * @param inputAmount Số tiền nhập vào
 * @param ratePercent Thuế suất (%)
 */
export function calculateVat(mode: VatMode, inputAmount: number, ratePercent: number): VatResult {
  if (inputAmount < 0) {
    throw new Error('Số tiền không được âm');
  }

  if (inputAmount > MAX_AMOUNT) {
    throw new Error('Số tiền nhập vào vượt quá giới hạn 1.000 tỷ VNĐ');
  }

  if (ratePercent < 0) {
    throw new Error('Thuế suất không được âm');
  }

  const rateDecimal = ratePercent / 100;

  let beforeTaxUnrounded = 0;
  let vatUnrounded = 0;
  let afterTaxUnrounded = 0;

  if (mode === 'forward') {
    beforeTaxUnrounded = inputAmount;
    vatUnrounded = inputAmount * rateDecimal;
    afterTaxUnrounded = inputAmount + vatUnrounded;
  } else {
    afterTaxUnrounded = inputAmount;
    const onePlusRate = 1 + rateDecimal;
    if (onePlusRate === 0) {
      throw new Error('Thuế suất không hợp lệ');
    }
    beforeTaxUnrounded = inputAmount / onePlusRate;
    vatUnrounded = inputAmount - beforeTaxUnrounded;
  }

  const amountBeforeTax = roundHalfUp(beforeTaxUnrounded);
  const vatAmount = roundHalfUp(vatUnrounded);
  const amountAfterTax = roundHalfUp(afterTaxUnrounded);

  return {
    mode,
    ratePercent,
    amountBeforeTax,
    vatAmount,
    amountAfterTax,
  };
}
