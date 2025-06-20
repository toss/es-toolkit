import { describe, expect, expectTypeOf, it } from 'vitest';
import type { pullAt as pullAtLodash } from 'lodash';
import { map } from './map';
import { pullAt } from './pullAt';
import { reduce } from './reduce';
import { reject } from './reject';
import { at } from '../../array';
import { noop } from '../../function';
import { empties } from '../_internal/empties';
import { falsey } from '../_internal/falsey';
import { stubOne } from '../_internal/stubOne';
import { isArray } from '../predicate/isArray';
import { constant } from '../util/constant';

describe('pullAt', () => {
  it('should modify the array and return removed elements', () => {
    const array = [1, 2, 3];
    const actual = pullAt(array, [0, 1]);

    expect(array).toEqual([3]);
    expect(actual).toEqual([1, 2]);
  });

  it('should work with unsorted indexes', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const actual = pullAt(array, [1, 3, 11, 7, 5, 9]);

    expect(array).toEqual([1, 3, 5, 7, 9, 11]);
    expect(actual).toEqual([2, 4, 12, 8, 6, 10]);
  });

  it('should work with repeated indexes', () => {
    const array = [1, 2, 3, 4];
    const actual = pullAt(array, [0, 2, 0, 1, 0, 2]);

    expect(array).toEqual([4]);
    expect(actual).toEqual([1, 3, 1, 2, 1, 3]);
  });

  it('should use `undefined` for nonexistent indexes', () => {
    const array = ['a', 'b', 'c'];
    const actual = pullAt(array, [2, 4, 0]);

    expect(array).toEqual(['b']);
    expect(actual).toEqual(['c', undefined, 'a']);
  });

  it('should flatten `indexes`', () => {
    let array = ['a', 'b', 'c'];
    expect(pullAt(array, 2, 0)).toEqual(['c', 'a']);
    expect(array).toEqual(['b']);

    array = ['a', 'b', 'c', 'd'];
    expect(pullAt(array, [3, 0], 2)).toEqual(['d', 'a', 'c']);
    expect(array).toEqual(['b']);
  });

  it('should return an empty array when no indexes are given', () => {
    const array = ['a', 'b', 'c'];
    let actual = pullAt(array);

    expect(array).toEqual(['a', 'b', 'c']);
    expect(actual).toEqual([]);

    actual = pullAt(array, [], []);

    expect(array).toEqual(['a', 'b', 'c']);
    expect(actual).toEqual([]);
  });

  it('should work with non-index paths', () => {
    const values: any[] = reject(empties, value => value === 0 || isArray(value)).concat(-1, 1.1);

    const array = reduce(
      values,
      (result, value) => {
        (result as any)[value] = 1;
        return result;
      },
      []
    );
    let expected: any[] = map(values, stubOne);
    let actual = pullAt(array, values);

    expect(actual).toEqual(expected);

    expected = map(values, noop);
    actual = at(array, values);

    expect(actual).toEqual(expected);
  });

  it('should preserve the sign of `0`', () => {
    const props = [-0, Object(-0), 0, Object(0)];

    const actual = map(props, key => {
      const array = [-1];
      // @ts-expect-error - use -0 as a key
      array['-0'] = -2;
      return pullAt(array, key);
    });

    expect(actual).toEqual([[-2], [-2], [-1], [-1]]);
  });

  it('should support deep paths', () => {
    const array: any = [];
    array.a = { b: 2 };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    let actual = pullAt(array, 'a.b');

    expect(actual).toEqual([2]);
    expect(array.a).toEqual({});

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    actual = pullAt(array, 'a.b.c');

    expect(actual).toEqual([undefined]);
  });

  it('should work with a falsey `array` when keys are given', () => {
    const values: any[] = falsey.slice();
    const expected = map(values, constant(Array(4)));

    const actual = map(values, array => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return pullAt(array, 0, 1, 'pop', 'push');
    });

    expect(actual).toEqual(expected);
  });

  it('should work with array-like object', () => {
    const arrayLike = {
      0: 'a',
      1: 'b',
      2: 'c',
      length: 3,
    };

    const actual = pullAt(arrayLike, [0, 2]);

    expect(actual).toEqual(['a', 'c']);
    expect(arrayLike).toEqual({ 0: 'b', length: 1 });
  });

  it('should match the type of lodash', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expectTypeOf(pullAt).toEqualTypeOf<typeof pullAtLodash>();
  });
});
