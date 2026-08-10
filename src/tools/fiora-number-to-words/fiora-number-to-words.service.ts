// Core logic: Đổi số tiền sang chữ Tiếng Việt và Tiếng Trung Đại Tả (Client-side TS)

export const MAX_AMOUNT = 1_000_000_000_000; // 1.000 tỷ VNĐ

const DIGITS_VI = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
const DIGITS_ZH = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];

/**
 * Đổi số tiền (VNĐ) thành chữ Tiếng Việt
 */
export function convertVi(amount: number): string {
  if (amount > MAX_AMOUNT) {
    throw new Error(`Số tiền vượt quá giới hạn cho phép (Tối đa 1.000 tỷ VNĐ)`);
  }

  if (amount < 0) {
    throw new Error('Số tiền không được âm');
  }

  if (amount === 0) {
    return 'Không đồng';
  }

  const nghinTy = Math.floor(amount / 1_000_000_000_000);
  let rem1 = amount % 1_000_000_000_000;

  const ty = Math.floor(rem1 / 1_000_000_000);
  let rem2 = rem1 % 1_000_000_000;

  const trieu = Math.floor(rem2 / 1_000_000);
  let rem3 = rem2 % 1_000_000;

  const nghin = Math.floor(rem3 / 1_000);
  const donVi = rem3 % 1_000;

  const parts: string[] = [];
  let hasHigher = false;

  if (nghinTy > 0) {
    parts.push(`${readThreeDigitsVi(nghinTy, !hasHigher)} nghìn tỷ`);
    hasHigher = true;
  }

  if (ty > 0) {
    parts.push(`${readThreeDigitsVi(ty, !hasHigher)} tỷ`);
    hasHigher = true;
  }

  if (trieu > 0) {
    parts.push(`${readThreeDigitsVi(trieu, !hasHigher)} triệu`);
    hasHigher = true;
  }

  if (nghin > 0) {
    parts.push(`${readThreeDigitsVi(nghin, !hasHigher)} nghìn`);
    hasHigher = true;
  }

  if (donVi > 0) {
    parts.push(readThreeDigitsVi(donVi, !hasHigher));
  }

  let result = parts.join(' ') + ' đồng';
  result = result.charAt(0).toUpperCase() + result.slice(1);
  return result;
}

function readThreeDigitsVi(n: number, isHighest: boolean): string {
  const h = Math.floor(n / 100);
  const t = Math.floor((n % 100) / 10);
  const u = n % 10;

  const result: string[] = [];

  // Hàng trăm
  if (h > 0) {
    result.push(`${DIGITS_VI[h]} trăm`);
  } else if (!isHighest) {
    result.push('không trăm');
  }

  // Hàng chục & đơn vị
  if (t === 0) {
    if (u > 0) {
      if (h > 0 || !isHighest) {
        result.push(`lẻ ${DIGITS_VI[u]}`);
      } else {
        result.push(DIGITS_VI[u]);
      }
    }
  } else if (t === 1) {
    result.push('mười');
    if (u === 5) {
      result.push('lăm');
    } else if (u > 0) {
      result.push(DIGITS_VI[u]);
    }
  } else {
    result.push(`${DIGITS_VI[t]} mươi`);
    if (u === 1) {
      result.push('mốt');
    } else if (u === 4) {
      result.push('tư');
    } else if (u === 5) {
      result.push('lăm');
    } else if (u > 0) {
      result.push(DIGITS_VI[u]);
    }
  }

  return result.join(' ');
}

/**
 * Đổi số tiền (VNĐ) thành chữ Tiếng Trung (Đại tả)
 */
export function convertZh(amount: number): string {
  if (amount > MAX_AMOUNT) {
    throw new Error('Số tiền vượt quá giới hạn cho phép (Tối đa 1.000 tỷ)');
  }

  if (amount < 0) {
    throw new Error('Số tiền không được âm');
  }

  if (amount === 0) {
    return '零元整';
  }

  const wanYi = Math.floor(amount / 1_000_000_000_000);
  let rem1 = amount % 1_000_000_000_000;

  const yi = Math.floor(rem1 / 100_000_000);
  let rem2 = rem1 % 100_000_000;

  const wan = Math.floor(rem2 / 10_000);
  const donVi = rem2 % 10_000;

  let result = '';
  let prevEndedWithZero = false;
  let hasHigher = false;

  // 1. 万亿
  if (wanYi > 0) {
    const { str, endZero } = convertSection4Zh(wanYi);
    result += str + '万亿';
    hasHigher = true;
    prevEndedWithZero = endZero;
  }

  // 2. 亿
  if (yi > 0) {
    const { str, startZero, endZero } = convertSection4Zh(yi);
    if (hasHigher && (prevEndedWithZero || startZero)) {
      result += '零';
    }
    result += str + '亿';
    hasHigher = true;
    prevEndedWithZero = endZero;
  } else if (hasHigher && (wan > 0 || donVi > 0)) {
    prevEndedWithZero = true;
  }

  // 3. 万
  if (wan > 0) {
    const { str, startZero, endZero } = convertSection4Zh(wan);
    if (hasHigher && (prevEndedWithZero || startZero)) {
      result += '零';
    }
    result += str + '万';
    hasHigher = true;
    prevEndedWithZero = endZero;
  } else if (hasHigher && donVi > 0) {
    prevEndedWithZero = true;
  }

  // 4. Hàng đơn vị (1 - 9999)
  if (donVi > 0) {
    const { str, startZero } = convertSection4Zh(donVi);
    if (hasHigher && (prevEndedWithZero || startZero)) {
      result += '零';
    }
    result += str;
  }

  result += '元整';
  return result;
}

