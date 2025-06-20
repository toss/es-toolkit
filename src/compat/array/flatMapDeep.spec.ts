import { describe, expect, expectTypeOf, it } from 'vitest';
import type { flatMapDeep as flatMapDeepLodash } from 'lodash';
import { flatMapDeep } from './flatMapDeep';

describe('flatMapDeep', () => {
  const array = [1, 2, 3, 4];

  function duplicate(n: number) {
    return [n, n];
  }

  it('should map values in array to a new flattened array', () => {
    const actual = flatMapDeep(array, duplicate);
    const expected = array.map(duplicate).flat(Infinity);

    expect(actual).toEqual(expected);
  });

  it('should work with property shorthands', () => {
    const objects = [{ a: [1, 2] }, { a: [3, 4] }];
    expect(flatMapDeep(objects, 'a')).toEqual(array);
  });

  it('should iterate over own string keyed properties of objects', () => {
    function Foo(this: any) {
      this.a = [1, 2];
    }
    Foo.prototype.b = [3, 4];

    const actual = flatMapDeep(new (Foo as any)(), (value: any) => value);
    expect(actual).toEqual([1, 2]);
  });

  it('should use identity when iteratee is nullish', () => {
    const array = [
      [1, 2],
      [3, 4],
    ];
    const object = { a: [1, 2], b: [3, 4] };
    const values = [undefined, null];
    const expected = values.map(() => [1, 2, 3, 4]);

    [array, object].forEach(collection => {
      const actual = values.map(value => (value ? flatMapDeep(collection, value) : flatMapDeep(collection)));

      expect(actual).toEqual(expected);
    });
  });

  it('should accept a falsey collection', () => {
    const falsey = [null, undefined, false, 0, NaN, ''];
    const expected = falsey.map(() => []);

    const actual = falsey.map(collection => {
      try {
        // @ts-expect-error - invalid argument
        return collection ? flatMapDeep(collection) : flatMapDeep();
      } catch (e) {
        return [];
      }
    });

    expect(actual).toEqual(expected);
  });

  it('should treat number values for collection as empty', () => {
    // @ts-expect-error - invalid argument
    expect(flatMapDeep(1)).toEqual([]);
  });

  it('should work with objects with non-number length properties', () => {
    const object = { length: [1, 2] };
    expect(flatMapDeep(object, value => value)).toEqual([1, 2]);
  });

  it('should match the type of lodash', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expectTypeOf(flatMapDeep).toEqualTypeOf<typeof flatMapDeepLodash>();
  });
});
