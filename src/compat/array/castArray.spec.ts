import { describe, expect, it } from 'vitest';
import { castArray } from './castArray';

/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/castArray.spec.js#L1
 */
describe('castArray', () => {
  it('should wrap non-array items in an array', () => {
    const falsey = [false, null, undefined, 0, NaN, ''];
    const values = [...falsey, true, 1, 'a', { a: 1 }];
    const expected = values.map(value => [value]);
    const actual = values.map(value => castArray(value));

    expect(actual).toEqual(expected);
  });

  it('should return array values by reference', () => {
    const array = [1];
    expect(castArray(array)).toBe(array);
  });

  it('should return an empty array when no arguments are given', () => {
    expect(castArray()).toEqual([]);
  });
});
