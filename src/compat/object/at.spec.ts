import { describe, expect, expectTypeOf, it } from 'vitest';
import type { at as atLodash } from 'lodash';
import { at } from './at';
import { args } from '../_internal/args';
import { empties } from '../_internal/empties';
import { falsey } from '../_internal/falsey';
import { map } from '../array/map';
import { reject } from '../array/reject';
import { isArray } from '../predicate/isArray';
import { constant } from '../util/constant';

describe('at', () => {
  const array = ['a', 'b', 'c'];

  it('should return the elements corresponding to the specified keys', () => {
    const actual = at(array, [0, 2]);
    expect(actual).toEqual(['a', 'c']);
  });

  it('should return `undefined` for nonexistent keys', () => {
    const actual = at(array, [2, 4, 0]);
    expect(actual).toEqual(['c', undefined, 'a']);
  });

  it('should work with non-index keys on array values', () => {
    const values = reject(empties, value => value === 0 || isArray(value)).concat(-1, 1.1);

    const testArray = values.reduce((result: any[], value) => {
      result[value as any] = 1;
      return result;
    }, []);

    const expected = map(values, () => 1);

    const validPaths = values.filter(
      (value): value is PropertyKey =>
        typeof value === 'string' || typeof value === 'number' || typeof value === 'symbol'
    );

    const actual = at(testArray, validPaths);
    expect(actual).toEqual(expected.slice(0, validPaths.length));
  });

  it('should return an empty array when no keys are given', () => {
    expect(at(array)).toEqual([]);
    expect(at(array, [], [])).toEqual([]);
  });

  it('should accept multiple key arguments', () => {
    const actual = at(['a', 'b', 'c', 'd'], 3, 0, 2);
    expect(actual).toEqual(['d', 'a', 'c']);
  });

  it('should work with a falsey `object` when keys are given', () => {
    const expected = map(falsey, constant(Array(4).fill(undefined)));

    const actual = map(falsey, object => {
      try {
        return at(object as any, 0, 1, 'pop', 'push');
      } catch (e) {
        return Array(4).fill(undefined);
      }
    });

    expect(actual).toEqual(expected);
  });

  it('should work with an `arguments` object for `object`', () => {
    const actual = at(args, [2, 0]);
    expect(actual).toEqual([3, 1]);
  });

  it('should work with `arguments` object as secondary arguments', () => {
    const actual = at([1, 2, 3, 4, 5], args as any);
    expect(actual).toEqual([2, 3, 4]);
  });

  it('should work with an object for `object`', () => {
    const object = { a: [{ b: { c: 3 } }, 4] };
    const actual = at(object, ['a[0].b.c', 'a[1]']);
    expect(actual).toEqual([3, 4]);
  });

  it('should pluck inherited property values', () => {
    function Foo(this: any) {
      this.a = 1;
    }
    Foo.prototype.b = 2;

    const actual = at(new (Foo as any)(), 'b');
    expect(actual).toEqual([2]);
  });

  it('should get multiple properties of `object` by paths', () => {
    const object = { a: [{ b: { c: 3 } }, 4] };

    expect(at(object, 'a[0].b.c', 'a[1]')).toEqual([3, 4]);
    expect(at(object, ['a[0].b.c', 'a[1]'])).toEqual([3, 4]);
  });

  it('should support deep paths', () => {
    const object = { a: { b: 2, c: { d: 3 } } };

    expect(at(object, 'a.b', 'a.c.d')).toEqual([2, 3]);
    expect(at(object, ['a.b', 'a.c.d'])).toEqual([2, 3]);
  });

  it('should support path with array indices', () => {
    const object = { a: { b: [1, 2, 3] } };

    expect(at(object, 'a.b[0]', 'a.b[2]')).toEqual([1, 3]);
    expect(at(object, ['a.b[0]', 'a.b[2]'])).toEqual([1, 3]);
  });

  it('should handle complex object structures', () => {
    const object = {
      a: [1, 2, 3],
      b: { c: [4, 5, { d: [6, 7, { e: 8 }] }] },
    };

    expect(at(object, 'a[1]', 'b.c[2].d[2].e')).toEqual([2, 8]);
    expect(at(object, ['a[1]', 'b.c[2].d[2].e'])).toEqual([2, 8]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(at).toEqualTypeOf<typeof atLodash>();
  });
});
