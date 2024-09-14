import { describe, expect, it } from 'vitest';
import { unset } from './unset';
import { toString } from '../util/toString';
import { symbol } from '../_internal/symbol';
import { numberProto } from '../_internal/numberProto';
import { stringProto } from '../_internal/stringProto';

describe('unset', () => {
  it('should unset property values', () => {
    ['a', ['a']].forEach(path => {
      const object = { a: 1, c: 2 };
      expect(unset(object, path)).toBe(true);
      expect(object).toEqual({ c: 2 });
    });
  });

  it('should preserve the sign of `0`', () => {
    const props = [-0, Object(-0), 0, Object(0)];
    const expected = props.map(() => [true, false]);

    const actual = props.map(key => {
      const object = { '-0': 'a', 0: 'b' };
      return [unset(object, key), toString(key) in object];
    });

    expect(actual).toEqual(expected);
  });

  it('should unset symbol keyed property values', () => {
    const object: any = {};
    object[symbol] = 1;

    expect(unset(object, symbol)).toBe(true);
    expect(symbol in object).toBe(false);
  });

  it('should unset deep property values', () => {
    ['a.b', ['a', 'b']].forEach(path => {
      const object = { a: { b: null } };
      expect(unset(object, path)).toBe(true);
      expect(object).toEqual({ a: {} });
    });
  });

  it('should handle complex paths', () => {
    const paths = [
      'a[-1.23]["[\\"b\\"]"].c[\'[\\\'d\\\']\'][\ne\n][f].g',
      ['a', '-1.23', '["b"]', 'c', "['d']", '\ne\n', 'f', 'g'],
    ];

    paths.forEach(path => {
      const object = {
        a: {
          '-1.23': {
            '["b"]': {
              c: { "['d']": { '\ne\n': { f: { g: 8 } } } },
            },
          },
        },
      };
      expect(unset(object, path)).toBe(true);
      expect('g' in object.a[-1.23]['["b"]'].c["['d']"]['\ne\n'].f).toBe(false);
    });
  });

  it('should return `true` for nonexistent paths', () => {
    const object = { a: { b: { c: null } } };

    ['z', 'a.z', 'a.b.z', 'a.b.c.z'].forEach(path => {
      expect(unset(object, path)).toBe(true);
    });

    expect(object).toEqual({ a: { b: { c: null } } });
  });

  it('should not error when `object` is nullish', () => {
    const values = [null, undefined];
    const expected = [
      [true, true],
      [true, true],
    ];

    const actual = values.map(value => {
      try {
        return [unset(value, 'a.b'), unset(value, ['a', 'b'])];
      } catch (e: any) {
        return e.message;
      }
    });

    expect(actual).toEqual(expected);
  });

  it('should follow `path` over non-plain objects', () => {
    const object = { a: '' };
    const paths = ['constructor.prototype.a', ['constructor', 'prototype', 'a']];

    paths.forEach(path => {
      numberProto.a = 1;

      const actual = unset(0, path);
      expect(actual).toBe(true);
      expect('a' in numberProto).toBe(false);

      delete numberProto.a;
    });

    ['a.replace.b', ['a', 'replace', 'b']].forEach(path => {
      stringProto.replace.b = 1;

      const actual = unset(object, path);
      expect(actual).toBe(true);
      expect('a' in stringProto.replace).toBe(false);

      delete stringProto.replace.b;
    });
  });

  it('should return `false` for non-configurable properties', () => {
    const object = {};

    Object.defineProperty(object, 'a', {
      configurable: false,
      enumerable: true,
      writable: true,
      value: 1,
    });

    expect(unset(object, 'a')).toBe(false);
  });
});
