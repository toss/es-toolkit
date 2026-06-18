import { describe, expect, it } from 'vitest';
import { forEach } from './forEach';

describe('forEach', () => {
  it('should execute callback for each entry in the Map', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    const result: Array<[string, number]> = [];
    forEach(map, (value, key) => {
      result.push([key, value]);
    });

    expect(result).toEqual([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
  });

  it('should pass the value, key, and map to the callback', () => {
    const map = new Map([
      ['x', 10],
      ['y', 20],
    ]);

    const results: Array<{ value: number; key: string; hasKey: boolean }> = [];
    forEach(map, (value, key, originalMap) => {
      results.push({
        value,
        key,
        hasKey: originalMap.has(key),
      });
    });

    expect(results).toEqual([
      { value: 10, key: 'x', hasKey: true },
      { value: 20, key: 'y', hasKey: true },
    ]);
  });

  it('should work with an empty Map', () => {
    const map = new Map<string, number>();
    let callCount = 0;

    forEach(map, () => {
      callCount++;
    });

    expect(callCount).toBe(0);
  });

  it('should work with a single-entry Map', () => {
    const map = new Map([['only', 42]]);
    const result: Array<[string, number]> = [];

    forEach(map, (value, key) => {
      result.push([key, value]);
    });

    expect(result).toEqual([['only', 42]]);
  });

  it('should iterate in insertion order', () => {
    const map = new Map<string, number>();
    map.set('first', 1);
    map.set('second', 2);
    map.set('third', 3);

    const keys: string[] = [];
    forEach(map, (_, key) => {
      keys.push(key);
    });

    expect(keys).toEqual(['first', 'second', 'third']);
  });

  it('should work with various value types', () => {
    const map = new Map<string, unknown>([
      ['str', 'hello'],
      ['num', 42],
      ['bool', true],
      ['obj', { id: 1 }],
      ['arr', [1, 2, 3]],
    ]);

    const values: any[] = [];
    forEach(map, value => {
      values.push(value);
    });

    expect(values).toEqual(['hello', 42, true, { id: 1 }, [1, 2, 3]]);
  });

  it('should work with symbol keys', () => {
    const key1 = Symbol('key1');
    const key2 = Symbol('key2');
    const map = new Map([
      [key1, 'value1'],
      [key2, 'value2'],
    ]);

    const keys: symbol[] = [];
    forEach(map, (_, key) => {
      keys.push(key);
    });

    expect(keys).toEqual([key1, key2]);
  });

  it('should work with number keys', () => {
    const map = new Map([
      [1, 'one'],
      [2, 'two'],
      [3, 'three'],
    ]);

    const result: Array<[number, string]> = [];
    forEach(map, (value, key) => {
      result.push([key, value]);
    });

    expect(result).toEqual([
      [1, 'one'],
      [2, 'two'],
      [3, 'three'],
    ]);
  });

  it('should allow side effects in the callback', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    let sum = 0;
    forEach(map, value => {
      sum += value;
    });

    expect(sum).toBe(6);
  });

  it('should work with complex nested structures', () => {
    const map = new Map([
      ['user1', { name: 'Alice', scores: [90, 85, 92] }],
      ['user2', { name: 'Bob', scores: [78, 81, 79] }],
    ]);

    const names: string[] = [];
    forEach(map, value => {
      names.push(value.name);
    });

    expect(names).toEqual(['Alice', 'Bob']);
  });
});
