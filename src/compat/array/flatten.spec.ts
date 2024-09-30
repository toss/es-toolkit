import { describe, expect, it } from 'vitest';
import { flatten } from './flatten';
import { args } from '../_internal/args';

describe('flatten', () => {
  it('should flatten `arguments` objects', () => {
    const array = [args, [args]];
    const expected = [1, 2, 3, args];
    const actual = flatten(array);

    expect(actual).toEqual(expected);
  });

  it('should treat sparse arrays as dense', () => {
    const array = [[1, 2, 3], Array(3)];
    const expected = [1, 2, 3, undefined, undefined, undefined];
    const actual = flatten(array);

    expect(actual).toEqual(expected);
    expect('4' in actual).toBeTruthy();
  });

  it('should flatten objects with a truthy `Symbol.isConcatSpreadable` value', () => {
    const object = { 0: 'a', length: 1, [Symbol.isConcatSpreadable]: true };
    const array = [object];
    const expected = ['a'];
    const actual = flatten(array);
    expect(actual).toEqual(expected);
  });

  it('should work with empty arrays', () => {
    const array = [[], [[]], [[], [[[]]]]];
    const expected = [[], [], [[[]]]];
    const actual = flatten(array);

    expect(actual).toEqual(expected);
  });

  it('should support flattening of nested arrays', () => {
    const array = [1, [2, [3, [4]], 5]];
    const expected = [1, 2, [3, [4]], 5];
    const actual = flatten(array);

    expect(actual).toEqual(expected);
  });

  it('should return an empty array for non array-like objects', () => {
    const nonArray = { 0: 'a' };
    const expected: [] = [];
    const actual = flatten(nonArray);

    expect(actual).toEqual(expected);
  });
});
