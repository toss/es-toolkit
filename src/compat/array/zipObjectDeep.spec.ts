import { describe, expect, it } from 'vitest';
import { zipObjectDeep } from './zipObjectDeep.ts';

describe('zipObject', () => {
  it('creates an object from two arrays of keys and values', () => {
    const symbols = [Symbol('a'), Symbol('b')];

    expect(zipObjectDeep(symbols, [1, 2])).toEqual({ [symbols[0]]: 1, [symbols[1]]: 2 });
    expect(zipObjectDeep([], [])).toEqual({});
    expect(zipObjectDeep(['a'], [1])).toEqual({ a: 1 });
    expect(zipObjectDeep([0, 1], [1, 2])).toEqual({ 0: 1, 1: 2 });
    expect(zipObjectDeep([0, 'a.b', symbols[0], 'a.c[0]', 'a.c[2].a'], [1, 2, 3, 4, 5])).toEqual({ 0: 1, [symbols[0]]: 3, a: { b: 2, c: [4, undefined, { a: 5 }] } });
    expect(zipObjectDeep(['a', 'b'], [1, 2, 3])).toEqual({ a: 1, b: 2 });
    expect(zipObjectDeep(['a', 'b', 'c'], [1, 2])).toEqual({ a: 1, b: 2, c: undefined });
    expect(zipObjectDeep(['a.b.c', 'd.e.f'], [1, 2])).toEqual({ a: { b: { c: 1 } }, d: { e: { f: 2 } } });
    expect(zipObjectDeep(['a.b.c', 'a.b.d', 'a.b.e.f'], [1, 2, 3])).toEqual({ a: { b: { c: 1, d: 2, e: { f: 3 } } } });
    expect(zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2])).toEqual({ 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } });
  });

  it('should zip together key/value arrays into an object', () => {
    const result = zipObjectDeep(['barney', 'fred'], [36, 40]);
    expect(result).toEqual({ barney: 36, fred: 40 });
  });

  it('should ignore extra \`values\`', () => {
    expect(zipObjectDeep(['a'], [1, 2])).toEqual({ a: 1 });
  });

  it('should assign \`undefined\` values for extra \`keys\`', () => {
    expect(zipObjectDeep(['a', 'b'], [1])).toEqual({ a: 1, b: undefined });
  });

  it('should support deep paths', () => {
    expect(zipObjectDeep(['a.b.c'], [1])).toEqual({ a: { b: { c: 1 } } })
  });
});
