import { describe, expect, it } from 'vitest';
import { bindAll } from './bindAll';
import { cloneDeep } from '../compat';
import { toArgs } from '../compat/_internal/toArgs';

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
    bindAll(object, args);

    const actual = Array.from(args).map((key: string) => {
      const method = object[key];
      if (typeof method === 'function') {
        return method.call({});
      }
      return undefined;
    });

    expect(actual).toEqual([1]);
  });
});
