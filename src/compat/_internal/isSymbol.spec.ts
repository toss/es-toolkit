import { describe, it, expect } from 'vitest';
import { isSymbol } from './isSymbol';
import { falsey } from './falsey';
import { stubFalse } from './stubFalse';
import { args } from './args';
import { slice } from './slice';

describe('isSymbol', () => {
  const symbol = Symbol('a');

  it('should return `true` for symbols', () => {
    expect(isSymbol(symbol)).toBe(true);
    expect(isSymbol(Object(symbol))).toBe(true);
  });

  it('should return `false` for non-symbols', () => {
    const expected = falsey.map(stubFalse);
    const actual = falsey.map(isSymbol);

    expect(actual).toEqual(expected);

    expect(isSymbol(args)).toBe(false);
    expect(isSymbol([1, 2, 3])).toBe(false);
    expect(isSymbol(true)).toBe(false);
    expect(isSymbol(new Date())).toBe(false);
    expect(isSymbol(new Error())).toBe(false);
    expect(isSymbol(slice)).toBe(false);
    expect(isSymbol({ 0: 1, length: 1 })).toBe(false);
    expect(isSymbol(1)).toBe(false);
    expect(isSymbol(/x/)).toBe(false);
    expect(isSymbol('a')).toBe(false);
  });
});
