import { describe, expect, it } from 'vitest';
import { toKey } from './toKey';

describe('toKey', () => {
  it('converts strings to strings', () => {
    expect(toKey('asd')).toBe('asd');
  });

  it('converts symbols to symbols', () => {
    const symbol = Symbol('a');
    expect(toKey(symbol)).toBe(symbol);
  });

  it("converts 0 to '0'", () => {
    expect(toKey(0)).toBe('0');
  });

  it("converts -0 to '-0'", () => {
    expect(toKey(-0)).toBe('-0');
    expect(toKey(Object(-0))).toBe('-0');
  });
});
