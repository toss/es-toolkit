import { describe, expect, it } from 'vitest';
import { mapKeys } from './mapKeys';

describe('mapKeys', () => {
  it('should map keys of a Map with string keys', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    const result = mapKeys(map, (_, key) => `${key}_new`);

    expect(result).toEqual(
      new Map([
        ['a_new', 1],
        ['b_new', 2],
        ['c_new', 3],
      ])
    );
  });

  it('should map keys of a Map with number keys', () => {
    const map = new Map([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);

    const result = mapKeys(map, (_, key) => key * 2);

    expect(result).toEqual(
      new Map([
        [2, 'a'],
        [4, 'b'],
        [6, 'c'],
      ])
    );
  });

  it('should pass the value to the callback function', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    const result = mapKeys(map, value => `key_${value}`);

    expect(result).toEqual(
      new Map([
        ['key_1', 1],
        ['key_2', 2],
        ['key_3', 3],
      ])
    );
  });

  it('should pass the original map to the callback function', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);

    const result = mapKeys(map, (_value, key, originalMap) => {
      expect(originalMap).toBe(map);
      return `${key}_${originalMap.size}`;
    });

    expect(result).toEqual(
      new Map([
        ['a_2', 1],
        ['b_2', 2],
      ])
    );
  });

  it('should handle an empty Map', () => {
    const map = new Map<string, number>();

    const result = mapKeys(map, (_, key) => `${key}_new`);

    expect(result).toEqual(new Map());
  });

  it('should handle a Map with one entry', () => {
    const map = new Map([['single', 42]]);

    const result = mapKeys(map, (_, key) => `${key}_modified`);

    expect(result).toEqual(new Map([['single_modified', 42]]));
  });

  it('should not modify the original Map', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);

    const originalEntries = Array.from(map.entries());
    mapKeys(map, (_, key) => `${key}_new`);

    expect(Array.from(map.entries())).toEqual(originalEntries);
  });

  it('should handle duplicate keys by overwriting', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    const result = mapKeys(map, () => 'same');

    expect(result).toEqual(new Map([['same', 3]]));
    expect(result.size).toBe(1);
  });

  it('should work with symbol keys', () => {
    const symbolKey1 = Symbol('key1');
    const symbolKey2 = Symbol('key2');
    const symbolKey3 = Symbol('key3');
    const symbolKey4 = Symbol('key4');

    const map = new Map([
      [symbolKey1, 'value1'],
      [symbolKey2, 'value2'],
    ]);

    const result = mapKeys(map, (_, key) => (key === symbolKey1 ? symbolKey3 : symbolKey4));

    expect(result.get(symbolKey3)).toBe('value1');
    expect(result.get(symbolKey4)).toBe('value2');
  });
});
