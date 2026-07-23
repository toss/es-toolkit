import { describe, expect, it } from 'vitest';
import { isBigInt } from './isBigInt';

describe('isBigInt', () => {
  it('returns true for bigint values', () => {
    expect(isBigInt(0n)).toBe(true);
    expect(isBigInt(BigInt(123))).toBe(true);
  });

  it('returns false for non-bigint values', () => {
    expect(isBigInt(0)).toBe(false);
    expect(isBigInt('123')).toBe(false);
    expect(isBigInt(false)).toBe(false);
    expect(isBigInt(null)).toBe(false);
    expect(isBigInt(undefined)).toBe(false);
    expect(isBigInt({})).toBe(false);
    expect(isBigInt([])).toBe(false);
    expect(isBigInt(Symbol('x'))).toBe(false);
  });

  it('can be used as a type predicate', () => {
    const arr = [0n, 1, 2n, '3', 4n];
    const result = arr.filter(isBigInt);
    expect(result).toStrictEqual([0n, 2n, 4n]);
  });
});