function convertSection4Zh(n: number): { str: string; startZero: boolean; endZero: boolean } {
  if (n === 0) {
    return { str: '', startZero: false, endZero: true };
  }

  const d3 = Math.floor(n / 1000);
  const d2 = Math.floor((n % 1000) / 100);
  const d1 = Math.floor((n % 100) / 10);
  const d0 = n % 10;

  let res = '';
  let zeroPending = false;
  let hasWritten = false;

  if (d3 > 0) {
    res += DIGITS_ZH[d3] + '仟';
    hasWritten = true;
  }

  if (d2 > 0) {
    if (hasWritten && zeroPending) {
      res += '零';
      zeroPending = false;
    }
    res += DIGITS_ZH[d2] + '佰';
    hasWritten = true;
  } else if (hasWritten) {
    zeroPending = true;
  }

  if (d1 > 0) {
    if (hasWritten && zeroPending) {
      res += '零';
      zeroPending = false;
    }
    res += DIGITS_ZH[d1] + '拾';
    hasWritten = true;
  } else if (hasWritten) {
    zeroPending = true;
  }

  if (d0 > 0) {
    if (hasWritten && zeroPending) {
      res += '零';
    }
    res += DIGITS_ZH[d0];
  }

  return {
    str: res,
    startZero: d3 === 0,
    endZero: d0 === 0,
  };
}

const UNITS_EN = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const TENS_EN = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

/**
 * Đổi số tiền (VNĐ) thành chữ Tiếng Anh (Chuẩn Kế toán)
 */
export function convertEn(amount: number): string {
  if (amount > MAX_AMOUNT) {
    throw new Error('Số tiền vượt quá giới hạn cho phép (Tối đa 1.000 tỷ VNĐ)');
  }
  if (amount < 0) {
    throw new Error('Số tiền không được âm');
  }
  if (amount === 0) {
    return 'Zero Vietnamese Dong';
  }

  const trillion = Math.floor(amount / 1_000_000_000_000);
  let rem = amount % 1_000_000_000_000;

  const billion = Math.floor(rem / 1_000_000_000);
  rem %= 1_000_000_000;

  const million = Math.floor(rem / 1_000_000);
  rem %= 1_000_000;

  const thousand = Math.floor(rem / 1_000);
  const ones = rem % 1_000;

  const parts: string[] = [];

  if (trillion > 0) {
    parts.push(`${convertThreeDigitsEn(trillion)} Trillion`);
  }
  if (billion > 0) {
    parts.push(`${convertThreeDigitsEn(billion)} Billion`);
  }
  if (million > 0) {
    parts.push(`${convertThreeDigitsEn(million)} Million`);
  }
  if (thousand > 0) {
    parts.push(`${convertThreeDigitsEn(thousand)} Thousand`);
  }
  if (ones > 0) {
    parts.push(convertThreeDigitsEn(ones));
  }

  return parts.join(' ') + ' Vietnamese Dong';
}

function convertThreeDigitsEn(n: number): string {
  const h = Math.floor(n / 100);
  const rem = n % 100;

  const parts: string[] = [];
  if (h > 0) {
    parts.push(`${UNITS_EN[h]} Hundred`);
  }

  if (rem > 0) {
    if (rem < 20) {
      parts.push(UNITS_EN[rem]);
    } else {
      const t = Math.floor(rem / 10);
      const u = rem % 10;
      if (u > 0) {
        parts.push(`${TENS_EN[t]}-${UNITS_EN[u]}`);
      } else {
        parts.push(TENS_EN[t]);
      }
    }
  }

  return parts.join(' ');
}

const ZH_PINYIN_MAP: Record<string, string> = {
  '零': 'líng',
  '壹': 'yī',
  '贰': 'èr',
  '叁': 'sān',
  '肆': 'sì',
  '伍': 'wǔ',
  '陆': 'lù',
  '柒': 'qī',
  '捌': 'bā',
  '玖': 'jiǔ',
  '拾': 'shí',
  '佰': 'bǎi',
  '仟': 'qiān',
  '万': 'wàn',
  '亿': 'yì',
  '元': 'yuán',
  '整': 'zhěng',
};

/**
 * Lấy Pinyin đọc chữ Tiếng Trung (Đại tả)
 */
export function convertZhPinyin(amount: number): string {
  if (amount < 0 || amount > MAX_AMOUNT) return '';
  const zhStr = convertZh(amount);
  return Array.from(zhStr)
    .map(char => ZH_PINYIN_MAP[char] || char)
    .join(' ');
}
