import { describe, expect, it } from 'vitest';
import { isSymbol } from './isSymbol';
import { args } from '../compat/_internal/args';
import { falsey } from '../compat/_internal/falsey';

describe('isSymbol', () => {
  it('returns `true` for symbols', () => {
    expect(isSymbol(Symbol())).toBe(true);
    expect(isSymbol(Symbol('a'))).toBe(true);
    expect(isSymbol(Symbol.for('a'))).toBe(true);
    expect(isSymbol(Symbol.iterator)).toBe(true);
  });

  it('returns `false` for values that are not symbols', () => {
    const expected = falsey.map(() => false);
    const actual = falsey.map(isSymbol);
    expect(actual).toEqual(expected);

    expect(isSymbol(1)).toBe(false);
    expect(isSymbol('a')).toBe(false);
    expect(isSymbol(args)).toBe(false);
    expect(isSymbol([1, 2, 3])).toBe(false);
    expect(isSymbol(Object(false))).toBe(false);
    expect(isSymbol(new Date())).toBe(false);
    expect(isSymbol(new Error())).toBe(false);
    expect(isSymbol({ a: 1 })).toBe(false);
    expect(isSymbol(Object(0))).toBe(false);
    expect(isSymbol(/x/)).toBe(false);
    expect(isSymbol(Object('a'))).toBe(false);
  });
});
