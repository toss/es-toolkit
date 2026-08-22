import { describe, expect, it } from 'vitest';
import { stubString } from './stubString';
import { toString } from './toString';
import { symbol } from '../_internal/symbol';

describe('toString', () => {
  it('should treat nullish values as empty strings', () => {
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined];
    const expected = values.map(stubString);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const actual = values.map((value, index) => (index ? toString(value) : toString()));

    expect(actual).toEqual(expected);
  });

  it('should preserve the sign of `0`', () => {
    const values = [-0, Object(-0), 0, Object(0)];
    const expected = ['-0', '-0', '0', '0'];
    const actual = values.map(toString);

    expect(actual).toEqual(expected);
  });

  it('should preserve the sign of `0` in an array', () => {
    const values = [-0, Object(-0), 0, Object(0)];
    expect(toString(values)).toEqual('-0,-0,0,0');
  });

  it('should handle symbols', () => {
    expect(toString(symbol)).toBe('Symbol(a)');
  });

  it('should handle an array of symbols', () => {
    expect(toString([symbol])).toBe('Symbol(a)');
  });

  it('should handle wrapped symbols', () => {
    expect(toString(Object(symbol))).toBe('Symbol(a)');
    expect(toString([Object(symbol)])).toBe('Symbol(a)');
  });

  it('should render nested nullish array values, matching lodash', () => {
    expect(toString([1, null, 3])).toBe('1,null,3');
    expect(toString([null, undefined])).toBe('null,undefined');
    expect(
      toString([
        [1, null],
        [2, undefined],
      ])
    ).toBe('1,null,2,undefined');
  });

  it('should read `valueOf` before `toString`, matching lodash', () => {
    expect(toString({ valueOf: () => 7 })).toBe('7');
    expect(toString({ valueOf: () => 7, toString: () => 'from toString' })).toBe('7');
    expect(toString([{ valueOf: () => 1 }, { valueOf: () => 2 }])).toBe('1,2');
  });

  it('should keep the string representation of values without a custom `valueOf`', () => {
    expect(toString({})).toBe('[object Object]');
    expect(toString(new Date(0))).toBe(new Date(0).toString());
    expect(toString(/re/g)).toBe('/re/g');
  });
});
