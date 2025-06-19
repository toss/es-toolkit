import { describe, expect, it, expectTypeOf } from 'vitest';
import type { flatMap as flatMapLodash } from 'lodash';
import { flatMap } from './flatMap';
import { map } from './map';
import { identity } from '../../function/identity';
import { empties } from '../_internal/empties';
import { falsey } from '../_internal/falsey';
import { each, stubArray } from '../compat';
import { range } from '../math/range';
import { constant } from '../util/constant';

describe('flatMap', () => {
  it('should map and flatten values', () => {
    const array = [1, 2];
    const expected = [1, 1, 2, 2];

    const duplicate = (n: number) => [n, n];
    expect(flatMap(array, duplicate)).toEqual(expected);
  });

  it('should work with empty arrays', () => {
    expect(flatMap([], n => [n, n])).toEqual([]);
  });

  it('should work with `_.identity`', () => {
    const array = [[1], [2, [3]], 4];
    expect(flatMap(array, identity)).toEqual([1, 2, [3], 4]);
  });

  it('should support shortcut fusion', () => {
    const array = range(1, 4);
    const iteratee = (n: number) => [n, n * n];
    const mapper = map(array, iteratee);

    expect(flatMap(array, iteratee)).toEqual([1, 1, 2, 4, 3, 9]);
    expect(flatMap(mapper, identity)).toEqual([1, 1, 2, 4, 3, 9]);
  });

  it('should treat sparse arrays correctly', () => {
    const array = [1];
    array[2] = 3;

    const expected = [1, undefined, 3];
    const duplicator = constant([1, undefined, 3]);

    expect(flatMap(array, identity)).toEqual(expected);
    expect(flatMap([array], identity)).toEqual(expected);
    expect(flatMap(array, value => (value === undefined ? [] : [value]))).toEqual([1, 3]);
    expect(flatMap(array, duplicator)).toEqual([1, undefined, 3, 1, undefined, 3, 1, undefined, 3]);
  });

  it('should work with a "_.property" style iteratee', () => {
    const objects = [{ a: [1, 2] }, { a: [3, 4] }];
    expect(flatMap(objects, 'a')).toEqual([1, 2, 3, 4]);
  });

  it('should work with objects', () => {
    const object = { a: 1, b: 2 };
    const expected = [1, 1, 2, 2];

    const duplicate = (n: number) => [n, n];
    expect(flatMap(object, duplicate)).toEqual(expected);
  });

  it('should work with nullish values', () => {
    expect(flatMap(null, identity)).toEqual([]);
    expect(flatMap(undefined, identity)).toEqual([]);
  });

  it('should handle empty values in arrays', () => {
    const array = empties.slice();
    const result = flatMap(array, value => [value, value]);
    expect(result.length).toBe(array.length * 2);

    for (const value of array) {
      let count = 0;
      for (const item of result) {
        if (Object.is(item, value)) {
          count++;
        }
      }
      expect(count).toBe(2);
    }
  });

  it('should work with undefined iteratee', () => {
    const array = [[1], [2, [3]], 4];
    expect(flatMap(array)).toEqual([1, 2, [3], 4]);
  });

  it(`should iterate over own string keyed properties of objects`, () => {
    function Foo(this: any) {
      this.a = [1, 2];
    }
    Foo.prototype.b = [3, 4];

    // @ts-expect-error - Foo is a constructor
    const actual = flatMap(new Foo(), identity);
    expect(actual).toEqual([1, 2]);
  });

  it(`should use \`_.identity\` when \`iteratee\` is nullish`, () => {
    const array = [
      [1, 2],
      [3, 4],
    ];
    const object = { a: [1, 2], b: [3, 4] };
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined];
    const expected = map(values, constant([1, 2, 3, 4]));

    each([array, object], collection => {
      // @ts-expect-error - testing
      const actual = map(values, (value, index) => (index ? flatMap(collection, value) : flatMap(collection)));

      expect(actual).toEqual(expected);
    });
  });

  it(`should accept a falsey \`collection\``, () => {
    const expected = map(falsey, stubArray);

    const actual = map(falsey, (collection, index) => {
      // @ts-expect-error - testing
      return index ? flatMap(collection) : flatMap();
    });

    expect(actual).toEqual(expected);
  });

  it(`should treat number values for \`collection\` as empty`, () => {
    // @ts-expect-error - testing
    expect(flatMap(1)).toEqual([]);
  });

  it(`should work with objects with non-number length properties`, () => {
    const object = { length: [1, 2] };
    expect(flatMap(object, identity)).toEqual([1, 2]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(flatMap).toEqualTypeOf<typeof flatMapLodash>();
  });
});
