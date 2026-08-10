export interface ExchangeRates {
  USD: number;
  VND: number;
  CNY: number;
  TWD: number;
}

export interface CachedRates {
  timestamp: number;
  rates: ExchangeRates;
}

const CACHE_KEY = 'yuri_currency_rates_cache';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

export class CurrencyConverterService {
  async getRates(): Promise<ExchangeRates> {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          try {
            const parsed: CachedRates = JSON.parse(cached);
            if (Date.now() - parsed.timestamp < CACHE_TTL) {
              if (parsed.rates && parsed.rates.USD && parsed.rates.VND && parsed.rates.CNY && parsed.rates.TWD) {
                return parsed.rates;
              }
            }
          } catch (e) {
            console.warn('Failed to parse cached rates', e);
          }
        }
      }

      // Fetch new rates (base is USD)
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      if (!res.ok) {
        throw new Error('Failed to fetch exchange rates');
      }
      const data = await res.json();
      const rates: ExchangeRates = {
        USD: 1, // base
        VND: data.rates.VND || 25400,
        CNY: data.rates.CNY || 7.2,
        TWD: data.rates.TWD || 32.5
      };

      if (typeof window !== 'undefined' && window.localStorage) {
        const newCache: CachedRates = {
          timestamp: Date.now(),
          rates
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(newCache));
      }
      return rates;
    } catch (error) {
      console.error('Error fetching rates, using fallback:', error);
      // Fallback rates if fetch fails
      return {
        USD: 1,
        VND: 25400,
        CNY: 7.2,
        TWD: 32.5
      };
    }
  }

  convert(amount: number, fromCurrency: keyof ExchangeRates, toCurrency: keyof ExchangeRates, rates: ExchangeRates): number {
    if (!amount || isNaN(amount) || amount === 0) return 0;
    if (fromCurrency === toCurrency) return amount;

    // 1. Convert to base (USD)
    const amountInBase = amount / rates[fromCurrency];

    // 2. Convert from base (USD) to target
    const result = amountInBase * rates[toCurrency];

    // Rounding to avoid floating point precision issues (e.g. 0.30000000004)
    // We round to 6 decimal places internally, then the UI can format it
    return Number(Math.round(result * 1000000) / 1000000);
  }
}

export const currencyConverterService = new CurrencyConverterService();
