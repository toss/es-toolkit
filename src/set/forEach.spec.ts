import { describe, expect, it } from 'vitest';
import { forEach } from './forEach';

describe('forEach', () => {
  it('should execute callback for each element in the Set', () => {
    const set = new Set([1, 2, 3]);
    const result: number[] = [];

    forEach(set, value => {
      result.push(value);
    });

    expect(result).toEqual([1, 2, 3]);
  });

  it('should pass the value twice and the set to the callback', () => {
    const set = new Set(['a', 'b', 'c']);
    const results: Array<{ value1: string; value2: string; hasValue: boolean }> = [];

    forEach(set, (value, value2, originalSet) => {
      results.push({
        value1: value,
        value2: value2,
        hasValue: originalSet.has(value),
      });
    });

    expect(results).toEqual([
      { value1: 'a', value2: 'a', hasValue: true },
      { value1: 'b', value2: 'b', hasValue: true },
      { value1: 'c', value2: 'c', hasValue: true },
    ]);
  });

  it('should work with an empty Set', () => {
    const set = new Set<number>();
    let callCount = 0;

    forEach(set, () => {
      callCount++;
    });

    expect(callCount).toBe(0);
  });

  it('should work with a single-element Set', () => {
    const set = new Set([42]);
    const result: number[] = [];

    forEach(set, value => {
      result.push(value);
    });

    expect(result).toEqual([42]);
  });

  it('should iterate in insertion order', () => {
    const set = new Set<string>();
    set.add('first');
    set.add('second');
    set.add('third');

    const values: string[] = [];
    forEach(set, value => {
      values.push(value);
    });

    expect(values).toEqual(['first', 'second', 'third']);
  });

  it('should work with various value types', () => {
    const obj = { id: 1 };
    const arr = [1, 2, 3];
    const set = new Set(['hello', 42, true, obj, arr]);

    const values: any[] = [];
    forEach(set, value => {
      values.push(value);
    });

    expect(values).toEqual(['hello', 42, true, obj, arr]);
  });

  it('should work with object elements', () => {
    const set = new Set([
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
      { name: 'Charlie', age: 35 },
    ]);

    const names: string[] = [];
    forEach(set, value => {
      names.push(value.name);
    });

    expect(names).toEqual(['Alice', 'Bob', 'Charlie']);
  });

  it('should allow side effects in the callback', () => {
    const set = new Set([1, 2, 3, 4, 5]);
    let sum = 0;

    forEach(set, value => {
      sum += value;
    });

    expect(sum).toBe(15);
  });

  it('should work with boolean values', () => {
    const set = new Set([true, false]);
    const result: boolean[] = [];

    forEach(set, value => {
      result.push(value);
    });

    expect(result).toEqual([true, false]);
  });

  it('should work with symbol values', () => {
    const sym1 = Symbol('sym1');
    const sym2 = Symbol('sym2');
    const set = new Set([sym1, sym2]);

    const symbols: symbol[] = [];
    forEach(set, value => {
      symbols.push(value);
    });

    expect(symbols).toEqual([sym1, sym2]);
  });

  it('should handle large Sets', () => {
    const set = new Set(Array.from({ length: 1000 }, (_, i) => i));
    let count = 0;

    forEach(set, () => {
      count++;
    });

    expect(count).toBe(1000);
  });
});
