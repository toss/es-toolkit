import { describe, expect, it } from 'vitest';
import { isWeakSet } from './isWeakSet';
import { falsey } from '../_internal/falsey';
import { args } from '../_internal/args';
import { slice } from '../_internal/slice';
import { symbol } from '../_internal/symbol';

describe('isWeakSet', () => {
  it('should return `true` for weak sets', () => {
    expect(isWeakSet(new WeakSet())).toBe(true);
  });

  it('should return `false` for non weak sets', () => {
    expect(falsey.map((value, index) => (index ? isWeakSet(value) : isWeakSet()))).toEqual(falsey.map(() => false));

    expect(isWeakSet(args)).toBe(false);
    expect(isWeakSet([1, 2, 3])).toBe(false);
    expect(isWeakSet(true)).toBe(false);
    expect(isWeakSet(new Date())).toBe(false);
    expect(isWeakSet(new Error())).toBe(false);
    expect(isWeakSet(slice)).toBe(false);
    expect(isWeakSet({ a: 1 })).toBe(false);
    expect(isWeakSet(1)).toBe(false);
    expect(isWeakSet(/x/)).toBe(false);
    expect(isWeakSet('a')).toBe(false);
    expect(isWeakSet(new Set())).toBe(false);
    expect(isWeakSet(symbol)).toBe(false);
  });
});
