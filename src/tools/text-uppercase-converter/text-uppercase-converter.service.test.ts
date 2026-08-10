import { describe, expect, it } from 'vitest';
import {
  toCapitalCase,
  toLowercase,
  toSentenceCase,
  toToggleCase,
  toUppercase,
} from './text-uppercase-converter.service';

describe('text-uppercase-converter service', () => {
  it('should convert text to uppercase', () => {
    expect(toUppercase('Cộng hoà xã hội chủ nghĩa Việt Nam')).toBe(
      'CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM',
    );
  });

  it('should convert text to lowercase', () => {
    expect(toLowercase('VIỆT NAM')).toBe('việt nam');
  });

  it('should convert text to capital case', () => {
    expect(toCapitalCase('cộng hoà xã hội chủ nghĩa việt nam')).toBe(
      'Cộng Hoà Xã Hội Chủ Nghĩa Việt Nam',
    );
  });

  it('should convert text to sentence case', () => {
    expect(toSentenceCase('cộng hoà xã hội chủ nghĩa việt nam. độc lập tự do.')).toBe(
      'Cộng hoà xã hội chủ nghĩa việt nam. Độc lập tự do.',
    );
  });

  it('should convert text to toggle case', () => {
    expect(toToggleCase('VietNam 123')).toBe('vIETnAM 123');
  });
});
