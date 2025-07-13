import { describe, expect, expectTypeOf, it } from 'vitest';
import { isSymbol } from 'es-toolkit/compat';
import { stubFalse } from 'es-toolkit/compat';
import type { isSymbol as isSymbolLodash } from 'lodash';
import { args } from '../_internal/args';
import { falsey } from '../_internal/falsey';
import { slice } from '../_internal/slice';

describe('isSymbol', () => {
  it('should return `true` for symbols', () => {
    expect(isSymbol(Symbol('a'))).toBe(true);
    expect(isSymbol(Object(Symbol('a')))).toBe(true);
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

  it('should match the type of lodash', () => {
    expectTypeOf(isSymbol).toEqualTypeOf<typeof isSymbolLodash>();
  });
});
