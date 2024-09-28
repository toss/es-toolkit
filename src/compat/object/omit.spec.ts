import { describe, expect, it } from 'vitest';
import { omit } from './omit';
import { toArgs } from '../_internal/toArgs';
import { objectProto } from '../_internal/objectProto';
import { stringProto } from '../_internal/stringProto';

describe('omit', () => {
  it('should omit deep properties', () => {
    const obj = { a: { b: { c: 1 } }, d: { e: 2 }, f: { g: 3 }, 'f.g': 4 };
    const result = omit(obj, ['a.b.c', 'f.g']);
    expect(result).toEqual({ a: { b: {} }, d: { e: 2 }, f: { g: 3 } });
  });

  const args = toArgs(['a', 'c']);
  const object = { a: 1, b: 2, c: 3, d: 4 };
  const nested = { a: 1, b: { c: 2, d: 3 } };

  it('should flatten `paths`', () => {
    expect(omit(object, 'a', 'c')).toEqual({ b: 2, d: 4 });
    expect(omit(object, ['a', 'd'], 'c')).toEqual({ b: 2 });
  });

  it('should support deep paths', () => {
    expect(omit(nested, 'b.c')).toEqual({ a: 1, b: { d: 3 } });
  });

  it('should support path arrays', () => {
    const object = { 'a.b': 1, a: { b: 2 } };
    const actual = omit(object, [['a.b']]);

    expect(actual).toEqual({ a: { b: 2 } });
  });

  it('should omit a key over a path', () => {
    const object = { 'a.b': 1, a: { b: 2 } };

    ['a.b', ['a.b']].forEach(path => {
      expect(omit(object, path)).toEqual({ a: { b: 2 } });
    });
  });

  it('should coerce `paths` to strings', () => {
    expect(omit({ 0: 'a' }, 0)).toEqual({});
  });

  it('should return an empty object when `object` is nullish', () => {
    [null, undefined].forEach(value => {
      objectProto.a = 1;
      const actual = omit(value, 'valueOf');
      delete objectProto.a;
      expect(actual).toEqual({});
    });
  });

  // Manipulating prototypes is an anti-pattern
  it.skip('should work with a primitive `object`', () => {
    stringProto.a = 1;
    stringProto.b = 2;

    // eslint-disable-next-line
    // @ts-ignore
    expect(omit('', 'b').a).toEqual(1);
    // eslint-disable-next-line
    // @ts-ignore
    expect(omit('', 'b').b).not.toEqual(2);

    delete stringProto.a;
    delete stringProto.b;
  });

  it('should work with `arguments` object `paths`', () => {
    // eslint-disable-next-line
    // @ts-ignore
    expect(omit(object, args)).toEqual({ b: 2, d: 4 });
  });

  it('should not mutate `object`', () => {
    ['a', ['a'], 'a.b', ['a.b']].forEach(path => {
      const object = { a: { b: 2 } };
      omit(object, path);
      expect(object).toEqual({ a: { b: 2 } });
    });
  });
});
