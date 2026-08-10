import { describe, expect, it } from 'vitest';
import { calculateInvoiceFee } from './invoice-fee-calculator.service';

describe('invoice-fee-calculator service', () => {
  it('should correctly calculate invoice fee and breakdown', () => {
    const res = calculateInvoiceFee({
      sellingPrice: 1000000,
      invoicePrice: 1500000,
      feeRatePercent: 20,
      vatRatePercent: 10,
    });

    expect(res.sellingPrice).toBe(1000000);
    expect(res.invoicePrice).toBe(1500000);
    expect(res.difference).toBe(500000);
    expect(res.feeAmount).toBe(100000); // 500k * 20%
    expect(res.vatAmount).toBe(150000); // 1.5M * 10%
    expect(res.extraFeeTotal).toBe(250000); // 100k + 150k
    expect(res.totalInvoiceAmount).toBe(1650000); // 1.5M + 150k
    expect(res.actualCustomerPayment).toBe(1250000); // 1.0M + 250k
    expect(res.refundAmount).toBe(400000); // 1.65M - 1.25M
  });

  it('should handle zero difference', () => {
    const res = calculateInvoiceFee({
      sellingPrice: 1000000,
      invoicePrice: 1000000,
      feeRatePercent: 20,
      vatRatePercent: 8,
    });

    expect(res.difference).toBe(0);
    expect(res.feeAmount).toBe(0);
    expect(res.vatAmount).toBe(80000);
    expect(res.extraFeeTotal).toBe(80000);
    expect(res.totalInvoiceAmount).toBe(1080000);
    expect(res.actualCustomerPayment).toBe(1080000);
    expect(res.refundAmount).toBe(0);
  });
});
