import { describe, expect, expectTypeOf, it } from 'vitest';
import type { assign as assignLodash } from 'lodash';
import { assign } from './assign';
import { noop } from '../../function';

describe('assign', () => {
  const func = assign;

  it(`\`assign\` should assign source properties to \`object\``, () => {
    expect(func({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
  });

  it(`\`assign\` should accept multiple sources`, () => {
    const expected = { a: 1, b: 2, c: 3 };
    expect(func({ a: 1 }, { b: 2 }, { c: 3 })).toEqual(expected);
    expect(func({ a: 1 }, { b: 2, c: 2 }, { c: 3 })).toEqual(expected);
  });

  it(`\`assign\` should overwrite destination properties`, () => {
    const expected = { a: 3, b: 2, c: 1 };
    expect(func({ a: 1, b: 2 }, expected)).toEqual(expected);
  });

  it(`\`assign\` should assign source properties with nullish values`, () => {
    const expected = { a: null, b: undefined, c: null };
    expect(func({ a: 1, b: 2 }, expected)).toEqual(expected);
  });

  it(`\`assign\` should skip assignments if values are the same`, () => {
    const object = {};

    const descriptor = {
      configurable: true,
      enumerable: true,
      set: function () {
        throw new Error();
      },
    };

    const source = {
      a: 1,
      b: undefined,
      c: NaN,
      d: undefined,
      constructor: Object,
      toString: () => 'source',
    };

    Object.defineProperty(
      object,
      'a',
      Object.assign({}, descriptor, {
        get: () => 1,
      })
    );

    Object.defineProperty(
      object,
      'b',
      Object.assign({}, descriptor, {
        get: noop,
      })
    );

    Object.defineProperty(
      object,
      'c',
      Object.assign({}, descriptor, {
        get: () => NaN,
      })
    );

    Object.defineProperty(
      object,
      'constructor',
      Object.assign({}, descriptor, {
        get: () => Object,
      })
    );

    let actual;

    try {
      actual = func(object, source);
    } catch (e) {
      console.log(e);
    }

    expect(actual).toEqual(source);
  });

  it(`\`assign\` should treat sparse array sources as dense`, () => {
    const array = [1];
    array[2] = 3;

    expect(func({}, array)).toEqual({ 0: 1, 1: undefined, 2: 3 });
  });

  it(`\`assign\` should assign values of prototype objects`, () => {
    function Foo() {}
    Foo.prototype.a = 1;

    expect(func({}, Foo.prototype)).toEqual({ a: 1 });
  });

  it(`\`assign\` should coerce string sources to objects`, () => {
    expect(func({}, 'a')).toEqual({ 0: 'a' });
  });

  it(`\`assign\` should assign properties with undefined values correctly`, () => {
    const values = [{ workId: undefined }, { exerciseId: '1' }];
    const result = assign({}, ...values);
    expect(result).toEqual({ workId: undefined, exerciseId: '1' });
  });

  it('should match the type of lodash', () => {
    expectTypeOf(assign).toEqualTypeOf<typeof assignLodash>();
  });
});
