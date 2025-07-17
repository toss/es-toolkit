import { describe, expect, expectTypeOf, it } from 'vitest';
import * as lodashStable from 'es-toolkit/compat';
import { clone } from 'es-toolkit/compat';
import type { clone as cloneLodash } from 'lodash';
import { args } from '../_internal/args';
import { typedArrays } from '../_internal/typedArrays';

describe('clone', () => {
  it('should perform a shallow clone', () => {
    const array = [{ a: 0 }, { b: 1 }];
    const actual = clone(array);

    expect(actual).toEqual(array);
    expect(actual).not.toBe(array);
    expect(actual[0]).toBe(array[0]);
  });

  it('should clone arguments objects', () => {
    const actual = clone(args);

    expect(actual).toHaveProperty('0', 1);
    expect(actual).toHaveProperty('1', 2);
    expect(actual).toHaveProperty('2', 3);
    expect(actual).toHaveProperty('length', 3);
    expect(actual).not.toBe(args);
  });

  it('should clone arguments objects with Symbol.iterator', () => {
    const args = {
      0: 1,
      1: 2,
      length: 2,
      [Symbol.iterator]: Array.prototype[Symbol.iterator],
    };

    const actual = clone(args);

    expect(actual).toHaveProperty('0', 1);
    expect(actual).toHaveProperty('1', 2);
    expect(actual).toHaveProperty('length', 2);
    expect(actual[Symbol.iterator]).toBe(Array.prototype[Symbol.iterator]);
    expect(actual).not.toBe(args);
  });

  it('should clone arrays', () => {
    const object = ['a', ''];

    const actual = clone(object);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it('should clone array-like objects', () => {
    const object = { 0: 'a', length: 1 };

    const actual = clone(object);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it('should clone booleans', () => {
    const object = false;

    const actual = clone(object);

    expect(actual).toEqual(object);
    expect(actual).toBe(object);
  });

  it('should clone boolean objects', () => {
    const object = Object(false);

    const actual = clone(object);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it('should clone date objects', () => {
    const object = new Date();
    const actual = clone(object);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it('should clone Foo instances', () => {
    class Foo {}

    const object = new Foo();
    const actual = clone(object);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it('should clone objects', () => {
    const object = { a: 0, b: 1, c: 2 };

    const actual = clone(object);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it('should clone objects with object values', () => {
    const object = { a: /a/, b: ['B'], c: { C: 1 } };

    const actual = clone(object);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it('should clone maps', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);

    const actual = clone(map);

    expect(actual).toEqual(map);
    expect(actual).not.toBe(map);
  });

  it('should clone null values', () => {
    const object = null;
    const actual = clone(object);

    expect(actual).toEqual(object);
    expect(actual).toBe(object);
  });

  it('should clone numbers', () => {
    const object = 0;

    const actual = clone(object);

    expect(actual).toEqual(object);
    expect(actual).toBe(object);
  });

  it('should clone number objects', () => {
    const object = Object(0);
    const actual = clone(object);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it('should clone regexes', () => {
    const object = /a/gim;

    const actual = clone(object);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it('should clone sets', () => {
    const set = new Set([1, 2]);

    const actual = clone(set);

    expect(actual).toEqual(set);
    expect(actual).not.toBe(set);
  });

  it('should clone strings', () => {
    const object = 'a';

    const actual = clone(object);

    expect(actual).toEqual(object);
    expect(actual).toBe(object);
  });

  it('should clone string objects', () => {
    const object = Object('a');

    const actual = clone(object);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });
  it('should clone undefined values', () => {
    const object = undefined;

    const actual = clone(object);

    expect(actual).toEqual(object);
    expect(actual).toBe(object);
  });

  it('should clone array buffers', () => {
    if (typeof ArrayBuffer === 'undefined') {
      return;
    }

    const buffer = new ArrayBuffer(10);
    const actual = clone(buffer);

    expect(actual.byteLength).toBe(buffer.byteLength);
    expect(actual).not.toBe(buffer);
  });

  it('should clone array buffers of various sizes', () => {
    if (typeof ArrayBuffer === 'undefined') {
      return;
    }

    const sizes = [0, 1, 16, 1024];

    lodashStable.each(sizes, size => {
      const buffer = new ArrayBuffer(size);
      const actual = clone(buffer);

      expect(actual.byteLength).toBe(size);
      expect(actual).not.toBe(buffer);
    });
  });

  it('should clone DataView objects', () => {
    if (typeof ArrayBuffer === 'undefined' || typeof DataView === 'undefined') {
      return;
    }

    const buffer = new ArrayBuffer(16);
    const dataView = new DataView(buffer);

    dataView.setInt8(0, 42);
    dataView.setInt16(2, 12345, true);
    dataView.setFloat32(4, 3.14159, true);
    dataView.setFloat64(8, 123456789.123456, true);

    const cloned = clone(dataView);

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

  it('should clone DataView objects with new buffer', () => {
    if (typeof ArrayBuffer === 'undefined' || typeof DataView === 'undefined') {
      return;
    }

    const buffer = new ArrayBuffer(16);
    const dataView = new DataView(buffer);

    const cloned = clone(dataView);

    expect(cloned).not.toBe(dataView);
    expect(cloned.buffer).not.toBe(dataView.buffer);
    expect(cloned.byteLength).toBe(dataView.byteLength);
  });

  it('should clone `index` and `input` array properties', () => {
    const array = /c/.exec('abcde') || [];
    const actual = clone(array) as any;

    expect(actual.index).toBe(2);
    expect(actual.input).toBe('abcde');
  });

  it('should clone `lastIndex` regexp property', () => {
    const regexp = /c/g;
    regexp.exec('abcde');

    const actual = clone(regexp);
    expect(actual.lastIndex).toBe(3);
  });

  it('should clone expando properties', () => {
    const values = [false, true, 1, 'a'];
    const expected = values.map(() => true);

    const actual = values.map(value => {
      const object = Object(value);
      object.a = 1;
      const cloned = clone(object);
      return cloned.a === 1;
    });

    expect(actual).toEqual(expected);
  });

  it('should clone prototype objects', () => {
    class Foo {
      b: number;

      constructor() {
        this.b = 1;
      }
    }
    Foo.prototype.b = 2;

    const actual = clone(Foo.prototype);

    expect(actual instanceof Foo).toBe(false);
    expect(actual).toEqual({ b: 2 });
  });

  it('should set the `[[Prototype]]` of a clone', () => {
    class Foo {}

    expect(clone(new Foo()) instanceof Foo).toBe(true);
  });

  it('should set the `[[Prototype]]` of a clone even when the `constructor` is incorrect', () => {
    class Foo {}

    Foo.prototype.constructor = Object;
    expect(clone(new Foo()) instanceof Foo).toBe(true);
    Foo.prototype.constructor = Foo;
  });

  it('should ensure `value` constructor is a function before using its `[[Prototype]]`', () => {
    class Foo {}

    Foo.prototype.constructor = null as any;
    expect(clone(new Foo()) instanceof Foo).toBe(false);
    Foo.prototype.constructor = Foo;
  });

  it('should handle objects with null prototype', () => {
    const obj = Object.create(null);
    obj.a = 1;
    obj.b = 2;

    const actual = clone(obj);

    expect(actual).toEqual({ a: 1, b: 2 });
  });

  it('should handle objects with modified prototype chain', () => {
    function CustomProto() {}
    CustomProto.prototype.customMethod = function () {
      return 'custom';
    };

    const obj = Object.create(CustomProto.prototype);
    obj.a = 1;

    const actual = clone(obj);

    expect(actual.a).toBe(1);
    expect(Object.getPrototypeOf(actual)).toBe(CustomProto.prototype);
    expect((actual as any).customMethod()).toBe('custom');
  });

  it('should clone properties that shadow those on `Object.prototype`', () => {
    const object = {
      constructor: Object.prototype.constructor,
      hasOwnProperty: Object.prototype.hasOwnProperty,
      isPrototypeOf: Object.prototype.isPrototypeOf,
      propertyIsEnumerable: Object.prototype.propertyIsEnumerable,
      toLocaleString: Object.prototype.toLocaleString,
      toString: Object.prototype.toString,
      valueOf: Object.prototype.valueOf,
    };

    const actual = clone(object);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it('should clone symbol properties', () => {
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

      const actual = clone(object) as any;

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

  it('should handle mixed enumerable and non-enumerable symbol properties', () => {
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

    const actual = clone(object);

    expect(actual.a).toBe(1);
    expect(actual[enumSymbol]).toBe('visible');
    expect(actual[nonEnumSymbol]).toBeUndefined();

    const symbols = Object.getOwnPropertySymbols(actual);
    expect(symbols).toContain(enumSymbol);
    expect(symbols).not.toContain(nonEnumSymbol);
  });

  it('should clone symbol objects', () => {
    const symbol = Symbol('a');
    expect(clone(symbol)).toBe(symbol);

    const object = Object(symbol);
    const actual = clone(object);

    expect(typeof actual).toBe('object');
    expect(typeof actual.valueOf()).toBe('symbol');
    expect(actual).not.toBe(object);
  });

  it('should not clone symbol primitives', () => {
    const symbol = Symbol('a');
    expect(clone(symbol)).toBe(symbol);
  });

  it('should not error on DOM elements', () => {
    if (typeof document === 'undefined') {
      return;
    }

    const element = document.createElement('div');

    try {
      expect(clone(element)).toEqual({});
    } catch (e) {
      expect(false).toBe(true);
    }
  });

  it('should perform a shallow clone when used as an iteratee for methods like `_.map`', () => {
    const expected = [{ a: [0] }, { b: [1] }];
    const actual = expected.map(clone);

    expect(actual).toEqual(expected);
    expect(actual[0]).not.toBe(expected[0]);
    expect(actual[0].a).toBe(expected[0].a);
    expect(actual[1].b).toBe(expected[1].b);
  });

  lodashStable.each(typedArrays, type => {
    it(`should clone ${type} values`, () => {
      const Ctor = global[type as keyof typeof global] as any;

      if (!Ctor) {
        return;
      }

      lodashStable.times(2, index => {
        const buffer = new ArrayBuffer(24);
        const view = index ? new Ctor(buffer, 8, 1) : new Ctor(buffer);
        const actual = clone(view);

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
    it(`should not clone ${type}`, () => {
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
        const actual = clone(object);

        expect(actual).toEqual(object);
        expect(actual).not.toBe(object);
        expect(clone(value)).toEqual({});
      }
    });
  });

  const errorTypes = ['Error', 'EvalError', 'RangeError', 'ReferenceError', 'SyntaxError', 'TypeError', 'URIError'];

  lodashStable.each(errorTypes, type => {
    it(`should not clone ${type}s`, () => {
      const Ctor = global[type as keyof typeof global];
      const value = new Ctor('error');

      const object = { a: value, b: { c: value } };
      const actual = clone(object);

      expect(actual).toEqual(object);
      expect(actual).not.toBe(object);
      expect(clone(value)).toEqual({});
    });
  });

  it('should match the type of lodash', () => {
    expectTypeOf(clone).toEqualTypeOf<typeof cloneLodash>();
  });
});
