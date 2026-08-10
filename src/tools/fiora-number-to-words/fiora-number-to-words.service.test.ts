import { describe, expect, it } from 'vitest';
import { convertVi, convertZh, convertEn, convertZhPinyin } from './fiora-number-to-words.service';

describe('fiora-number-to-words service', () => {
  describe('convertVi', () => {
    it('should convert Vietnamese numbers correctly', () => {
      expect(convertVi(0)).toBe('Không đồng');
      expect(convertVi(5)).toBe('Năm đồng');
      expect(convertVi(10)).toBe('Mười đồng');
      expect(convertVi(15)).toBe('Mười lăm đồng');
      expect(convertVi(21)).toBe('Hai mươi mốt đồng');
      expect(convertVi(24)).toBe('Hai mươi tư đồng');
      expect(convertVi(25)).toBe('Hai mươi lăm đồng');
      expect(convertVi(105)).toBe('Một trăm lẻ năm đồng');
      expect(convertVi(1000)).toBe('Một nghìn đồng');
      expect(convertVi(1050)).toBe('Một nghìn không trăm năm mươi đồng');
      expect(convertVi(1005000)).toBe('Một triệu không trăm lẻ năm nghìn đồng');
      expect(convertVi(14680000)).toBe('Mười bốn triệu sáu trăm tám mươi nghìn đồng');
      expect(convertVi(1000000000)).toBe('Một tỷ đồng');
      expect(convertVi(1000000000000)).toBe('Một nghìn tỷ đồng');
    });

    it('should throw error when over limit', () => {
      expect(() => convertVi(1_000_000_000_001)).toThrow();
    });
  });

  describe('convertZh', () => {
    it('should convert Chinese numbers correctly', () => {
      expect(convertZh(0)).toBe('零元整');
      expect(convertZh(10)).toBe('壹拾元整');
      expect(convertZh(1500000)).toBe('壹佰伍拾万元整');
      expect(convertZh(1004000)).toBe('壹佰万零肆仟元整');
      expect(convertZh(14680000)).toBe('壹仟肆佰陆拾捌万元整');
      expect(convertZh(1050000)).toBe('壹佰零伍万元整');
      expect(convertZh(1000000000)).toBe('壹拾亿元整');
      expect(convertZh(1000000000000)).toBe('壹万亿元整');
    });

    it('should throw error when over limit', () => {
      expect(() => convertZh(1_000_000_000_001)).toThrow();
    });
  });

  describe('convertEn', () => {
    it('should convert English accounting numbers correctly', () => {
      expect(convertEn(0)).toBe('Zero Vietnamese Dong');
      expect(convertEn(1500000)).toBe('One Million Five Hundred Thousand Vietnamese Dong');
      expect(convertEn(14680000)).toBe('Fourteen Million Six Hundred Eighty Thousand Vietnamese Dong');
      expect(convertEn(1000000000)).toBe('One Billion Vietnamese Dong');
    });
  });

  describe('convertZhPinyin', () => {
    it('should convert Chinese Pinyin reading correctly', () => {
      expect(convertZhPinyin(0)).toBe('líng yuán zhěng');
      expect(convertZhPinyin(1500000)).toBe('yī bǎi wǔ shí wàn yuán zhěng');
    });
  });
});
