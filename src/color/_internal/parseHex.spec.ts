// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { parseHex } from './parseHex.ts';

describe('parseHex', () => {
  it('should parse #RRGGBB format', () => {
    expect(parseHex('#ff0000')).toEqual([255, 0, 0]);
    expect(parseHex('#00ff00')).toEqual([0, 255, 0]);
    expect(parseHex('#0000ff')).toEqual([0, 0, 255]);
  });

  it('should parse #RGB shorthand by expanding each digit', () => {
    expect(parseHex('#f00')).toEqual([255, 0, 0]);
    expect(parseHex('#0f0')).toEqual([0, 255, 0]);
  });

  it('should parse without # prefix', () => {
    expect(parseHex('ff0000')).toEqual([255, 0, 0]);
    expect(parseHex('f00')).toEqual([255, 0, 0]);
  });

  it('should return [0,0,0] for invalid length', () => {
    expect(parseHex('')).toEqual([0, 0, 0]);
    expect(parseHex('#ab')).toEqual([0, 0, 0]);
    expect(parseHex('#abcde')).toEqual([0, 0, 0]);
    expect(parseHex('a')).toEqual([0, 0, 0]);
  });

  it('should return [0,0,0] for non-hex characters', () => {
    expect(parseHex('#xyz')).toEqual([0, 0, 0]);
    expect(parseHex('#xxyyzz')).toEqual([0, 0, 0]);
  });

  it('should return [0,0,0] for partially valid hex strings', () => {
    expect(parseHex('#abcxyz')).toEqual([0, 0, 0]);
    expect(parseHex('#1g0000')).toEqual([0, 0, 0]);
    expect(parseHex('#12x')).toEqual([0, 0, 0]);
    expect(parseHex('fg0000')).toEqual([0, 0, 0]);
  });
});
