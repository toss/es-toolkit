import { describe, expect, expectTypeOf, it } from 'vitest';
import * as lodashStable from 'es-toolkit/compat';
import { cloneWith } from 'es-toolkit/compat';
import { noop } from 'es-toolkit/compat';
import type { cloneWith as cloneWithLodash } from 'lodash';
import { args } from '../_internal/args';
import { slice } from '../_internal/slice';
import { typedArrays } from '../_internal/typedArrays';

describe('cloneWith', () => {
  it('should provide the correct `customizer` arguments', () => {
    const argsList: any[] = [];

    class Foo {}
    const object = new Foo();

    cloneWith(object, function () {
      const length = arguments.length;
      // eslint-disable-next-line prefer-rest-params
      const args = slice.call(arguments, 0, length - (length > 1 ? 1 : 0));
      argsList.push(args);
    });

    expect(argsList).toEqual([[object]]);
  });

  it('should handle cloning when `customizer` returns `undefined`', () => {
    const actual = cloneWith({ a: { b: 'c' } }, noop);
    expect(actual).toEqual({ a: { b: 'c' } });
  });

  it('should clone a plain object when `customizer` returns `undefined`', () => {
    const object = { a: 1, b: 2 };
    const actual = cloneWith(object, noop);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it('should clone an array when `customizer` returns `undefined`', () => {
    const array = [1, 2, 3];
    const actual = cloneWith(array, noop);

    expect(actual).toEqual(array);
    expect(actual).not.toBe(array);
  });

  it('should perform a shallow clone when `customizer` returns `undefined`', () => {
    const object = { a: [1, 2, 3] };
    const actual = cloneWith(object, noop) as any;

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
    expect(actual.a).toBe(object.a);
  });

  it('should accept a customizer callback', () => {
    const customizer = (value: any) => {
      if (lodashStable.isPlainObject(value)) {
        return { value: 'replaced' };
      }
    };

    const object = { a: 1, b: 2 };
    const actual1 = cloneWith(object, customizer);
    expect(actual1).toEqual({ value: 'replaced' });

    const array = [1, 2, 3];
    const actual2 = cloneWith(array, customizer);
    expect(actual2).toEqual(array);
    expect(actual2).not.toBe(array);

    const nestedObject = { a: { b: 1 }, c: [1, 2] };
    const actual3 = cloneWith(nestedObject, customizer);
    expect(actual3).toEqual({ value: 'replaced' });
  });

  it('should handle customizer returning primitives', () => {
    const customizer = (value: any) => {
      if (typeof value === 'number') {
        return value * 2;
      }
      if (typeof value === 'string') {
        return value.toUpperCase();
      }
    };

    expect(cloneWith(42, customizer)).toBe(84);
    expect(cloneWith('hello', customizer)).toBe('HELLO');
    expect(cloneWith(true, customizer)).toBe(true);
  });

  it('should clone arguments objects with customizer', () => {
    const customizer = (value: any) => {
      if (lodashStable.isArguments(value)) {
        return ['replaced'];
      }
    };

    const actual = cloneWith(args, customizer);
    expect(actual).toEqual(['replaced']);
  });

  it('should clone date objects with customizer', () => {
    const date = new Date();
    const customizer = (value: any) => {
      if (lodashStable.isDate(value)) {
        return new Date(2000, 0, 1);
      }
    };

    const actual = cloneWith(date, customizer);
    expect(actual).toEqual(new Date(2000, 0, 1));
  });

  it('should provide correct arguments to customizer in array values', () => {
    const argsList: any[] = [];
    const array = [1, 2, 3];

    cloneWith(array, function () {
      const length = arguments.length;
      // eslint-disable-next-line prefer-rest-params
      argsList.push(slice.call(arguments, 0, length - (length > 1 ? 1 : 0)));
    });

    expect(argsList[0]).toEqual([array]);
  });

  it('should work with a function customizer', () => {
    const customizer = function (value: any) {
      return lodashStable.isPlainObject(value) ? undefined : value;
    };

    const actual = cloneWith({ a: { b: 'c' } }, customizer);
    expect(actual).toEqual({ a: { b: 'c' } });
  });

  it('should clone objects with a customizer that returns a primitive', () => {
    const customizer = function (value: any) {
      if (lodashStable.isPlainObject(value)) {
        return 42;
      }
    };

    const actual = cloneWith({ a: { b: 'c' } }, customizer);
    expect(actual).toBe(42);
  });

  it('should clone arguments objects when customizer returns undefined', () => {
    const actual = cloneWith(args, noop);

    expect(actual).toHaveProperty('0', 1);
    expect(actual).toHaveProperty('1', 2);
    expect(actual).toHaveProperty('2', 3);
    expect(actual).toHaveProperty('length', 3);
    expect(actual).not.toBe(args);
  });

  it('should clone arguments objects with Symbol.iterator when customizer returns undefined', () => {
    const args = {
      0: 1,
      1: 2,
      length: 2,
      [Symbol.iterator]: Array.prototype[Symbol.iterator],
    };

    const actual = cloneWith(args, noop) as any;

    expect(actual).toHaveProperty('0', 1);
    expect(actual).toHaveProperty('1', 2);
    expect(actual).toHaveProperty('length', 2);
    expect(actual[Symbol.iterator]).toBe(Array.prototype[Symbol.iterator]);
    expect(actual).not.toBe(args);
  });

  it('should clone array-like objects when customizer returns undefined', () => {
    const object = { 0: 'a', length: 1 };

    const actual = cloneWith(object, noop);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it('should clone booleans when customizer returns undefined', () => {
    const object = false;

    const actual = cloneWith(object, noop);

    expect(actual).toEqual(object);
    expect(actual).toBe(object);
  });

  it('should clone boolean objects when customizer returns undefined', () => {
    const object = Object(false);
    const customizer = () => undefined;
    const actual = cloneWith(object, customizer);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it('should clone date objects when customizer returns undefined', () => {
    const object = new Date();
    const actual = cloneWith(object, noop);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it('should clone Foo instances when customizer returns undefined', () => {
    class Foo {}

    const object = new Foo();
    const actual = cloneWith(object, noop);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it('should clone objects with object values when customizer returns undefined', () => {
    const object = { a: /a/, b: ['B'], c: { C: 1 } };

    const actual = cloneWith(object, noop);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it('should clone maps when customizer returns undefined', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);

    const actual = cloneWith(map, noop);

    expect(actual).toEqual(map);
    expect(actual).not.toBe(map);
  });

  it('should clone null values even with customizer', () => {
    const object = null;
    const customizer = () => undefined;
    const actual = cloneWith(object, customizer);

    expect(actual).toEqual(object);
    expect(actual).toBe(object);
  });

  it('should clone number objects when customizer returns undefined', () => {
    const object = Object(0);
    const actual = cloneWith(object, noop);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it('should clone regexes when customizer returns undefined', () => {
    const object = /a/gim;

    const actual = cloneWith(object, noop);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it('should clone sets when customizer returns undefined', () => {
    const set = new Set([1, 2]);

    const actual = cloneWith(set, noop);

    expect(actual).toEqual(set);
    expect(actual).not.toBe(set);
  });

  it('should clone string objects when customizer returns undefined', () => {
    const object = Object('a');
    const customizer = () => undefined;
    const actual = cloneWith(object, customizer);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
    expect(typeof actual).toBe('object');
  });

  it('should clone undefined values even with customizer', () => {
    const object = undefined;
    const customizer = () => undefined;
    const actual = cloneWith(object, customizer);

    expect(actual).toEqual(object);
    expect(actual).toBe(object);
  });

  it('should clone array buffers when customizer returns undefined', () => {
    if (typeof ArrayBuffer === 'undefined') {
      return;
    }

    const buffer = new ArrayBuffer(10);
    const actual = cloneWith(buffer, noop) as any;

    expect(actual.byteLength).toBe(buffer.byteLength);
    expect(actual).not.toBe(buffer);
  });

  it('should clone array buffers of various sizes when customizer returns undefined', () => {
    if (typeof ArrayBuffer === 'undefined') {
      return;
    }

    const sizes = [0, 1, 16, 1024];

    lodashStable.each(sizes, size => {
      const buffer = new ArrayBuffer(size);
      const actual = cloneWith(buffer, noop) as any;

      expect(actual.byteLength).toBe(size);
      expect(actual).not.toBe(buffer);
    });
  });

  it('should clone DataView objects when customizer returns undefined', () => {
    if (typeof ArrayBuffer === 'undefined' || typeof DataView === 'undefined') {
      return;
    }

    const buffer = new ArrayBuffer(16);
    const dataView = new DataView(buffer);

    dataView.setInt8(0, 42);
    dataView.setInt16(2, 12345, true);
    dataView.setFloat32(4, 3.14159, true);
    dataView.setFloat64(8, 123456789.123456, true);

    const cloned = cloneWith(dataView, noop) as any;

    expect(cloned).not.toBe(dataView);
    expect(cloned.buffer).not.toBe(dataView.buffer);
    expect(cloned.byteOffset).toBe(dataView.byteOffset);
    expect(cloned.byteLength).toBe(dataView.byteLength);

    expect(cloned.getInt8(0)).toBe(42);
    expect(cloned.getInt16(2, true)).toBe(12345);
    expect(cloned.getFloat32(4, true)).toBeCloseTo(3.14159, 5);
    expect(cloned.getFloat64(8, true)).toBeCloseTo(123456789.123456, 10);

    dataView.setInt8(0, 100);
    expect(cloned.getInt8(0)).toBe(42);
  });

  it('should clone `index` and `input` array properties when customizer returns undefined', () => {
    const array = /c/.exec('abcde') || [];
    const actual = cloneWith(array, noop) as any;

    expect(actual.index).toBe(2);
    expect(actual.input).toBe('abcde');
  });

  it('should clone `lastIndex` regexp property when customizer returns undefined', () => {
    const regexp = /c/g;
    regexp.exec('abcde');

    const actual = cloneWith(regexp, noop) as any;
    expect(actual.lastIndex).toBe(3);
  });

  it('should clone expando properties when customizer returns undefined', () => {
    const values = [false, true, 1, 'a'];
    const expected = values.map(() => true);

    const actual = values.map(value => {
      const object = Object(value);
      object.a = 1;
      const cloned = cloneWith(object, noop);
      return cloned.a === 1;
    });

    expect(actual).toEqual(expected);
  });

  it('should clone prototype objects when customizer returns undefined', () => {
    class Foo {
      b: number;

      constructor() {
        this.b = 1;
      }
    }
    Foo.prototype.b = 2;

    const actual = cloneWith(Foo.prototype, noop);

    expect(actual instanceof Foo).toBe(false);
    expect(actual).toEqual({ b: 2 });
  });

  it('should set the `[[Prototype]]` of a clone when customizer returns undefined', () => {
    class Foo {}

    expect(cloneWith(new Foo(), noop) instanceof Foo).toBe(true);
  });

  it('should set the `[[Prototype]]` of a clone even when the `constructor` is incorrect and customizer returns undefined', () => {
    class Foo {}

    Foo.prototype.constructor = Object;
    expect(cloneWith(new Foo(), noop) instanceof Foo).toBe(true);
    Foo.prototype.constructor = Foo;
  });

  it('should ensure `value` constructor is a function before using its `[[Prototype]]` when customizer returns undefined', () => {
    class Foo {}

    Foo.prototype.constructor = null as any;
    expect(cloneWith(new Foo(), noop) instanceof Foo).toBe(false);
    Foo.prototype.constructor = Foo;
  });

  it('should handle objects with null prototype when customizer returns undefined', () => {
    const obj = Object.create(null);
    obj.a = 1;
    obj.b = 2;

    const actual = cloneWith(obj, noop);

    expect(actual).toEqual({ a: 1, b: 2 });
  });

  it('should handle objects with modified prototype chain when customizer returns undefined', () => {
    function CustomProto() {}
    CustomProto.prototype.customMethod = function () {
      return 'custom';
    };

    const obj = Object.create(CustomProto.prototype);
    obj.a = 1;

    const actual = cloneWith(obj, noop);

    expect(actual.a).toBe(1);
    expect(Object.getPrototypeOf(actual)).toBe(CustomProto.prototype);
    expect((actual as any).customMethod()).toBe('custom');
  });

  it('should clone properties that shadow those on `Object.prototype` when customizer returns undefined', () => {
    const object = {
      constructor: Object.prototype.constructor,
      hasOwnProperty: Object.prototype.hasOwnProperty,
      isPrototypeOf: Object.prototype.isPrototypeOf,
      propertyIsEnumerable: Object.prototype.propertyIsEnumerable,
      toLocaleString: Object.prototype.toLocaleString,
      toString: Object.prototype.toString,
      valueOf: Object.prototype.valueOf,
    };

    const actual = cloneWith(object, noop);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it('should clone symbol properties when customizer returns undefined', () => {
    function Foo(this: any) {
      this[Symbol.for('c')] = { c: 1 };
    }

    if (Symbol) {
      const symbol2 = Symbol('b');
      Foo.prototype[symbol2] = 2;

      const symbol3 = Symbol('c');
      Object.defineProperty(Foo.prototype, symbol3, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: 3,
      });

      const object = { a: { b: new (Foo as any)() } } as any;
      object[Symbol.for('a')] = { b: 1 };

      const actual = cloneWith(object, noop) as any;

      expect(actual[Symbol.for('a')]).toBe(object[Symbol.for('a')]);
      expect(actual.a).toBe(object.a);
      expect(actual[Symbol.for('a')]).toEqual(object[Symbol.for('a')]);

      const symbols = Object.getOwnPropertySymbols(actual.a.b);
      expect(symbols.length).toBe(1);
      expect(symbols[0]).toBe(Symbol.for('c'));
      expect(actual.a.b[Symbol.for('c')]).toEqual(object.a.b[Symbol.for('c')]);
      expect(actual.a.b[symbol2]).toEqual(object.a.b[symbol2]);
      expect(actual.a.b[symbol3]).toEqual(object.a.b[symbol3]);
    }
  });

  it('should handle mixed enumerable and non-enumerable symbol properties when customizer returns undefined', () => {
    const enumSymbol = Symbol('enumerable');
    const nonEnumSymbol = Symbol('non-enumerable');

    const object = { a: 1 } as any;
    object[enumSymbol] = 'visible';

    Object.defineProperty(object, nonEnumSymbol, {
      value: 'hidden',
      enumerable: false,
      configurable: true,
      writable: true,
    });

    const actual = cloneWith(object, noop);

    expect(actual.a).toBe(1);
    expect(actual[enumSymbol]).toBe('visible');
    expect(actual[nonEnumSymbol]).toBeUndefined();

    const symbols = Object.getOwnPropertySymbols(actual);
    expect(symbols).toContain(enumSymbol);
    expect(symbols).not.toContain(nonEnumSymbol);
  });

  it('should clone symbol objects when customizer returns undefined', () => {
    const symbol = Symbol('a');
    expect(cloneWith(symbol, noop)).toBe(symbol);

    const object = Object(symbol);
    const actual = cloneWith(object, noop);

    expect(typeof actual).toBe('object');
    expect(typeof actual.valueOf()).toBe('symbol');
    expect(actual).not.toBe(object);
  });

  it('should not clone symbol primitives when customizer returns undefined', () => {
    const symbol = Symbol('a');
    expect(cloneWith(symbol, noop)).toBe(symbol);
  });

  it('should not error on DOM elements when customizer returns undefined', () => {
    if (typeof document === 'undefined') {
      return;
    }

    const element = document.createElement('div');

    try {
      expect(cloneWith(element, noop)).toEqual({});
    } catch (e) {
      expect(false).toBe(true);
    }
  });

  it('should perform a shallow clone when used as an iteratee for methods like `_.map` and customizer returns undefined', () => {
    const expected = [{ a: [0] }, { b: [1] }];
    const customizer = () => undefined;
    const actual = expected.map(obj => cloneWith(obj, customizer)) as any;

    expect(actual).toEqual(expected);
    expect(actual[0]).not.toBe(expected[0]);
    expect(actual[0].a).toBe(expected[0].a);
    expect(actual[1].b).toBe(expected[1].b);
  });

  lodashStable.each(typedArrays, type => {
    it(`should clone ${type} values when customizer returns undefined`, () => {
      const Ctor = global[type as keyof typeof global] as any;

      if (!Ctor) {
        return;
      }

      lodashStable.times(2, index => {
        const buffer = new ArrayBuffer(24);
        const view = index ? new Ctor(buffer, 8, 1) : new Ctor(buffer);
        const actual = cloneWith(view, noop);

        expect(actual).toEqual(view);
        expect(actual).not.toBe(view);
        expect(actual.buffer === view.buffer).toBe(true);
        expect(actual.byteOffset).toBe(view.byteOffset);
        expect(actual.length).toBe(view.length);
      });
    });
  });

  const uncloneableObjects = [
    'DOM elements',
    'functions',
    'async functions',
    'generator functions',
    'the Proxy constructor',
  ];

  lodashStable.each(uncloneableObjects, type => {
    it(`should not clone ${type} when customizer returns undefined`, () => {
      let value;

      if (type === 'DOM elements' && typeof document !== 'undefined') {
        value = document.body;
      } else if (type === 'functions') {
        value = function () {};
      } else if (type === 'async functions') {
        value = async function () {};
      } else if (type === 'generator functions') {
        value = function* () {};
      } else if (type === 'the Proxy constructor') {
        value = Proxy;
      }

      if (value) {
        const object = { a: value, b: { c: value } };
        const actual = cloneWith(object, noop);

        expect(actual).toEqual(object);
        expect(actual).not.toBe(object);
        expect(cloneWith(value, noop)).toEqual({});
      }
    });
  });

  const errorTypes = ['Error', 'EvalError', 'RangeError', 'ReferenceError', 'SyntaxError', 'TypeError', 'URIError'];

  lodashStable.each(errorTypes, type => {
    it(`should not clone ${type}s when customizer returns undefined`, () => {
      const Ctor = global[type as keyof typeof global];
      const value = new Ctor('error');

      const object = { a: value, b: { c: value } };
      const actual = cloneWith(object, noop);

      expect(actual).toEqual(object);
      expect(actual).not.toBe(object);
      expect(cloneWith(value, noop)).toEqual({});
    });
  });

  it('should handle customizer with return values for custom types', () => {
    class CustomType {
      value: number;
      constructor(value: number) {
        this.value = value;
      }
    }

    const customizer = (value: any) => {
      if (value instanceof CustomType) {
        return new CustomType(value.value * 2);
      }
    };

    const original = new CustomType(5);
    const cloned = cloneWith(original, customizer);

    expect(cloned).not.toBe(original);
    expect(cloned instanceof CustomType).toBe(true);
    expect((cloned as CustomType).value).toBe(10);
  });

  it('should customize only the top level value', () => {
    const customizer = (value: any) => {
      if (typeof value === 'number') {
        return value * 2;
      }
    };

    const obj = {
      num: 42,
      str: 'test',
    };

    const result = cloneWith(obj, customizer) as any;

    expect(result.num).toBe(42);
    expect(result.str).toBe('test');
    expect(result).not.toBe(obj);
  });

  it('should apply customizer to objects with custom tags', () => {
    if (typeof Map === 'undefined') {
      return;
    }

    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);

    const customizer = (value: any) => {
      if (value instanceof Map) {
        const newMap = new Map();
        value.forEach((val, key) => {
          newMap.set(key.toUpperCase(), val * 10);
        });
        return newMap;
      }
    };

    const result = cloneWith(map, customizer);

    expect(result).not.toBe(map);
    expect(result.get('A')).toBe(10);
    expect(result.get('B')).toBe(20);
    expect(result.get('a')).toBeUndefined();
  });

  it('should allow returning null from customizer', () => {
    const obj = { a: 1, b: 2 };

    const customizer = () => null;

    const result = cloneWith(obj, customizer);
    expect(result).toBe(null);
  });

  it('should apply customizer only to the top level value', () => {
    const obj = {
      a: 1,
      b: 'keep',
      c: { nested: true },
    };

    const customizer = (value: any) => {
      if (typeof value === 'object' && value !== null) {
        return { modified: true };
      }
    };

    const result = cloneWith(obj, customizer);

    expect(result).toEqual({ modified: true });
  });

  it('should use clone when customizer is not provided', () => {
    const obj = { a: 1, b: 2 };

    const result = cloneWith(obj);

    expect(result).toEqual(obj);
    expect(result).not.toBe(obj);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(cloneWith).toEqualTypeOf<typeof cloneWithLodash>();
  });
});
