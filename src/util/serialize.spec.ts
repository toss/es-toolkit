import { describe, expect, it, vi } from 'vitest';
import { serialize } from './serialize';

describe('serialize', () => {
  describe('primitives', () => {
    it('should serialize strings with quotes', () => {
      expect(serialize('hello world 😎')).toBe("'hello world 😎'");
      expect(serialize({ msg: 'hello world 😎' })).toBe("{'msg':'hello world 😎'}");
    });

    it('should serialize numbers', () => {
      expect(serialize(0)).toBe('0');
      expect(serialize(-0)).toBe('0');
      expect(serialize(100)).toBe('100');
      expect(serialize(NaN)).toBe('NaN');
      expect(serialize(Infinity)).toBe('Infinity');
    });

    it('should serialize booleans', () => {
      expect(serialize(true)).toBe('true');
      expect(serialize(false)).toBe('false');
    });

    it('should serialize null and undefined', () => {
      expect(serialize(null)).toBe('null');
      expect(serialize(undefined)).toBe('undefined');
    });

    it('should serialize bigints', () => {
      expect(serialize(123n)).toBe('123n');
    });

    it('should serialize symbols', () => {
      expect(serialize(Symbol('test'))).toBe("Symbol('test')");
    });

    it('should serialize functions', () => {
      expect(serialize(Math.max)).toBe('max:[native]');
      expect(serialize(Array.prototype.push)).toBe('push:[native]');
      expect(
        serialize(function add(a: number, b: number) {
          return a + b;
        })
      ).toBe('add:function add(a, b) {return a + b;}');
    });

    it('should detect native functions regardless of how the engine formats them', () => {
      // Safari formats native functions as `function max() {\n    [native code]\n}`.
      const max = function max() {};
      const original = Function.prototype.toString;
      const spy = vi.spyOn(Function.prototype, 'toString').mockImplementation(function (this: unknown) {
        return this === max ? 'function max() {\n    [native code]\n}' : original.call(this);
      });

      try {
        expect(serialize(max)).toBe('max:[native]');
      } finally {
        spy.mockRestore();
      }
    });

    it('should distinguish undefined from the string "undefined"', () => {
      expect(serialize([undefined, 'undefined'])).toBe("[undefined,'undefined']");
    });
  });

  describe('objects', () => {
    it('should serialize plain objects with sorted keys', () => {
      expect(serialize({ a: 1, b: 2 })).toBe("{'a':1,'b':2}");
      expect(serialize({ b: 2, a: 1 })).toBe("{'a':1,'b':2}");
    });

    it('should serialize nested structures', () => {
      expect(serialize({ a: [1, { b: new Set([2, 1]) }], c: 3n })).toBe("{'a':[1,{'b':Set[1,2]}],'c':3n}");
    });

    it('should serialize builtin objects', () => {
      expect(serialize(new Date(0))).toBe("Date('1970-01-01T00:00:00.000Z')");
      expect(serialize(/.*/)).toBe('RegExp(/.*/)');
      expect(serialize(new Map([['a', 1]]))).toBe("Map{'a':1}");
      expect(serialize(new Uint8Array([1, 2, 3]))).toBe('Uint8Array[1,2,3]');
    });

    it('should throw a TypeError for unsupported objects', () => {
      expect(() => serialize(new WeakMap())).toThrow(TypeError);
      expect(() => serialize({ a: new Promise(() => {}) })).toThrow(TypeError);
    });
  });

  describe('stability', () => {
    it('should produce the same output regardless of key insertion order', () => {
      expect(serialize({ b: 2, a: 1 })).toBe(serialize({ a: 1, b: 2 }));
      expect(serialize(new Set([3, 1, 2]))).toBe(serialize(new Set([2, 3, 1])));
      expect(
        serialize(
          new Map<string, number>([
            ['a', 1],
            ['b', 2],
          ])
        )
      ).toBe(
        serialize(
          new Map<string, number>([
            ['b', 2],
            ['a', 1],
          ])
        )
      );
    });

    it('should sort NaN and mixed numbers and bigints regardless of insertion order', () => {
      expect(serialize(new Set([NaN, 1, -1, 2]))).toBe('Set[-1,1,2,NaN]');
      expect(serialize(new Set([1, NaN, -1, 2]))).toBe('Set[-1,1,2,NaN]');
      expect(serialize(new Set([-1, 1, 2, NaN]))).toBe('Set[-1,1,2,NaN]');
      expect(serialize(new Set([NaN, Infinity, -Infinity, 0]))).toBe('Set[-Infinity,0,Infinity,NaN]');
      expect(serialize(new Set([0, Infinity, NaN, -Infinity]))).toBe('Set[-Infinity,0,Infinity,NaN]');

      expect(serialize(new Set([10, 9n, 2, 11n]))).toBe('Set[2,9n,10,11n]');
      expect(serialize(new Set([11n, 2, 10, 9n]))).toBe('Set[2,9n,10,11n]');
      expect(serialize(new Set([1n, 1, NaN, 2n]))).toBe('Set[1,1n,2n,NaN]');
      expect(serialize(new Set([NaN, 2n, 1, 1n]))).toBe('Set[1,1n,2n,NaN]');

      expect(
        serialize(
          new Map<number | bigint, number>([
            [NaN, 1],
            [10, 2],
            [9n, 3],
            [2, 4],
          ])
        )
      ).toBe('Map{2:4,9n:3,10:2,NaN:1}');
      expect(
        serialize(
          new Map<number | bigint, number>([
            [9n, 3],
            [2, 4],
            [NaN, 1],
            [10, 2],
          ])
        )
      ).toBe('Map{2:4,9n:3,10:2,NaN:1}');
    });

    it('should sort mixed types regardless of insertion order', () => {
      const values = [2, 'a', 10, null, true, 1n, [1], { k: 1 }, undefined, Symbol.for('s')];
      const expected = serialize(new Set(values));

      expect(expected).toBe("Set['a',1n,2,10,Symbol('s'),[1],null,true,{'k':1},undefined]");

      for (let i = 1; i < values.length; i++) {
        expect(serialize(new Set([...values.slice(i), ...values.slice(0, i)]))).toBe(expected);
        expect(serialize(new Set([...values.slice(0, i).reverse(), ...values.slice(i).reverse()]))).toBe(expected);
      }
    });

    it('should produce the same output for structurally equal values', () => {
      const shared = { _: 1, b: { _: 2, c: { _: 3 } } };

      expect(serialize({ a: shared, b: shared })).toBe(
        serialize({
          a: { _: 1, b: { _: 2, c: { _: 3 } } },
          b: { _: 1, b: { _: 2, c: { _: 3 } } },
        })
      );
    });

    it('should not depend on the locale when sorting keys', () => {
      // In Slovak, `ch` is a single letter sorted after `h`; code unit
      // ordering keeps `checkIn` before `destination` in every locale.
      expect(serialize({ destination: 'bar', checkIn: 'foo' })).toBe("{'checkIn':'foo','destination':'bar'}");
    });

    it('should distinguish values with different types', () => {
      expect(serialize(1)).not.toBe(serialize('1'));
      expect(serialize([1, 2])).not.toBe(serialize(new Set([1, 2])));
      expect(serialize({ a: 1 })).not.toBe(serialize(new Map([['a', 1]])));
    });
  });

  describe('strings', () => {
    it('should wrap the string in single quotes', () => {
      expect(serialize('abc')).toBe("'abc'");
      expect(serialize('')).toBe("''");
    });

    it('should keep unicode characters as-is', () => {
      expect(serialize('hello world 😎')).toBe("'hello world 😎'");
      expect(serialize('한글')).toBe("'한글'");
    });

    it('should not escape quotes in the string', () => {
      expect(serialize("a'b")).toBe("'a'b'");
    });
  });

  describe('numbers', () => {
    it('should serialize integers', () => {
      expect(serialize(0)).toBe('0');
      expect(serialize(100)).toBe('100');
      expect(serialize(-100)).toBe('-100');
    });

    it('should serialize -0 as 0', () => {
      expect(serialize(-0)).toBe('0');
    });

    it('should serialize floating point numbers', () => {
      expect(serialize(1.5)).toBe('1.5');
      expect(serialize(Number.EPSILON)).toBe('2.220446049250313e-16');
    });

    it('should serialize NaN and Infinity', () => {
      expect(serialize(NaN)).toBe('NaN');
      expect(serialize(Infinity)).toBe('Infinity');
      expect(serialize(-Infinity)).toBe('-Infinity');
    });
  });

  describe('bigints', () => {
    it('should serialize bigints with an n suffix', () => {
      expect(serialize(0n)).toBe('0n');
      expect(serialize(123n)).toBe('123n');
      expect(serialize(-123n)).toBe('-123n');
      expect(serialize(9007199254740991n)).toBe('9007199254740991n');
    });

    it('should serialize bigints larger than Number.MAX_SAFE_INTEGER', () => {
      expect(serialize(123456789012345678901234567890n)).toBe('123456789012345678901234567890n');
    });
  });

  describe('symbols', () => {
    it('should serialize symbols with a quoted description', () => {
      expect(serialize(Symbol('test'))).toBe("Symbol('test')");
    });

    it('should distinguish no description from an empty description', () => {
      expect(serialize(Symbol())).toBe('Symbol()');
      expect(serialize(Symbol(''))).toBe("Symbol('')");
    });

    it('should serialize registered symbols the same as unregistered ones', () => {
      expect(serialize(Symbol.for('test'))).toBe("Symbol('test')");
    });

    it('should serialize well-known symbols', () => {
      expect(serialize(Symbol.iterator)).toBe("Symbol('Symbol.iterator')");
    });
  });

  describe('functions', () => {
    it('should serialize function declarations as name:source', () => {
      function sum(a: number, b: number) {
        return a + b;
      }
      expect(serialize(sum)).toBe('sum:function sum(a, b) {return a + b;}');
    });

    it('should serialize arrow functions as name:source', () => {
      const sum = (a: number, b: number) => a + b;
      expect(serialize(sum)).toBe('sum:(a, b) => a + b');
    });

    it('should collapse newlines and surrounding whitespace in the source', () => {
      function withBranches(a: number) {
        if (a > 0) {
          return a;
        }
        return -a;
      }
      expect(serialize(withBranches)).toBe('withBranches:function withBranches(a) {if (a > 0) {return a;};return -a;}');
    });

    it('should serialize classes as name:source', () => {
      class Foo {
        x = 1;
      }
      expect(serialize(Foo)).toBe('Foo:class Foo {x = 1;}');
    });

    it('should serialize native functions as name:[native]', () => {
      expect(serialize(Math.max)).toBe('max:[native]');
      expect(serialize(Array)).toBe('Array:[native]');
      expect(serialize(parseInt)).toBe('parseInt:[native]');
    });

    it('should serialize bound functions as name:[native]', () => {
      function original(a: number) {
        return a;
      }
      expect(serialize(original.bind(null))).toBe('bound original:[native]');
    });

    it('should distinguish functions with identical sources by name', () => {
      const first = (a: number) => a;
      const second = (a: number) => a;
      expect(serialize(first)).toBe('first:(a) => a');
      expect(serialize(second)).toBe('second:(a) => a');
    });

    it('should serialize anonymous functions with an empty name', () => {
      expect(serialize([(a: number) => a][0])).toBe(':(a) => a');
    });
  });

  describe('plain objects', () => {
    it("should serialize plain objects as {'key':value}", () => {
      expect(serialize({ a: 1, b: 2 })).toBe("{'a':1,'b':2}");
      expect(serialize({})).toBe('{}');
    });

    it('should sort keys by code unit', () => {
      expect(serialize({ b: 2, a: 1 })).toBe("{'a':1,'b':2}");
      expect(serialize({ 10: 1, 9: 2, 2: 3 })).toBe("{'10':1,'2':3,'9':2}");
    });

    it('should serialize nested values', () => {
      expect(serialize({ a: { b: 'c' }, d: [1, 2] })).toBe("{'a':{'b':'c'},'d':[1,2]}");
    });

    it('should ignore symbol keys', () => {
      expect(serialize({ [Symbol('s')]: 123 })).toBe('{}');
    });

    it('should ignore non-enumerable properties', () => {
      const object = {};
      Object.defineProperty(object, 'x', { value: 1, enumerable: false });
      expect(serialize(object)).toBe('{}');
    });

    it('should ignore inherited properties', () => {
      const object = Object.create({ inherited: 1 });
      object.own = 2;
      expect(serialize(object)).toBe("{'own':2}");
    });

    it('should serialize objects with a null prototype', () => {
      const object = Object.create(null);
      object.a = 1;
      expect(serialize(object)).toBe("{'a':1}");
    });

    it('should invoke getters', () => {
      const object = {
        get a() {
          return 1;
        },
      };
      expect(serialize(object)).toBe("{'a':1}");
    });
  });

  describe('arrays', () => {
    it('should keep the order of array elements', () => {
      expect(serialize([1, 2, 'x', 3])).toBe("[1,2,'x',3]");
      expect(serialize([2, 3, 'x', 1])).toBe("[2,3,'x',1]");
    });

    it('should serialize empty arrays', () => {
      expect(serialize([])).toBe('[]');
    });

    it('should serialize holes as undefined', () => {
      // eslint-disable-next-line no-sparse-arrays
      expect(serialize([1, , 3])).toBe('[1,undefined,3]');
    });

    it('should ignore extra properties on arrays', () => {
      const array: number[] & { x?: number } = [1];
      array.x = 2;
      expect(serialize(array)).toBe('[1]');
    });
  });

  describe('Date', () => {
    it('should serialize dates in ISO format', () => {
      expect(serialize(new Date(0))).toBe("Date('1970-01-01T00:00:00.000Z')");
    });

    it('should serialize invalid dates as Date(null)', () => {
      expect(serialize(new Date(NaN))).toBe('Date(null)');
    });
  });

  describe('RegExp', () => {
    it('should serialize regular expressions with flags', () => {
      expect(serialize(/.*/)).toBe('RegExp(/.*/)');
      expect(serialize(/ab+c/gi)).toBe('RegExp(/ab+c/gi)');
    });
  });

  describe('Set', () => {
    it('should sort Set values', () => {
      expect(serialize(new Set([1, 2, 3]))).toBe('Set[1,2,3]');
      expect(serialize(new Set([2, 3, 1]))).toBe('Set[1,2,3]');
    });

    it('should sort object values by their serialized form', () => {
      expect(serialize(new Set([{ b: 1 }, { a: 1 }]))).toBe("Set[{'a':1},{'b':1}]");
    });

    it('should sort mixed values', () => {
      // `Array.prototype.sort` always places undefined elements last,
      // without consulting the comparator.
      expect(serialize(new Set([3, 'a', { b: 1 }, null, undefined]))).toBe("Set['a',3,null,{'b':1},undefined]");
    });

    it('should sort numbers numerically', () => {
      expect(serialize(new Set([10, 9, 1]))).toBe('Set[1,9,10]');
    });

    it('should sort strings by code unit', () => {
      expect(serialize(new Set(['b', 'a', 'B']))).toBe("Set['B','a','b']");
    });

    it('should not depend on the locale', () => {
      // In Slovak, the digraph `ch` is a single letter sorted after `h`.
      expect(serialize(new Set(['hz', 'chz']))).toBe("Set['chz','hz']");
    });

    it('should sort NaN after every other number', () => {
      expect(serialize(new Set([NaN, Infinity, 1n, -Infinity]))).toBe('Set[-Infinity,1n,Infinity,NaN]');
    });

    it('should sort numbers and bigints numerically', () => {
      // A number sorts before a bigint of the same value.
      expect(serialize(new Set([10n, 2, 1n, 1, 9n]))).toBe('Set[1,1n,2,9n,10n]');
    });

    it('should sort strings before numbers and numbers before other values', () => {
      expect(serialize(new Set([true, 3n, null, 'a', 3]))).toBe("Set['a',3,3n,null,true]");
    });

    it('should sort other values by their serialized form', () => {
      // "[1]" < "null" < "{'b':1}"
      expect(serialize(new Set([{ b: 1 }, null, [1]]))).toBe("Set[[1],null,{'b':1}]");
      expect(serialize(new Set([{ a: 1 }, { a: 1 }]))).toBe("Set[{'a':1},{'a':1}]");
    });
  });

  describe('Map', () => {
    it('should sort entries by key and quote string keys', () => {
      const map = new Map<unknown, unknown>([
        [1, 4],
        [2, 3],
        ['z', 2],
        ['a', '1'],
        [{ x: 42 }, '3'],
      ]);

      expect(serialize(map)).toBe("Map{'a':'1','z':2,1:4,2:3,{'x':42}:'3'}");
    });

    it('should serialize empty maps', () => {
      expect(serialize(new Map())).toBe('Map{}');
    });
  });

  describe('typed arrays', () => {
    it('should serialize typed arrays with their type name', () => {
      expect(serialize(new Int8Array([1, 2, 3]))).toBe('Int8Array[1,2,3]');
      expect(serialize(new Uint8Array([1, 2, 3]))).toBe('Uint8Array[1,2,3]');
      expect(serialize(new Uint8ClampedArray([1, 2, 3]))).toBe('Uint8ClampedArray[1,2,3]');
      expect(serialize(new Int16Array([1, 2, 3]))).toBe('Int16Array[1,2,3]');
      expect(serialize(new Uint16Array([1, 2, 3]))).toBe('Uint16Array[1,2,3]');
      expect(serialize(new Int32Array([1, 2, 3]))).toBe('Int32Array[1,2,3]');
      expect(serialize(new Uint32Array([1, 2, 3]))).toBe('Uint32Array[1,2,3]');
      expect(serialize(new Float32Array([1, 2, 3]))).toBe('Float32Array[1,2,3]');
      expect(serialize(new Float64Array([1, 2, 3]))).toBe('Float64Array[1,2,3]');
    });

    it('should serialize bigint typed arrays with n suffixes', () => {
      expect(serialize(new BigInt64Array([1n, 2n, 3n]))).toBe('BigInt64Array[1n,2n,3n]');
      expect(serialize(new BigUint64Array([1n, 2n, 3n]))).toBe('BigUint64Array[1n,2n,3n]');
      expect(serialize(new BigInt64Array([]))).toBe('BigInt64Array[]');
      expect(serialize(new BigUint64Array([]))).toBe('BigUint64Array[]');
    });

    it('should serialize Buffer as Uint8Array', () => {
      expect(serialize(Buffer.from('hello'))).toBe('Uint8Array[104,101,108,108,111]');
    });
  });

  describe('ArrayBuffer', () => {
    it('should serialize the underlying bytes', () => {
      expect(serialize(new Uint8Array([1, 2, 3]).buffer)).toBe('ArrayBuffer[1,2,3]');
      expect(serialize(new ArrayBuffer(2))).toBe('ArrayBuffer[0,0]');
    });
  });

  describe('Error', () => {
    it('should serialize errors with their name and message', () => {
      expect(serialize(new Error('test'))).toBe("Error(Error: 'test')");
      expect(serialize(new TypeError('boom'))).toBe("Error(TypeError: 'boom')");
    });

    it('should keep the name and message boundary unambiguous', () => {
      const first = new Error('b: c');
      first.name = 'a';
      const second = new Error('c');
      second.name = 'a: b';

      expect(serialize(first)).toBe("Error(a: 'b: c')");
      expect(serialize(second)).toBe("Error(a: b: 'c')");
      expect(serialize(new Error(''))).toBe("Error(Error: '')");
    });
  });

  describe('class instances', () => {
    it('should serialize class instances with the class name', () => {
      class Test {
        x = 1;
      }
      expect(serialize(new Test())).toBe("Test{'x':1}");
    });

    it('should serialize class instances even when the class name exists in globalThis', () => {
      class CustomEvent {
        y = 1;
      }
      expect(serialize(new CustomEvent())).toBe("CustomEvent{'y':1}");
    });

    it('should use toJSON when available', () => {
      class TestArray {
        toJSON() {
          return [1, 2, 3];
        }
      }
      expect(serialize(new TestArray())).toBe('TestArray[1,2,3]');

      class TestObject {
        toJSON() {
          return { a: 1, b: 2 };
        }
      }
      expect(serialize(new TestObject())).toBe("TestObject{'a':1,'b':2}");
    });

    it('should wrap primitive toJSON results in parentheses', () => {
      class TestNull {
        toJSON() {
          return null;
        }
      }
      expect(serialize(new TestNull())).toBe('TestNull(null)');

      class TestString {
        toJSON() {
          return 'value';
        }
      }
      expect(serialize(new TestString())).toBe("TestString('value')");
    });

    it('should serialize toJSON on plain objects', () => {
      // A plain object with toJSON is still serialized as a plain object.
      expect(serialize({ toJSON: () => 42, a: 1 })).toBe("{'a':1,'toJSON':toJSON:() => 42}");
    });

    it('should not loop forever when toJSON returns this', () => {
      class Test {
        toJSON() {
          return this;
        }
      }
      expect(serialize(new Test())).toBe('Test#ref0');
    });
  });

  describe('objects with entries()', () => {
    it('should serialize URLSearchParams', () => {
      const params = new URLSearchParams();
      params.set('foo', 'bar');
      params.set('bar', 'baz');
      expect(serialize(params)).toBe("URLSearchParams{'bar':'baz','foo':'bar'}");
    });

    it('should serialize FormData', () => {
      const form = new FormData();
      form.set('foo', 'bar');
      form.set('bar', 'baz');
      expect(serialize(form)).toBe("FormData{'bar':'baz','foo':'bar'}");
    });

    it('should serialize Headers', () => {
      const headers = new Headers();
      headers.set('b', '2');
      headers.set('a', '1');
      expect(serialize(headers)).toBe("Headers{'a':'1','b':'2'}");
    });
  });

  describe('unsupported objects', () => {
    it('should throw a TypeError for objects that cannot be serialized', () => {
      expect(() => serialize(new Blob(['x']))).toThrow(new TypeError('Cannot serialize Blob'));
      expect(() => serialize(new WeakMap())).toThrow(new TypeError('Cannot serialize WeakMap'));
      expect(() => serialize(new WeakSet())).toThrow(new TypeError('Cannot serialize WeakSet'));
      expect(() => serialize(new WeakRef({}))).toThrow(new TypeError('Cannot serialize WeakRef'));
      expect(() => serialize(new Promise(() => {}))).toThrow(new TypeError('Cannot serialize Promise'));
      expect(() => serialize(new DataView(new ArrayBuffer(4)))).toThrow(new TypeError('Cannot serialize DataView'));
    });

    it('should throw a TypeError for boxed primitives', () => {
      // eslint-disable-next-line no-new-wrappers
      expect(() => serialize(new String('x'))).toThrow(new TypeError('Cannot serialize String'));
      // eslint-disable-next-line no-new-wrappers
      expect(() => serialize(new Number(1))).toThrow(new TypeError('Cannot serialize Number'));
      // eslint-disable-next-line no-new-wrappers
      expect(() => serialize(new Boolean(true))).toThrow(new TypeError('Cannot serialize Boolean'));
    });

    it('should throw a TypeError for generators', () => {
      function* generator() {
        yield 1;
      }
      expect(() => serialize(generator())).toThrow(new TypeError('Cannot serialize Generator'));

      async function* asyncGenerator() {
        yield 1;
      }
      expect(() => serialize(asyncGenerator())).toThrow(new TypeError('Cannot serialize AsyncGenerator'));
    });
  });

  describe('circular references', () => {
    it('should serialize a self-referencing object', () => {
      const object: Record<string, unknown> = {};
      object.foo = object;
      expect(serialize(object)).toBe("{'foo':#ref0}");
    });

    it('should serialize circular references in nested objects', () => {
      const object: Record<string, any> = { a: { b: {} } };
      object.a.b = object;
      expect(serialize(object)).toBe("{'a':{'b':#ref0}}");
    });

    it('should serialize circular references in arrays', () => {
      const array: unknown[] = [];
      array.push(array);
      expect(serialize(array)).toBe('[#ref0]');
    });

    it('should number back-references by visit order', () => {
      const object: Record<string, any> = { a: { b: { c: {} } } };
      object.a.b.c = object.a;
      expect(serialize(object)).toBe("{'a':{'b':{'c':#ref1}}}");

      const deep: Record<string, any> = { x: { y: { z: {} } } };
      deep.x.y.z.ref1 = deep.x;
      deep.x.y.z.ref2 = deep;
      expect(serialize(deep)).toBe("{'x':{'y':{'z':{'ref1':#ref1,'ref2':#ref0}}}}");
    });

    it('should serialize circular references in Map and Set', () => {
      const map = new Map();
      map.set('key', map);
      expect(serialize(map)).toBe("Map{'key':#ref0}");

      const mapAsKey = new Map();
      mapAsKey.set(mapAsKey, 'value');
      expect(serialize(mapAsKey)).toBe("Map{#ref0:'value'}");

      const set = new Set();
      set.add(set);
      expect(serialize(set)).toBe('Set[#ref0]');
    });

    it('should serialize multiple references to the same object', () => {
      const shared: Record<string, unknown> = {};
      shared.ref = shared;
      expect(serialize({ a: shared, b: shared })).toBe("{'a':{'ref':#ref1},'b':{'ref':#ref1}}");
    });

    it('should reuse the serialized string of completed objects', () => {
      const shared = { _: 1, b: { _: 2, c: { _: 3 } } };
      const references = { a: shared, b: shared };
      const copies = {
        a: { _: 1, b: { _: 2, c: { _: 3 } } },
        b: { _: 1, b: { _: 2, c: { _: 3 } } },
      };

      expect(serialize(references)).toBe(serialize(copies));
    });
  });
});
