import { describe, expect, it } from 'vitest';
import { keyBy } from './keyBy';

describe('keyBy', () => {
  it('should map elements by the result of the key function', () => {
    const set = new Set([
      { id: 1, name: 'alice' },
      { id: 2, name: 'bob' },
      { id: 3, name: 'carol' },
    ]);

    const result = keyBy(set, value => value.id);

    expect(result).toEqual(
      new Map([
        [1, { id: 1, name: 'alice' }],
        [2, { id: 2, name: 'bob' }],
        [3, { id: 3, name: 'carol' }],
      ])
    );
  });

  it('should pass the original set to the key function', () => {
    const set = new Set([1, 2, 3]);

    const result = keyBy(set, (value, value2, originalSet) => {
      expect(originalSet).toBe(set);
      return value >= originalSet.size ? 'large' : 'small';
    });

    expect(result).toEqual(
      new Map([
        ['small', 2],
        ['large', 3],
      ])
    );
  });

  it('should return an empty Map for an empty Set', () => {
    const set = new Set<number>();

    const result = keyBy(set, value => value);

    expect(result).toEqual(new Map());
  });

  it('should use the last value when multiple elements produce the same key', () => {
    const set = new Set([
      { type: 'fruit', name: 'apple' },
      { type: 'fruit', name: 'banana' },
      { type: 'vegetable', name: 'carrot' },
    ]);

    const result = keyBy(set, value => value.type);

    expect(result).toEqual(
      new Map([
        ['fruit', { type: 'fruit', name: 'banana' }],
        ['vegetable', { type: 'vegetable', name: 'carrot' }],
      ])
    );
  });

  it('should handle string values', () => {
    const set = new Set(['apple', 'banana', 'cherry']);

    const result = keyBy(set, value => value[0]);

    expect(result).toEqual(
      new Map([
        ['a', 'apple'],
        ['b', 'banana'],
        ['c', 'cherry'],
      ])
    );
  });

  it('should handle numeric keys', () => {
    const set = new Set(['a', 'bb', 'ccc']);

    const result = keyBy(set, value => value.length);

    expect(result).toEqual(
      new Map([
        [1, 'a'],
        [2, 'bb'],
        [3, 'ccc'],
      ])
    );
  });

  it('should not modify the original Set', () => {
    const set = new Set([1, 2, 3]);
    const originalSize = set.size;
    const originalValues = Array.from(set);

    keyBy(set, value => value * 2);

    expect(set.size).toBe(originalSize);
    expect(Array.from(set)).toEqual(originalValues);
  });

  it('should handle boolean keys', () => {
    const set = new Set([1, 2, 3, 4, 5]);

    const result = keyBy(set, value => value > 3);

    expect(result).toEqual(
      new Map([
        [false, 3],
        [true, 5],
      ])
    );
  });

  it('should preserve the value types', () => {
    const obj1 = { id: 1, data: { nested: true } };
    const obj2 = { id: 2, data: { nested: false } };
    const set = new Set([obj1, obj2]);

    const result = keyBy(set, value => value.id);

    expect(result.get(1)).toBe(obj1);
    expect(result.get(2)).toBe(obj2);
  });
});
