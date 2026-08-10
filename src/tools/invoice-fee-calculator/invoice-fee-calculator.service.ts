export interface InvoiceFeeInput {
  sellingPrice: number; // Giá bán thực tế (Chưa VAT)
  invoicePrice: number; // Giá xuất hóa đơn (Chưa VAT)
  feeRatePercent: number; // Tỷ lệ phí xuất hóa đơn (%) - VD: 20%
  vatRatePercent: number; // Thuế suất VAT (%) - VD: 10%
}

export interface InvoiceFeeResult {
  sellingPrice: number; // Giá bán thực tế
  invoicePrice: number; // Giá xuất hóa đơn
  difference: number; // Chênh lệch (Giá xuất - Giá bán)
  feeAmount: number; // Tiền phí xuất hóa đơn (Chênh lệch * %phí)
  vatAmount: number; // Tiền thuế VAT (Giá xuất * %VAT)
  extraFeeTotal: number; // Tổng chi phí khách chịu thêm (Phí + VAT)
  totalInvoiceAmount: number; // Tổng giá trị hóa đơn (Giá xuất + VAT)
  actualCustomerPayment: number; // Tổng tiền thực tế khách cần trả (Giá bán + Phí + VAT)
  refundAmount: number; // Tiền thừa bên bán hoàn lại cho khách (Tổng hóa đơn - Thực trả)
}

export function calculateInvoiceFee(input: InvoiceFeeInput): InvoiceFeeResult {
  const sellingPrice = Math.max(0, input.sellingPrice || 0);
  const invoicePrice = Math.max(0, input.invoicePrice || 0);
  const feeRatePercent = Math.max(0, input.feeRatePercent || 0);
  const vatRatePercent = Math.max(0, input.vatRatePercent || 0);

  const difference = Math.max(0, invoicePrice - sellingPrice);
  const feeAmount = Math.round(difference * (feeRatePercent / 100));
  const vatAmount = Math.round(invoicePrice * (vatRatePercent / 100));
  const extraFeeTotal = feeAmount + vatAmount;
  const totalInvoiceAmount = invoicePrice + vatAmount;
  const actualCustomerPayment = sellingPrice + extraFeeTotal;
  const refundAmount = Math.max(0, totalInvoiceAmount - actualCustomerPayment);

  return {
    sellingPrice,
    invoicePrice,
    difference,
    feeAmount,
    vatAmount,
    extraFeeTotal,
    totalInvoiceAmount,
    actualCustomerPayment,
    refundAmount,
  };
}
