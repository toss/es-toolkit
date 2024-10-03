import { describe, expect, it } from 'vitest';
import { toMerged } from './toMerged';

describe('toMerged', () => {
  it('should merge properties from source object into target object', () => {
    const target = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };
    const result = toMerged(target, source);

    expect(result).toEqual({ a: 1, b: 3, c: 4 });
    expect(target).toEqual({ a: 1, b: 2 });
  });

  it('should deeply merge nested objects', () => {
    const target = { a: { x: 1, y: 2 }, b: 2 };
    const source = { a: { y: 3, z: 4 }, c: 5 };
    const result = toMerged(target, source);

    expect(result).toEqual({ a: { x: 1, y: 3, z: 4 }, b: 2, c: 5 });
    expect(target).toEqual({ a: { x: 1, y: 2 }, b: 2 });

    const names = {
      characters: [{ name: 'barney' }, { name: 'fred' }],
    };

    const ages = {
      characters: [{ age: 36 }, { age: 40 }],
    };

    const heights = {
      characters: [{ height: '5\'4"' }, { height: '5\'5"' }],
    };

    const expected = {
      characters: [
        { name: 'barney', age: 36, height: '5\'4"' },
        { name: 'fred', age: 40, height: '5\'5"' },
      ],
    };

    expect(toMerged(toMerged(names, ages), heights)).toEqual(expected);
    expect(names).toEqual({
      characters: [{ name: 'barney' }, { name: 'fred' }],
    });

    const target2 = { a: [1, 2], b: { x: 1 } };
    const source2 = { a: [3], b: { y: 2 } };
    expect(toMerged(target2, source2)).toEqual({ a: [3, 2], b: { x: 1, y: 2 } });
    expect(target2).toEqual({ a: [1, 2], b: { x: 1 } });
  });

  it('should merge arrays deeply', () => {
    const target = { a: [1, 2] };
    const source = { a: [3, 4] };
    const result = toMerged(target, source);

    expect(result).toEqual({ a: [3, 4] });
    expect(target).toEqual({ a: [1, 2] });
  });

  it('should handle merging with null values', () => {
    const target = { a: null };
    const source = { a: [1, 2, 3] };
    const result = toMerged(target, source);

    expect(result).toEqual({ a: [1, 2, 3] });
    expect(target).toEqual({ a: null });
  });

  it('should not overwrite existing values with undefined from source', () => {
    const target = { a: 1, b: 2 };
    const source = { b: undefined, c: 3 };
    const result = toMerged(target, source);

    expect(result).toEqual({ a: 1, b: 2, c: 3 });
    expect(target).toEqual({ a: 1, b: 2 });
  });

  it('should handle merging of deeply nested objects with arrays and objects', () => {
    const target = { a: { b: { c: [1] } } };
    const source = { a: { b: { c: [2], d: 3 }, e: [4] } };
    const result = toMerged(target, source);

    expect(result).toEqual({ a: { b: { c: [2], d: 3 }, e: [4] } });
    expect(target).toEqual({ a: { b: { c: [1] } } });
  });
});
