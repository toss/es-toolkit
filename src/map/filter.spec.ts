import { describe, expect, it } from 'vitest';
import { filter } from './filter';

describe('filter', () => {
  it('should filter entries based on the predicate', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
      ['d', 4],
    ]);

    const result = filter(map, value => value > 2);

    expect(result).toEqual(
      new Map([
        ['c', 3],
        ['d', 4],
      ])
    );
  });

  it('should pass the key to the predicate function', () => {
    const map = new Map([
      ['apple', 1],
      ['banana', 2],
      ['cherry', 3],
    ]);

    const result = filter(map, (_, key) => key.startsWith('a'));

    expect(result).toEqual(new Map([['apple', 1]]));
  });

  it('should pass the original map to the predicate function', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    const result = filter(map, (value, _key, originalMap) => {
      expect(originalMap).toBe(map);
      return value >= originalMap.size;
    });

    expect(result).toEqual(new Map([['c', 3]]));
  });

  it('should return an empty Map when no entries match', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    const result = filter(map, value => value > 10);

    expect(result).toEqual(new Map());
  });

  it('should return all entries when all match the predicate', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    const result = filter(map, value => value > 0);

    expect(result).toEqual(map);
  });

  it('should handle an empty Map', () => {
    const map = new Map<string, number>();

    const result = filter(map, value => value > 0);

    expect(result).toEqual(new Map());
  });

  it('should not modify the original Map', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    const originalSize = map.size;
    const originalEntries = Array.from(map.entries());

    filter(map, value => value > 1);

    expect(map.size).toBe(originalSize);
    expect(Array.from(map.entries())).toEqual(originalEntries);
  });

  it('should work with number keys', () => {
    const map = new Map([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
      [4, 'd'],
    ]);

    const result = filter(map, (_, key) => key % 2 === 0);

    expect(result).toEqual(
      new Map([
        [2, 'b'],
        [4, 'd'],
      ])
    );
  });

  it('should work with complex predicates', () => {
    const map = new Map([
      ['user1', { age: 25, active: true }],
      ['user2', { age: 30, active: false }],
      ['user3', { age: 35, active: true }],
      ['user4', { age: 40, active: false }],
    ]);

    const result = filter(map, value => value.active && value.age >= 30);

    expect(result).toEqual(new Map([['user3', { age: 35, active: true }]]));
  });

  it('should handle boolean values', () => {
    const map = new Map([
      ['a', true],
      ['b', false],
      ['c', true],
      ['d', false],
    ]);

    const result = filter(map, value => value === true);

    expect(result).toEqual(
      new Map([
        ['a', true],
        ['c', true],
      ])
    );
  });

  it('should filter based on both key and value', () => {
    const map = new Map([
      ['apple', 5],
      ['banana', 3],
      ['cherry', 8],
      ['date', 2],
    ]);

    const result = filter(map, (value, key) => key.length > 5 && value > 2);

    expect(result).toEqual(
      new Map([
        ['banana', 3],
        ['cherry', 8],
      ])
    );
  });
});
