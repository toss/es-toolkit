import { describe, expect, it } from 'vitest';
import { merge } from './merge';
import { args } from '../_internal/args';
import { isArguments } from '../predicate/isArguments';
import { typedArrays } from '../_internal/typedArrays';
import { range } from '../../math/range';
import { stubTrue } from '../_internal/stubTrue';
import { isEqual } from '../../predicate/isEqual';

describe('merge', () => {
  it('should merge `source` into `object`', () => {
    const names = {
      characters: [{ name: 'barney' }, { name: 'fred' }],
    };

    const ages = {
      characters: [{ age: 36 }, { age: 40 }],
    };

    const heights = {
      characters: [{ height: '5\'4"' }, { height: '5\'5"' }],
    };

    const expected = {
      characters: [
        { name: 'barney', age: 36, height: '5\'4"' },
        { name: 'fred', age: 40, height: '5\'5"' },
      ],
    };

    expect(merge(names, ages, heights)).toEqual(expected);
  });

  it('should merge sources containing circular references', () => {
    const object: any = {
      foo: { a: 1 },
      bar: { a: 2 },
    };

    const source: any = {
      foo: { b: { c: { d: {} } } },
      bar: {},
    };

    source.foo.b.c.d = source;
    source.bar.b = source.foo.b;

    const actual = merge(object, source);

    expect(actual.bar.b).not.toBe(actual.foo.b);
    expect(actual.foo.b.c.d).toBe(actual.foo.b.c.d.foo.b.c.d);
  });

  it('should work with four arguments', () => {
    const expected = { a: 4 };
    const actual = merge({ a: 1 }, { a: 2 }, { a: 3 }, expected);

    expect(actual).toEqual(expected);
  });

  it('should merge onto function `object` values', () => {
    function Foo() {}

    const source = { a: 1 };
    const actual = merge(Foo, source);

    expect(actual).toBe(Foo);
    // eslint-disable-next-line
    // @ts-ignore
    expect(Foo.a).toBe(1);
  });

  it('should treat sparse array sources as dense', () => {
    const array = [1];
    array[2] = 3;

    const actual = merge([], array),
      expected: any = array.slice();

    expected[1] = undefined;

    expect('1' in actual).toBe(true);
    expect(actual).toEqual(expected);
  });

  it('should merge first source object properties to function', () => {
    const fn = function () {};
    const object = { prop: {} };
    const actual = merge({ prop: fn }, object);

    expect(actual).toEqual(object);
  });

  it('should merge first and second source object properties to function', () => {
    const fn = function () {};
    const object = { prop: {} };
    const actual = merge({ prop: fn }, { prop: fn }, object);

    expect(actual).toEqual(object);
  });

  it('should not merge onto function values of sources', () => {
    const source1 = { a: function () {} };
    const source2 = { a: { b: 2 } };
    const expected = { a: { b: 2 } };
    let actual = merge({}, source1, source2);

    expect(actual).toEqual(expected);
    expect('b' in source1.a).toBe(false);

    actual = merge(source1, source2);
    expect(actual).toEqual(expected);
  });

  it('should merge onto non-plain `object` values', () => {
    function Foo() {}

    // eslint-disable-next-line
    // @ts-ignore
    const object = new Foo();
    const actual = merge(object, { a: 1 });

    expect(actual).toBe(object);
    expect(object.a).toBe(1);
  });

  it('should merge `arguments` objects', () => {
    const object1 = { value: args };
    const object2 = { value: { 3: 4 } };
    let expected: any = { 0: 1, 1: 2, 2: 3, 3: 4 };
    let actual: any = merge(object1, object2);

    expect('3' in args).toBe(false);
    expect(isArguments(actual.value)).toBe(false);
    expect(actual.value).toEqual(expected);
    object1.value = args;

    actual = merge(object2, object1);
    expect(isArguments(actual.value)).toBe(false);
    expect(actual.value).toEqual(expected);

    expected = { 0: 1, 1: 2, 2: 3 };

    actual = merge({}, object1);

    expect(isArguments(actual.value)).toBe(false);
    expect(actual.value).toEqual(expected);
  });

  it('should merge typed arrays', () => {
    const array1 = [0];
    const array2 = [0, 0];
    const array3 = [0, 0, 0, 0];
    const array4 = [0, 0, 0, 0, 0, 0, 0, 0];

    const arrays = [array2, array1, array4, array3, array2, array4, array4, array3, array2];
    const buffer = new ArrayBuffer(8);

    let expected = typedArrays.map((type, index) => {
      const array = arrays[index].slice();
      array[0] = 1;

      // eslint-disable-next-line
      // @ts-ignore
      return globalThis[type] ? { value: array } : false;
    });

    let actual = typedArrays.map(type => {
      // eslint-disable-next-line
      // @ts-ignore
      const Ctor = globalThis[type];
      return Ctor ? merge({ value: new Ctor(buffer) }, { value: [1] }) : false;
    });

    expect(Array.isArray(actual)).toBe(true);
    expect(actual).toEqual(expected);

    expected = typedArrays.map((type, index) => {
      const array = arrays[index].slice();
      array.push(1);
      // eslint-disable-next-line
      // @ts-ignore
      return globalThis[type] ? { value: array } : false;
    });

    actual = typedArrays.map((type, index) => {
      // eslint-disable-next-line
      // @ts-ignore
      const Ctor = globalThis[type];
      const array = range(arrays[index].length);

      array.push(1);
      return Ctor ? merge({ value: array }, { value: new Ctor(buffer) }) : false;
    });

    expect(Array.isArray(actual)).toBe(true);
    expect(actual).toEqual(expected);
  });

  it('should assign `null` values', () => {
    const actual = merge({ a: 1 }, { a: null });
    // eslint-disable-next-line
    // @ts-ignore
    expect(actual.a).toBe(null);
  });

  it('should assign non array/buffer/typed-array/plain-object source values directly', () => {
    function Foo() {}

    // eslint-disable-next-line
    // @ts-ignore
    const values = [new Foo(), new Boolean(), new Date(), Foo, new Number(), new String(), new RegExp()];
    const expected = values.map(stubTrue);

    const actual = values.map(value => {
      const object = merge({}, { a: value, b: { c: value } });
      return object.a === value && object.b.c === value;
    });

    expect(actual).toEqual(expected);
  });

  it('should clone buffer source values', () => {
    const buffer = Buffer.from([1]);
    const actual = merge({}, { value: buffer }).value;

    expect(Buffer.isBuffer(actual)).toBe(true);
    expect(actual[0]).toBe(buffer[0]);
    expect(actual).not.toBe(buffer);
  });

  it('should deep clone array/typed-array/plain-object source values', () => {
    const typedArray = Uint8Array ? new Uint8Array([1]) : { buffer: [1] };

    const props = ['0', 'buffer', 'a'];
    const values: any = [[{ a: 1 }], typedArray, { a: [1] }];
    const expected = values.map(stubTrue);

    const actual = values.map((value: any, index: any) => {
      const key = props[index];
      const object = merge({}, { value: value });
      const subValue = value[key];
      const newValue = object.value;
      const newSubValue = newValue[key];

      return newValue !== value && newSubValue !== subValue && isEqual(newValue, value);
    });

    expect(actual).toEqual(expected);
  });

  it('should not augment source objects', () => {
    let source1: any = { a: [{ a: 1 }] };
    let source2: any = { a: [{ b: 2 }] };
    let actual = merge({}, source1, source2);

    expect(source1.a).toEqual([{ a: 1 }]);
    expect(source2.a).toEqual([{ b: 2 }]);
    expect(actual.a).toEqual([{ a: 1, b: 2 }]);

    source1 = { a: [[1, 2, 3]] };
    source2 = { a: [[3, 4]] };
    actual = merge({}, source1, source2);

    expect(source1.a).toEqual([[1, 2, 3]]);
    expect(source2.a).toEqual([[3, 4]]);
    expect(actual.a).toEqual([[3, 4, 3]]);
  });

  it('should merge plain objects onto non-plain objects', () => {
    function Foo(object: any) {
      // eslint-disable-next-line
      // @ts-ignore
      Object.assign(this, object);
    }

    const object = { a: 1 };
    // eslint-disable-next-line
    // @ts-ignore
    let actual = merge(new Foo(), object);

    expect(actual instanceof Foo);
    // eslint-disable-next-line
    // @ts-ignore
    expect(actual).toEqual(new Foo(object));

    // eslint-disable-next-line
    // @ts-ignore
    actual = merge([new Foo()], [object]);
    expect(actual[0] instanceof Foo);
    // eslint-disable-next-line
    // @ts-ignore
    expect(actual).toEqual([new Foo(object)]);
  });

  it('should not overwrite existing values with `undefined` values of object sources', () => {
    const actual = merge({ a: 1 }, { a: undefined, b: undefined });
    expect(actual).toEqual({ a: 1, b: undefined });
  });

  it('should not overwrite existing values with `undefined` values of array sources', () => {
    let array: any = [1];
    array[2] = 3;

    let actual = merge([4, 5, 6], array);
    const expected = [1, 5, 3];

    expect(actual).toEqual(expected);

    // eslint-disable-next-line
    array = [1, , 3];
    array[1] = undefined;

    actual = merge([4, 5, 6], array);
    expect(actual).toEqual(expected);
  });

  it('should skip merging when `object` and `source` are the same value', () => {
    const object = {};
    let pass = true;

    Object.defineProperty(object, 'a', {
      configurable: true,
      enumerable: true,
      get: function () {
        pass = false;
      },
      set: function () {
        pass = false;
      },
    });

    merge(object, object);
    expect(pass);
  });

  it('should preserve original properties of arrays', () => {
    const arr = [1, 2, 3];
    // eslint-disable-next-line
    // @ts-ignore
    arr.foo = 1;

    merge(arr, [2]);

    expect(arr[0]).toBe(2);
    expect(arr[1]).toBe(2);
    expect(arr[2]).toBe(3);
    // eslint-disable-next-line
    // @ts-ignore
    expect(arr.foo).toBe(1);
  });

  it('should convert values to arrays when merging arrays of `source`', () => {
    const object = { a: { 1: 'y', b: 'z', length: 2 } };
    let actual: any = merge(object, { a: ['x'] });

    expect(Array.isArray(actual.a)).toEqual(true);
    expect(actual.a[0]).toEqual('x');
    expect(actual.a[1]).toEqual('y');

    actual = merge({ a: {} }, { a: [] });
    expect(actual).toEqual({ a: [] });
  });

  it('should convert strings to arrays when merging arrays of `source`', () => {
    const object = { a: 'abcde' };
    const actual = merge(object, { a: ['x', 'y', 'z'] });

    expect(actual).toEqual({ a: ['x', 'y', 'z'] });
  });
});
