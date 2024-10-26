import { describe, expect, it } from 'vitest';
import { sumBy } from './sumBy';
import { empties } from '../_internal/empties';
import { slice } from '../_internal/slice';
import { stubZero } from '../_internal/stubZero';

describe('sum methods', () => {
  it(`should return the sum of an array of numbers`, () => {
    expect(sumBy(array)).toBe(12);
  });

  it(`should return \`0\` when passing empty \`array\` values`, () => {
    const expected = empties.map(stubZero);

    const actual = empties.map(value => sumBy(value as any));

    expect(actual).toEqual(expected);
  });

  it(`should skip \`undefined\` values`, () => {
    expect(sumBy([1, undefined])).toBe(1);
  });

  it(`should not skip \`NaN\` values`, () => {
    expect(sumBy([1, NaN])).toEqual(NaN);
  });

  it(`should not coerce values to numbers`, () => {
    expect(sumBy(['1', '2'])).toBe('12');
  });

  const array = [6, 4, 2];
  const objects = [{ a: 2 }, { a: 3 }, { a: 1 }];

  it('should work with an `iteratee`', () => {
    const actual = sumBy(objects, object => object.a);

    expect(actual).toEqual(6);
  });

  it('should provide correct `iteratee` arguments', () => {
    let args: any;

    sumBy(array, function () {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions, prefer-rest-params
      args || (args = slice.call(arguments));
    } as any);

    expect(args).toEqual([6]);
  });

  it('should work with `_.property` shorthands', () => {
    const arrays = [[2], [3], [1]];
    expect(sumBy(arrays, 0 as any)).toBe(6);
    expect(sumBy(objects, 'a' as any)).toBe(6);
  });
});
