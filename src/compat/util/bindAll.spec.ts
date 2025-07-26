import { describe, expect, expectTypeOf, it } from 'vitest';
import { bindAll } from 'es-toolkit/compat';
import { cloneDeep } from 'es-toolkit/compat';
import type { bindAll as bindAllLodash } from 'lodash';
import { toArgs } from '../_internal/toArgs';

interface TestObject {
  _n0: number;
  _p0: number;
  _a: number;
  _b: number;
  _c: number;
  _d: number;
  '-0': () => number;
  0: () => number;
  a: () => number;
  b: () => number;
  c: () => number;
  d: () => number;
  [key: string]: number | (() => number) | undefined;
}

describe('bindAll', () => {
  const args = toArgs(['a']);

  const source: TestObject = {
    _n0: -2,
    _p0: -1,
    _a: 1,
    _b: 2,
    _c: 3,
    _d: 4,
    '-0': function () {
      return this._n0;
    },
    0: function () {
      return this._p0;
    },
    a: function () {
      return this._a;
    },
    b: function () {
      return this._b;
    },
    c: function () {
      return this._c;
    },
    d: function () {
      return this._d;
    },
  };

  it('should accept individual method names', () => {
    const object = cloneDeep(source);
    bindAll(object, 'a', 'b');

    const actual = ['a', 'b', 'c'].map(key => {
      const method = object[key];
      if (typeof method === 'function') {
        return method.call({});
      }
      return undefined;
    });

    expect(actual).toEqual([1, 2, undefined]);
  });

  it('should accept arrays of method names', () => {
    const object = cloneDeep(source);
    bindAll(object, ['a', 'b'], ['c']);

    const actual = ['a', 'b', 'c', 'd'].map(key => {
      const method = object[key];
      if (typeof method === 'function') {
        return method.call({});
      }
      return undefined;
    });

    expect(actual).toEqual([1, 2, 3, undefined]);
  });

  it('should preserve the sign of `0`', () => {
    const props = [-0, Object(-0), 0, Object(0)];

    const actual = props.map(key => {
      const object = cloneDeep(source);
      bindAll(object, key);
      const methodKey = Object.is(Number(key), -0) ? '-0' : '0';
      return object[methodKey]();
    });

    expect(actual).toEqual([-2, -2, -1, -1]);
  });

  it('should work with an array `object`', () => {
    const array = ['push', 'pop'];
    bindAll(array);
    expect(array.pop).toBe(Array.prototype.pop);
  });

  it('should work with `arguments` objects as secondary arguments', () => {
    const object = cloneDeep(source);
    bindAll(object, args as any);

    const actual = Array.from(args).map((key: string) => {
      const method = object[key];
      if (typeof method === 'function') {
        return method.call({});
      }
      return undefined;
    });

    expect(actual).toEqual([1]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(bindAll).toEqualTypeOf<typeof bindAllLodash>();
  });

  it('should return the same object when object is null', () => {
    const result = bindAll(null);
    expect(result).toBe(null);
  });

  it('should return the same object when object is not an object', () => {
    const result1 = bindAll('string');
    expect(result1).toBe('string');

    const result2 = bindAll(123);
    expect(result2).toBe(123);

    const result3 = bindAll(true);
    expect(result3).toBe(true);

    const result = bindAll(undefined);
    expect(result).toBe(undefined);
  });

  it('should return the same object when no method names are provided', () => {
    const object = cloneDeep(source);
    const result = bindAll(object);
    expect(result).toBe(object);
  });

  it('should return the same object when empty arrays are provided as method names', () => {
    const object = cloneDeep(source);
    const result = bindAll(object, [], []);
    expect(result).toBe(object);
  });
});
