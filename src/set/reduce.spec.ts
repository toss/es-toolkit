import { describe, expect, it } from 'vitest';
import { reduce } from './reduce';

describe('reduce', () => {
  it('should reduce a Set to a single value with an initial value', () => {
    const set = new Set([1, 2, 3]);

    const result = reduce(set, (acc, value) => acc + value, 0);

    expect(result).toBe(6);
  });

  it('should return the accumulated value when no initial value is provided', () => {
    const set = new Set([1, 2, 3]);

    const result = reduce(set, (acc, value) => acc + value);

    expect(result).toBe(6);
  });

  it('should throw an error when reducing an empty Set without an initial value', () => {
    const set = new Set<number>();

    expect(() => reduce(set, (acc, value) => acc + value)).toThrow('Reduce of empty set with no initial value');
  });

  it('should handle an empty Set with an initial value', () => {
    const set = new Set<number>();

    const result = reduce(set, (acc, value) => acc + value, 10);

    expect(result).toBe(10);
  });

  it('should pass the original set to the callback function', () => {
    const set = new Set([1, 2]);

    const result = reduce(
      set,
      (acc, value, value2, originalSet) => {
        expect(originalSet).toBe(set);
        return acc + value;
      },
      0
    );

    expect(result).toBe(3);
  });

  it('should handle a single element Set with initial value', () => {
    const set = new Set([42]);

    const result = reduce(set, (acc, value) => acc + value, 10);

    expect(result).toBe(52);
  });

  it('should handle a single element Set without initial value', () => {
    const set = new Set([42]);

    const result = reduce(set, (acc, value) => acc + value);

    expect(result).toBe(42);
  });

  it('should work with string concatenation', () => {
    const set = new Set(['hello', ' ', 'world']);

    const result = reduce(set, (acc, value) => acc + value, '');

    expect(result).toBe('hello world');
  });

  it('should build an array from Set elements', () => {
    const set = new Set([1, 2, 3]);

    const result = reduce(
      set,
      (acc, value) => {
        acc.push(value * 2);
        return acc;
      },
      [] as number[]
    );

    expect(result).toEqual([2, 4, 6]);
  });

  it('should find maximum value', () => {
    const set = new Set([10, 25, 15]);

    const result = reduce(set, (acc, value) => (value > acc ? value : acc), 0);

    expect(result).toBe(25);
  });

  it('should find minimum value', () => {
    const set = new Set([10, 25, 15]);

    const result = reduce(set, (acc, value) => (value < acc ? value : acc), Infinity);

    expect(result).toBe(10);
  });

  it('should handle complex accumulation', () => {
    const set = new Set([
      { price: 100, quantity: 2 },
      { price: 50, quantity: 3 },
      { price: 75, quantity: 1 },
    ]);

    const result = reduce(set, (acc, value) => acc + value.price * value.quantity, 0);

    expect(result).toBe(425); // 100*2 + 50*3 + 75*1 = 200 + 150 + 75
  });

  it('should build an object from Set elements', () => {
    const set = new Set([
      { key: 'a', value: 1 },
      { key: 'b', value: 2 },
      { key: 'c', value: 3 },
    ]);

    const result = reduce(
      set,
      (acc, item) => {
        return { ...acc, [item.key]: item.value * 2 };
      },
      {} as Record<string, number>
    );

    expect(result).toEqual({ a: 2, b: 4, c: 6 });
  });

  it('should work with different accumulator type', () => {
    const set = new Set([1, 2, 3, 4, 5]);

    const result = reduce(
      set,
      (acc, value) => {
        if (value % 2 === 0) {
          acc.even.push(value);
        } else {
          acc.odd.push(value);
        }
        return acc;
      },
      { even: [], odd: [] } as { even: number[]; odd: number[] }
    );

    expect(result).toEqual({ even: [2, 4], odd: [1, 3, 5] });
  });

  it('should handle boolean values', () => {
    const set = new Set([true, false, true]);

    const result = reduce(set, (acc, value) => acc && value, true);

    expect(result).toBe(false);
  });

  it('should work with multiplication', () => {
    const set = new Set([2, 3, 4]);

    const result = reduce(set, (acc, value) => acc * value, 1);

    expect(result).toBe(24);
  });
});
