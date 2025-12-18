import { describe, expect, it } from 'vitest';
import { countBy } from './countBy';

describe('countBy', () => {
  it('should count occurrences based on value', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 1],
    ]);

    const result = countBy(map, value => value);

    expect(result).toEqual(
      new Map([
        [1, 2],
        [2, 1],
      ])
    );
  });

  it('should count occurrences based on key transformation', () => {
    const map = new Map([
      ['alice', 20],
      ['bob', 30],
      ['carol', 20],
    ]);

    const result = countBy(map, (_value, key) => key[0]);

    expect(result).toEqual(
      new Map([
        ['a', 1],
        ['b', 1],
        ['c', 1],
      ])
    );
  });

  it('should pass the original map to the callback function', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);

    const result = countBy(map, (value, _key, originalMap) => {
      expect(originalMap).toBe(map);
      return value + originalMap.size;
    });

    expect(result).toEqual(
      new Map([
        [3, 1],
        [4, 1],
      ])
    );
  });

  it('should handle an empty Map', () => {
    const map = new Map<string, number>();

    const result = countBy(map, value => value);

    expect(result).toEqual(new Map());
  });

  it('should handle a Map with one entry', () => {
    const map = new Map([['single', 42]]);

    const result = countBy(map, value => value);

    expect(result).toEqual(new Map([[42, 1]]));
  });

  it('should not modify the original Map', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);

    const originalEntries = Array.from(map.entries());
    countBy(map, value => value);

    expect(Array.from(map.entries())).toEqual(originalEntries);
  });

  it('should count all entries with the same generated key', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
      ['d', 4],
      ['e', 5],
    ]);

    const result = countBy(map, value => (value % 2 === 0 ? 'even' : 'odd'));

    expect(result).toEqual(
      new Map([
        ['odd', 3],
        ['even', 2],
      ])
    );
  });

  it('should work with number keys', () => {
    const map = new Map([
      [1, 'apple'],
      [2, 'banana'],
      [3, 'apricot'],
    ]);

    const result = countBy(map, value => value[0]);

    expect(result).toEqual(
      new Map([
        ['a', 2],
        ['b', 1],
      ])
    );
  });

  it('should work with object values', () => {
    const map = new Map([
      ['x', { type: 'fruit', name: 'apple' }],
      ['y', { type: 'fruit', name: 'banana' }],
      ['z', { type: 'vegetable', name: 'carrot' }],
    ]);

    const result = countBy(map, value => value.type);

    expect(result).toEqual(
      new Map([
        ['fruit', 2],
        ['vegetable', 1],
      ])
    );
  });

  it('should work with symbol keys as mapper result', () => {
    const symbolA = Symbol('a');
    const symbolB = Symbol('b');

    const map = new Map([
      ['x', 1],
      ['y', 2],
      ['z', 1],
    ]);

    const result = countBy(map, value => (value === 1 ? symbolA : symbolB));

    expect(result.get(symbolA)).toBe(2);
    expect(result.get(symbolB)).toBe(1);
  });

  it('should handle all entries mapping to the same key', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    const result = countBy(map, () => 'same');

    expect(result).toEqual(new Map([['same', 3]]));
    expect(result.size).toBe(1);
  });
});
