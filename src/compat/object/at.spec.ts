import { describe, expect, it } from 'vitest';
import { at } from './at';

describe('at', () => {
  it('should get a property of `object` by path', () => {
    const object = { a: [{ b: { c: 3 } }, 4] };

    expect(at(object, 'a[0].b.c')).toEqual([3]);
    expect(at(object, ['a[0].b.c'])).toEqual([3]);
    expect(at(object, 'a[1]')).toEqual([4]);
    expect(at(object, ['a[1]'])).toEqual([4]);
  });

  it('should get multiple properties of `object` by paths', () => {
    const object = { a: [{ b: { c: 3 } }, 4] };

    expect(at(object, 'a[0].b.c', 'a[1]')).toEqual([3, 4]);
    expect(at(object, ['a[0].b.c', 'a[1]'])).toEqual([3, 4]);
  });

  it('should return `undefined` for nonexistent paths', () => {
    const object = { a: [{ b: { c: 3 } }, 4] };

    expect(at(object, 'a.b.c')).toEqual([undefined]);
    expect(at(object, ['a.b.c'])).toEqual([undefined]);
  });

  it('should work with arrays', () => {
    const array = [1, 2, 3];

    expect(at(array, 0, 2)).toEqual([1, 3]);
    expect(at(array, [0, 2])).toEqual([1, 3]);
  });

  it('should work with `arguments` objects', () => {
    (function (...args) {
      expect(at(args, 0, 2)).toEqual([1, 3]);
      expect(at(args, [0, 2])).toEqual([1, 3]);
    })(1, 2, 3);
  });

  it('should work with a falsey `object` argument', () => {
    expect(at(null, 'a.b.c')).toEqual([undefined]);
    expect(at(undefined, 'a.b.c')).toEqual([undefined]);
  });

  it('should support deep paths', () => {
    const object = { a: { b: 2, c: { d: 3 } } };

    expect(at(object, 'a.b', 'a.c.d')).toEqual([2, 3]);
    expect(at(object, ['a.b', 'a.c.d'])).toEqual([2, 3]);
  });

  it('should support path with array indices', () => {
    const object = { a: { b: [1, 2, 3] } };

    expect(at(object, 'a.b[0]', 'a.b[2]')).toEqual([1, 3]);
    expect(at(object, ['a.b[0]', 'a.b[2]'])).toEqual([1, 3]);
  });

  it('should handle complex object structures', () => {
    const object = {
      a: [1, 2, 3],
      b: { c: [4, 5, { d: [6, 7, { e: 8 }] }] },
    };

    expect(at(object, 'a[1]', 'b.c[2].d[2].e')).toEqual([2, 8]);
    expect(at(object, ['a[1]', 'b.c[2].d[2].e'])).toEqual([2, 8]);
  });

  it('should handle empty paths', () => {
    const object = { a: 1, b: 2 };

    expect(at(object)).toEqual([]);
  });
});
