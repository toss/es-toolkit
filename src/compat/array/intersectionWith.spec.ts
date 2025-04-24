import { describe, expect, it } from 'vitest';
import { intersectionWith } from './intersectionWith';
import { map } from './map';
import { isEqual } from '../../predicate/isEqual';
import { args } from '../_internal/args';
import { LARGE_ARRAY_SIZE } from '../_internal/LARGE_ARRAY_SIZE';
import { stubNaN } from '../_internal/stubNaN';
import { stubZero } from '../_internal/stubZero';
import { range } from '../math/range';
import { constant } from '../util/constant';
import { eq } from '../util/eq';
import { times } from '../util/times';
import { toString } from '../util/toString';

describe('intersectionWith', () => {
  const func = intersectionWith;

  it(`should return the intersection of two arrays`, () => {
    const actual = func([2, 1], [2, 3]);
    expect(actual).toEqual([2]);
  });

  it(`should return the intersection of multiple arrays`, () => {
    const actual = func([2, 1, 2, 3], [3, 4], [3, 2]);
    expect(actual).toEqual([3]);
  });

  it(`should return an array of unique values`, () => {
    const actual = func([1, 1, 3, 2, 2], [5, 2, 2, 1, 4], [2, 1, 1]);
    expect(actual).toEqual([1, 2]);
  });

  it(`should work with a single array`, () => {
    const actual = func([1, 1, 3, 2, 2]);
    expect(actual).toEqual([1, 3, 2]);
  });

  it(`should work with \`arguments\` objects`, () => {
    const array = [0, 1, null, 3];
    const expected = [1, 3];

    expect(func(array, args)).toEqual(expected);
    expect(func(args, array)).toEqual(expected);
  });

  it(`should treat \`-0\` as \`0\``, () => {
    const values = [-0, 0];
    const expected = map(values, constant(['0']));

    const actual = map(values, value => map(func(values, [value]), toString));

    expect(actual).toEqual(expected);
  });

  it(`should match \`NaN\``, () => {
    const actual = func([1, NaN, 3], [NaN, 5, NaN]);
    expect(actual).toEqual([NaN]);
  });

  it(`should work with large arrays of \`-0\` as \`0\``, () => {
    const values = [-0, 0];
    const expected = map(values, constant(['0']));

    const actual = map(values, value => {
      const largeArray = times(LARGE_ARRAY_SIZE, constant(value));
      return map(func(values, largeArray), toString);
    });

    expect(actual).toEqual(expected);
  });

  it(`should work with large arrays of \`NaN\``, () => {
    const largeArray = times(LARGE_ARRAY_SIZE, stubNaN);
    expect(func([1, NaN, 3], largeArray)).toEqual([NaN]);
  });

  it(`should work with large arrays of objects`, () => {
    const object = {};
    const largeArray = times(LARGE_ARRAY_SIZE, constant(object));

    expect(func([object], largeArray)).toEqual([object]);
    expect(func(range(LARGE_ARRAY_SIZE), [1])).toEqual([1]);
  });

  it(`should treat values that are not arrays or \`arguments\` objects as empty`, () => {
    const array = [0, 1, null, 3];
    // eslint-disable-next-line
    // @ts-ignore
    expect(func(array, 3, { 0: 1 }, null)).toEqual([]);
    expect(func(null, array, null, [2, 3])).toEqual([]);
    expect(func(array, null, args, null)).toEqual([]);
  });

  it('should work with a `comparator`', () => {
    const objects = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ];
    const others = [
      { x: 1, y: 1 },
      { x: 1, y: 2 },
    ];
    const actual = intersectionWith(objects, others, isEqual);

    expect(actual).toEqual([objects[0]]);
  });

  it('should preserve the sign of `0`', () => {
    const array = [-0];
    const largeArray = times(LARGE_ARRAY_SIZE, stubZero);
    const others = [[0], largeArray];
    const expected = map(others, constant(['-0']));

    const actual = map(others, other => map(intersectionWith(array, other, eq), toString));

    expect(actual).toEqual(expected);
  });
});
