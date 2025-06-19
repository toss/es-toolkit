import { describe, expect, it, expectTypeOf } from 'vitest';
import type { isEmpty as isEmptyLodash } from 'lodash';
import { isEmpty } from './isEmpty';
import { args } from '../_internal/args';
import { empties } from '../_internal/empties';
import { MAX_SAFE_INTEGER } from '../_internal/MAX_SAFE_INTEGER';
import { slice } from '../_internal/slice';
import { symbol } from '../_internal/symbol';
import { stubTrue } from '../util/stubTrue';

describe('isEmpty', () => {
  it('should return `true` for empty values', () => {
    const expected = empties.map(stubTrue);
    const actual = empties.map(isEmpty);

    expect(actual).toEqual(expected);

    expect(isEmpty(true)).toBe(true);
    expect(isEmpty(slice)).toBe(true);
    expect(isEmpty(1)).toBe(true);
    expect(isEmpty(NaN)).toBe(true);
    expect(isEmpty(/x/)).toBe(true);
    expect(isEmpty(symbol)).toBe(true);
    expect(isEmpty()).toBe(true);

    expect(isEmpty(Buffer.alloc(0))).toBe(true);
    expect(isEmpty(Buffer.alloc(1))).toBe(false);
  });

  it('should return `false` for non-empty values', () => {
    expect(isEmpty([0])).toBe(false);
    expect(isEmpty({ a: 0 })).toBe(false);
    expect(isEmpty('a')).toBe(false);
  });

  it('should work with an object that has a `length` property', () => {
    expect(isEmpty({ length: 0 })).toBe(false);
  });

  it('should work with `arguments` objects', () => {
    expect(isEmpty(args)).toBe(false);
  });

  it('should work with prototype objects', () => {
    function Foo() {}
    Foo.prototype = { constructor: Foo };

    expect(isEmpty(Foo.prototype)).toBe(true);

    Foo.prototype.a = 1;
    expect(isEmpty(Foo.prototype)).toBe(false);
  });

  it('should work with jQuery/MooTools DOM query collections', () => {
    function Foo(this: any, elements: any) {
      Array.prototype.push.apply(this, elements);
    }
    Foo.prototype = { length: 0, splice: Array.prototype.splice };

    // eslint-disable-next-line
    // @ts-ignore
    expect(isEmpty(new Foo([]))).toBe(true);
  });

  it('should work with maps', () => {
    [new Map()].forEach(map => {
      expect(isEmpty(map)).toBe(true);
      map.set('a', 1);
      expect(isEmpty(map)).toBe(false);
      map.clear();
    });
  });

  it('should work with sets', () => {
    [new Set()].forEach(set => {
      expect(isEmpty(set)).toBe(true);
      set.add(1);
      expect(isEmpty(set)).toBe(false);
      set.clear();
    });
  });

  it('should not treat objects with negative lengths as array-like', () => {
    function Foo() {}
    Foo.prototype.length = -1;

    // eslint-disable-next-line
    // @ts-ignore
    expect(isEmpty(new Foo())).toBe(true);
  });

  it('should not treat objects with lengths larger than `MAX_SAFE_INTEGER` as array-like', () => {
    function Foo() {}
    Foo.prototype.length = MAX_SAFE_INTEGER + 1;

    // eslint-disable-next-line
    // @ts-ignore
    expect(isEmpty(new Foo())).toBe(true);
  });

  it('should not treat objects with non-number lengths as array-like', () => {
    expect(isEmpty({ length: '0' })).toBe(false);
  });

  it('should return `true` for objects with only enumerable symbol properties', () => {
    const value = { [Symbol('a')]: 1 };
    expect(isEmpty(value)).toBe(true);

    function Foo() {}
    Foo.prototype = { constructor: Foo, [Symbol('a')]: 1 };
    expect(isEmpty(Foo.prototype)).toBe(true);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(isEmpty).toEqualTypeOf<typeof isEmptyLodash>();
  });
});
