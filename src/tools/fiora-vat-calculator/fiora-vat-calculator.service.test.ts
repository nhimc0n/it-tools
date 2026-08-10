import { describe, expect, it } from 'vitest';
import { calculateVat } from './fiora-vat-calculator.service';

describe('fiora-vat-calculator service', () => {
  it('should calculate forward VAT correctly', () => {
    const res = calculateVat('forward', 100_000, 10);
    expect(res.amountBeforeTax).toBe(100_000);
    expect(res.vatAmount).toBe(10_000);
    expect(res.amountAfterTax).toBe(110_000);
  });

  it('should calculate reverse VAT with Round-Half-Up NĐ 174', () => {
    // Giá đã thuế = 100,000, thuế 8%
    // Giá trước thuế = 100,000 / 1.08 = 92592.59259... -> 92593
    // VAT = 100,000 - 92592.59259... = 7407.4074... -> 7407
    const res = calculateVat('reverse', 100_000, 8);
    expect(res.amountBeforeTax).toBe(92_593);
    expect(res.vatAmount).toBe(7_407);
    expect(res.amountAfterTax).toBe(100_000);
  });

  it('should throw error for invalid input', () => {
    expect(() => calculateVat('forward', -500, 10)).toThrow();
    expect(() => calculateVat('forward', 1_000_000_000_001, 10)).toThrow();
  });
});
