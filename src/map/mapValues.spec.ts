import { describe, expect, it } from 'vitest';
import { mapValues } from './mapValues';

describe('mapValues', () => {
  it('should map values of a Map', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    const result = mapValues(map, value => value * 2);

    expect(result).toEqual(
      new Map([
        ['a', 2],
        ['b', 4],
        ['c', 6],
      ])
    );
  });

  it('should pass the key to the callback function', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    const result = mapValues(map, (_, key) => `value_${key}`);

    expect(result).toEqual(
      new Map([
        ['a', 'value_a'],
        ['b', 'value_b'],
        ['c', 'value_c'],
      ])
    );
  });

  it('should pass the original map to the callback function', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);

    const result = mapValues(map, (value, key, originalMap) => {
      expect(originalMap).toBe(map);
      return value + originalMap.size;
    });

    expect(result).toEqual(
      new Map([
        ['a', 3],
        ['b', 4],
      ])
    );
  });

  it('should handle an empty Map', () => {
    const map = new Map<string, number>();

    const result = mapValues(map, value => value * 2);

    expect(result).toEqual(new Map());
  });

  it('should handle a Map with one entry', () => {
    const map = new Map([['single', 42]]);

    const result = mapValues(map, value => value + 8);

    expect(result).toEqual(new Map([['single', 50]]));
  });

  it('should not modify the original Map', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);

    const originalEntries = Array.from(map.entries());
    mapValues(map, value => value * 10);

    expect(Array.from(map.entries())).toEqual(originalEntries);
  });

  it('should work with number keys', () => {
    const map = new Map([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);

    const result = mapValues(map, value => value.toUpperCase());

    expect(result).toEqual(
      new Map([
        [1, 'A'],
        [2, 'B'],
        [3, 'C'],
      ])
    );
  });

  it('should work with various value types', () => {
    const map = new Map([
      ['string', 'hello'],
      ['number', 42],
      ['boolean', true],
      ['object', { name: 'test' }],
    ]);

    const result = mapValues(map, (value, key) => `${key}: ${JSON.stringify(value)}`);

    expect(result).toEqual(
      new Map([
        ['string', 'string: "hello"'],
        ['number', 'number: 42'],
        ['boolean', 'boolean: true'],
        ['object', 'object: {"name":"test"}'],
      ])
    );
  });

  it('should handle transforming value types', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    const result = mapValues(map, value => `number_${value}`);

    expect(result).toEqual(
      new Map([
        ['a', 'number_1'],
        ['b', 'number_2'],
        ['c', 'number_3'],
      ])
    );
  });
});
