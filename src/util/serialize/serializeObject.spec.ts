import { describe, expect, it } from 'vitest';
import { serializeObject } from './serializeObject';

function serialize(value: object | null): string {
  return serializeObject(value, new Map());
}

describe('serializeObject', () => {
  it('should serialize null', () => {
    expect(serialize(null)).toBe('null');
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
      expect(serialize(new Date(0))).toBe('Date(1970-01-01T00:00:00.000Z)');
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
      expect(serialize(new Set([{ b: 1 }, { a: 1 }]))).toBe('Set[{a:1},{b:1}]');
    });

    it('should sort mixed values', () => {
      // `Array.prototype.sort` always places undefined elements last,
      // without consulting the comparator.
      expect(serialize(new Set([3, 'a', { b: 1 }, null, undefined]))).toBe("Set[3,'a',null,{b:1},undefined]");
    });
  });

  describe('Map', () => {
    it('should sort entries by key and serialize keys without quotes', () => {
      const map = new Map<unknown, unknown>([
        [1, 4],
        [2, 3],
        ['z', 2],
        ['a', '1'],
        [{ x: 42 }, '3'],
      ]);

      expect(serialize(map)).toBe("Map{1:4,2:3,a:'1',z:2,{x:42}:'3'}");
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
      expect(serialize(new Error('test'))).toBe('Error(Error: test)');
      expect(serialize(new TypeError('boom'))).toBe('Error(TypeError: boom)');
    });
  });

  describe('class instances', () => {
    it('should serialize class instances with the class name', () => {
      class Test {
        x = 1;
      }
      expect(serialize(new Test())).toBe('Test{x:1}');
    });

    it('should serialize class instances even when the class name exists in globalThis', () => {
      class CustomEvent {
        y = 1;
      }
      expect(serialize(new CustomEvent())).toBe('CustomEvent{y:1}');
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
      expect(serialize(new TestObject())).toBe('TestObject{a:1,b:2}');
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
      expect(serialize({ toJSON: () => 42, a: 1 })).toContain('toJSON:');
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
      expect(serialize(params)).toBe("URLSearchParams{bar:'baz',foo:'bar'}");
    });

    it('should serialize FormData', () => {
      const form = new FormData();
      form.set('foo', 'bar');
      form.set('bar', 'baz');
      expect(serialize(form)).toBe("FormData{bar:'baz',foo:'bar'}");
    });

    it('should serialize Headers', () => {
      const headers = new Headers();
      headers.set('b', '2');
      headers.set('a', '1');
      expect(serialize(headers)).toBe("Headers{a:'1',b:'2'}");
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
      expect(serialize(object)).toBe('{foo:#ref0}');
    });

    it('should serialize circular references in nested objects', () => {
      const object: Record<string, any> = { a: { b: {} } };
      object.a.b = object;
      expect(serialize(object)).toBe('{a:{b:#ref0}}');
    });

    it('should serialize circular references in arrays', () => {
      const array: unknown[] = [];
      array.push(array);
      expect(serialize(array)).toBe('[#ref0]');
    });

    it('should number back-references by visit order', () => {
      const object: Record<string, any> = { a: { b: { c: {} } } };
      object.a.b.c = object.a;
      expect(serialize(object)).toBe('{a:{b:{c:#ref1}}}');

      const deep: Record<string, any> = { x: { y: { z: {} } } };
      deep.x.y.z.ref1 = deep.x;
      deep.x.y.z.ref2 = deep;
      expect(serialize(deep)).toBe('{x:{y:{z:{ref1:#ref1,ref2:#ref0}}}}');
    });

    it('should serialize circular references in Map and Set', () => {
      const map = new Map();
      map.set('key', map);
      expect(serialize(map)).toBe('Map{key:#ref0}');

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
      expect(serialize({ a: shared, b: shared })).toBe('{a:{ref:#ref1},b:{ref:#ref1}}');
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
