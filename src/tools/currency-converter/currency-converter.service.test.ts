import { describe, expect, it, vi, beforeEach } from 'vitest';
import { CurrencyConverterService, ExchangeRates } from './currency-converter.service';

describe('CurrencyConverterService', () => {
  let service: CurrencyConverterService;

  beforeEach(() => {
    service = new CurrencyConverterService();
    // Clear localStorage mock if we had one
    if (typeof window !== 'undefined') {
      window.localStorage.clear();
    }
  });

  it('should return 0 when amount is 0 or invalid', () => {
    const rates: ExchangeRates = { USD: 1, VND: 25000, CNY: 7, TWD: 32 };
    expect(service.convert(0, 'USD', 'VND', rates)).toBe(0);
    expect(service.convert(NaN, 'USD', 'VND', rates)).toBe(0);
  });

  it('should return the same amount if from and to currencies are the same', () => {
    const rates: ExchangeRates = { USD: 1, VND: 25000, CNY: 7, TWD: 32 };
    expect(service.convert(100, 'USD', 'USD', rates)).toBe(100);
    expect(service.convert(10000, 'VND', 'VND', rates)).toBe(10000);
  });

  it('should convert from USD (base) to another currency', () => {
    const rates: ExchangeRates = { USD: 1, VND: 25000, CNY: 7, TWD: 32 };
    expect(service.convert(10, 'USD', 'VND', rates)).toBe(250000);
    expect(service.convert(100, 'USD', 'CNY', rates)).toBe(700);
  });

  it('should convert from another currency to USD (base)', () => {
    const rates: ExchangeRates = { USD: 1, VND: 25000, CNY: 7, TWD: 32 };
    expect(service.convert(250000, 'VND', 'USD', rates)).toBe(10);
    expect(service.convert(700, 'CNY', 'USD', rates)).toBe(100);
  });

  it('should convert between two non-base currencies', () => {
    const rates: ExchangeRates = { USD: 1, VND: 25000, CNY: 7.2, TWD: 32 };
    // 100 CNY -> USD = 100 / 7.2 = 13.8888...
    // USD -> VND = 13.8888... * 25000 = 347222.222222
    const result = service.convert(100, 'CNY', 'VND', rates);
    expect(result).toBeCloseTo(347222.222222, 5);
  });
});
