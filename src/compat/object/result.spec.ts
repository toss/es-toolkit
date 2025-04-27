import { describe, expect, it } from 'vitest';
import * as lodashStable from 'es-toolkit/compat';
import { result } from './result';
import { stubB } from '../_internal/stubB';

describe('result', () => {
  const object = { a: 1, b: stubB };

  it('should invoke function values', () => {
    expect(result(object, 'b')).toBe('b');
  });

  it('should invoke default function values', () => {
    const actual = result(object, 'c', object.b);
    expect(actual).toBe('b');
  });

  it('should invoke nested function values', () => {
    const value = { a: lodashStable.constant({ b: stubB }) };

    lodashStable.each(['a.b', ['a', 'b']], path => {
      expect(result(value, path)).toBe('b');
    });
  });

  it('should invoke deep property methods with the correct `this` binding', () => {
    const value = {
      a: {
        b: function () {
          return this.c;
        },
        c: 1,
      },
    };

    lodashStable.each(['a.b', ['a', 'b']], path => {
      expect(result(value, path)).toBe(1);
    });
  });

  it('should handle null or undefined objects', () => {
    expect(result(null, 'a', 'default')).toBe('default');
    expect(result(undefined, 'a', 'default')).toBe('default');
  });

  it('should handle empty path arrays', () => {
    expect(result(object, [], 'default')).toBe('default');
    expect(result({}, [], 'default')).toEqual('default');
  });

  it('should handle paths starting with a dot', () => {
    const obj = { '': { a: 1 } };
    expect(result(obj, '.a')).toBe(1);
  });

  it('should handle quoted property names', () => {
    const obj = { a: { 'b-c': 1, 'b.c': 2 } };
    expect(result(obj, 'a["b-c"]')).toBe(1);
    expect(result(obj, 'a["b.c"]')).toBe(2);
  });

  it('should handle bracket notation with unquoted number indexes', () => {
    const arr = ['a', 'b', 'c'];
    expect(result(arr, '[1]')).toBe('b');
  });
});
