import { describe, expect, it, expectTypeOf } from 'vitest';
import type { flatMapDepth as flatMapDepthLodash } from 'lodash';
import { flatMapDepth } from './flatMapDepth';

describe('flatMapDepth', () => {
  const array = [1, 2, 3, 4];

  function duplicate(n: number) {
    return [n, n];
  }

  it('should map values in array to a new flattened array', () => {
    const actual = flatMapDepth(array, duplicate, 1);
    const expected = array.map(duplicate).flat(1);

    expect(actual).toEqual(expected);
  });

  it('should work with property shorthands', () => {
    const objects = [{ a: [1, 2] }, { a: [3, 4] }];
    expect(flatMapDepth(objects, 'a', 1)).toEqual(array);
  });

  it('should iterate over own string keyed properties of objects', () => {
    function Foo(this: any) {
      this.a = [1, 2];
    }
    Foo.prototype.b = [3, 4];

    const actual = flatMapDepth(new (Foo as any)(), (value: any) => value, 1);
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
      const actual = values.map(value =>
        // @ts-expect-error - invalid argument
        value ? flatMapDepth(collection, value, 1) : flatMapDepth(collection, undefined, 1)
      );

      expect(actual).toEqual(expected);
    });
  });

  it('should accept a falsey collection', () => {
    const falsey = [null, undefined, false, 0, NaN, ''];
    const expected = falsey.map(() => []);

    const actual = falsey.map(collection => {
      try {
        // @ts-expect-error - invalid argument
        return collection ? flatMapDepth(collection, undefined, 1) : flatMapDepth(undefined, undefined, 1);
      } catch (e) {
        return [];
      }
    });

    expect(actual).toEqual(expected);
  });

  it('should treat number values for collection as empty', () => {
    // @ts-expect-error - invalid argument
    expect(flatMapDepth(1, undefined, 1)).toEqual([]);
  });

  it('should work with objects with non-number length properties', () => {
    const object = { length: [1, 2] };
    expect(flatMapDepth(object, value => value, 1)).toEqual([1, 2]);
  });

  it('should work with different depth values', () => {
    const nested = [[[1, 2]], [[3, 4]]];
    expect(flatMapDepth(nested, x => x, 0)).toEqual([[[1, 2]], [[3, 4]]]);
    expect(flatMapDepth(nested, x => x, 2)).toEqual([1, 2, 3, 4]);
    expect(flatMapDepth(nested, x => x, Infinity)).toEqual([1, 2, 3, 4]);
    expect(flatMapDepth(nested)).toEqual([
      [1, 2],
      [3, 4],
    ]);
    expect(flatMapDepth(nested, x => x)).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(flatMapDepth).toEqualTypeOf<typeof flatMapDepthLodash>();
  });
});
