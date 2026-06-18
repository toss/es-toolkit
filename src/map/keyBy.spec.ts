import { describe, expect, it } from 'vitest';
import { keyBy } from './keyBy';

describe('keyBy', () => {
  it('should map entries by a property of the value', () => {
    const map = new Map([
      ['x', { type: 'fruit', name: 'apple' }],
      ['y', { type: 'fruit', name: 'banana' }],
      ['z', { type: 'vegetable', name: 'carrot' }],
    ]);

    const result = keyBy(map, item => item.type);

    expect(result).toEqual(
      new Map([
        ['fruit', { type: 'fruit', name: 'banana' }],
        ['vegetable', { type: 'vegetable', name: 'carrot' }],
      ])
    );
  });

  it('should use the last value when multiple entries produce the same key', () => {
    const map = new Map([
      ['a', { id: 1, name: 'first' }],
      ['b', { id: 1, name: 'second' }],
      ['c', { id: 2, name: 'third' }],
    ]);

    const result = keyBy(map, item => item.id);

    expect(result.get(1)).toEqual({ id: 1, name: 'second' });
    expect(result.get(2)).toEqual({ id: 2, name: 'third' });
    expect(result.size).toBe(2);
  });

  it('should pass the key to the callback function', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    const result = keyBy(map, (_value, key) => `key_${key}`);

    expect(result).toEqual(
      new Map([
        ['key_a', 1],
        ['key_b', 2],
        ['key_c', 3],
      ])
    );
  });

  it('should pass the original map to the callback function', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);

    const result = keyBy(map, (value, _key, originalMap) => {
      expect(originalMap).toBe(map);
      return value + originalMap.size;
    });

    expect(result).toEqual(
      new Map([
        [3, 1],
        [4, 2],
      ])
    );
  });

  it('should handle an empty Map', () => {
    const map = new Map<string, number>();

    const result = keyBy(map, value => value);

    expect(result).toEqual(new Map());
  });

  it('should handle a Map with one entry', () => {
    const map = new Map([['single', { id: 42, name: 'only one' }]]);

    const result = keyBy(map, item => item.id);

    expect(result).toEqual(new Map([[42, { id: 42, name: 'only one' }]]));
  });

  it('should not modify the original Map', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);

    const originalEntries = Array.from(map.entries());
    keyBy(map, value => value);

    expect(Array.from(map.entries())).toEqual(originalEntries);
  });

  it('should work with number keys in the original map', () => {
    const map = new Map([
      [1, 'apple'],
      [2, 'banana'],
      [3, 'apricot'],
    ]);

    const result = keyBy(map, value => value[0]);

    expect(result).toEqual(
      new Map([
        ['a', 'apricot'],
        ['b', 'banana'],
      ])
    );
  });

  it('should work with symbol keys as generated keys', () => {
    const symbolA = Symbol('a');
    const symbolB = Symbol('b');

    const map = new Map([
      ['x', 1],
      ['y', 2],
    ]);

    const result = keyBy(map, (_value, key) => (key === 'x' ? symbolA : symbolB));

    expect(result.get(symbolA)).toBe(1);
    expect(result.get(symbolB)).toBe(2);
  });

  it('should handle all entries mapping to the same key', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    const result = keyBy(map, () => 'same');

    expect(result).toEqual(new Map([['same', 3]]));
    expect(result.size).toBe(1);
  });

  it('should work with complex objects as values', () => {
    const user1 = { id: 'u1', name: 'Alice', age: 25 };
    const user2 = { id: 'u2', name: 'Bob', age: 30 };
    const user3 = { id: 'u3', name: 'Carol', age: 25 };

    const map = new Map([
      ['entry1', user1],
      ['entry2', user2],
      ['entry3', user3],
    ]);

    const result = keyBy(map, user => user.id);

    expect(result).toEqual(
      new Map([
        ['u1', user1],
        ['u2', user2],
        ['u3', user3],
      ])
    );
  });

  it('should preserve insertion order for unique keys', () => {
    const map = new Map([
      ['a', { order: 1 }],
      ['b', { order: 2 }],
      ['c', { order: 3 }],
    ]);

    const result = keyBy(map, (_value, key) => key.toUpperCase());
    const keys = Array.from(result.keys());

    expect(keys).toEqual(['A', 'B', 'C']);
  });
});
