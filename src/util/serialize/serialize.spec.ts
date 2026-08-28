import { describe, expect, it } from 'vitest';
import { serialize } from './serialize';

describe('serialize', () => {
  describe('primitives', () => {
    it('should serialize strings with quotes', () => {
      expect(serialize('hello world 😎')).toBe("'hello world 😎'");
      expect(serialize({ msg: 'hello world 😎' })).toBe("{msg:'hello world 😎'}");
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
      expect(serialize(Symbol('test'))).toBe('Symbol(test)');
    });

    it('should serialize functions', () => {
      expect(serialize(Math.max)).toBe('max:[native]');
    });

    it('should distinguish undefined from the string "undefined"', () => {
      expect(serialize([undefined, 'undefined'])).toBe("[undefined,'undefined']");
    });
  });

  describe('objects', () => {
    it('should serialize plain objects with sorted keys', () => {
      expect(serialize({ a: 1, b: 2 })).toBe('{a:1,b:2}');
      expect(serialize({ b: 2, a: 1 })).toBe('{a:1,b:2}');
    });

    it('should serialize nested structures', () => {
      expect(serialize({ a: [1, { b: new Set([2, 1]) }], c: 3n })).toBe('{a:[1,{b:Set[1,2]}],c:3n}');
    });

    it('should serialize builtin objects', () => {
      expect(serialize(new Date(0))).toBe('Date(1970-01-01T00:00:00.000Z)');
      expect(serialize(/.*/)).toBe('RegExp(/.*/)');
      expect(serialize(new Map([['a', 1]]))).toBe('Map{a:1}');
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
      expect(serialize({ destination: 'bar', checkIn: 'foo' })).toBe("{checkIn:'foo',destination:'bar'}");
    });

    it('should distinguish values with different types', () => {
      expect(serialize(1)).not.toBe(serialize('1'));
      expect(serialize([1, 2])).not.toBe(serialize(new Set([1, 2])));
      expect(serialize({ a: 1 })).not.toBe(serialize(new Map([['a', 1]])));
    });
  });

  describe('circular references', () => {
    it('should serialize circular references as back-references', () => {
      const object: Record<string, unknown> = {};
      object.self = object;
      expect(serialize(object)).toBe('{self:#ref0}');
    });
  });
});
