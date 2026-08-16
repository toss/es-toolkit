import { describe, expect, it, vi } from 'vitest';
import { reduceAsync } from './reduceAsync';
import { delay } from '../promise/delay';

describe('reduceAsync', () => {
  it('reduces array to single value', async () => {
    const arr = [1, 2, 3, 4, 5];

    const reducer = vi.fn(async (acc: number, n: number) => {
      await delay(10);
      return acc + n;
    });

    const result = await reduceAsync(arr, reducer, 0);

    expect(result).toBe(15);
    expect(reducer).toHaveBeenCalledTimes(arr.length);
    expect(reducer.mock.calls[0]).toEqual([0, 1, 0, arr]);
    expect(reducer.mock.calls[1]).toEqual([1, 2, 1, arr]);
    expect(reducer.mock.calls[2]).toEqual([3, 3, 2, arr]);
    expect(reducer.mock.calls[3]).toEqual([6, 4, 3, arr]);
    expect(reducer.mock.calls[4]).toEqual([10, 5, 4, arr]);
  });

  it('returns initial value for empty array', async () => {
    const arr: number[] = [];
    const reducer = vi.fn(async (acc: number, n: number) => acc + n);

    const result = await reduceAsync(arr, reducer, 10);
    expect(result).toBe(10);

    expect(reducer).toHaveBeenCalledTimes(0);
  });

  it('can reduce to different type', async () => {
    const arr = [1, 2, 3];
    const reducer = async (acc: string, n: number) => {
      await delay(10);
      return acc + n.toString();
    };

    const result = await reduceAsync(arr, reducer, '');
    expect(result).toBe('123');
  });

  it('processes elements sequentially', async () => {
    const arr = [1, 2, 3, 4, 5];
    const order: number[] = [];

    const reducer = async (acc: number, n: number) => {
      order.push(n);
      await delay(10);
      return acc + n;
    };

    await reduceAsync(arr, reducer, 0);
    expect(order).toEqual([1, 2, 3, 4, 5]);
  });

  it('propagates rejection if reducer throws', async () => {
    const arr = [1, 2, 3];
    const errorFn = async (acc: number, item: number) => {
      if (item === 2) {
        throw new Error('fail');
      }
      return acc + item;
    };
    await expect(reduceAsync(arr, errorFn, 0)).rejects.toThrow('fail');
  });

  it('maintains correct accumulator across iterations', async () => {
    const arr = ['a', 'b', 'c'];
    const reducer = async (acc: string[], item: string) => {
      await delay(10);
      return [...acc, item.toUpperCase()];
    };

    const result = await reduceAsync(arr, reducer, [] as string[]);
    expect(result).toEqual(['A', 'B', 'C']);
  });

  describe('without initial value', () => {
    it('reduces array using first element as initial value', async () => {
      const arr = [1, 2, 3, 4, 5];

      const reducer = vi.fn(async (acc: number, n: number) => {
        await delay(10);
        return acc + n;
      });

      const result = await reduceAsync(arr, reducer);

      expect(result).toBe(15);
      expect(reducer).toHaveBeenCalledTimes(arr.length - 1);
      expect(reducer.mock.calls[0]).toEqual([1, 2, 1, arr]);
      expect(reducer.mock.calls[1]).toEqual([3, 3, 2, arr]);
      expect(reducer.mock.calls[2]).toEqual([6, 4, 3, arr]);
      expect(reducer.mock.calls[3]).toEqual([10, 5, 4, arr]);
    });

    it('returns undefined for empty array without initial value', async () => {
      const arr: number[] = [];
      const reducer = vi.fn(async (acc: number, n: number) => acc + n);

      const result = await reduceAsync(arr, reducer);
      expect(result).toBeUndefined();

      expect(reducer).toHaveBeenCalledTimes(0);
    });

    it('returns first element for single-element array', async () => {
      const arr = [42];
      const reducer = vi.fn(async (acc: number, n: number) => acc + n);

      const result = await reduceAsync(arr, reducer);
      expect(result).toBe(42);

      expect(reducer).toHaveBeenCalledTimes(0);
    });

    it('concatenates strings without initial value', async () => {
      const arr = ['Hello', ' ', 'World'];
      const reducer = async (acc: string, str: string) => {
        await delay(10);
        return acc + str;
      };

      const result = await reduceAsync(arr, reducer);
      expect(result).toBe('Hello World');
    });

    it('processes elements sequentially without initial value', async () => {
      const arr = [1, 2, 3, 4, 5];
      const order: number[] = [];

      const reducer = async (acc: number, n: number) => {
        order.push(n);
        await delay(10);
        return acc + n;
      };

      await reduceAsync(arr, reducer);
      expect(order).toEqual([2, 3, 4, 5]);
    });

    it('propagates rejection if reducer throws without initial value', async () => {
      const arr = [1, 2, 3, 4];
      const errorFn = async (acc: number, item: number) => {
        if (item === 3) {
          throw new Error('fail');
        }
        return acc + item;
      };
      await expect(reduceAsync(arr, errorFn)).rejects.toThrow('fail');
    });

    it('works with complex objects without initial value', async () => {
      const arr = [{ value: 1 }, { value: 2 }, { value: 3 }];

      const reducer = async (acc: { value: number }, item: { value: number }) => {
        await delay(10);
        return { value: acc.value + item.value };
      };

      const result = await reduceAsync(arr, reducer);
      expect(result).toEqual({ value: 6 });
    });
  });

  it('can build complex objects', async () => {
    const arr = [
      { key: 'a', value: 1 },
      { key: 'b', value: 2 },
      { key: 'c', value: 3 },
    ];

    const reducer = async (acc: Record<string, number>, item: { key: string; value: number }) => {
      await delay(10);
      acc[item.key] = item.value * 2;
      return acc;
    };

    const result = await reduceAsync(arr, reducer, {} as Record<string, number>);
    expect(result).toEqual({ a: 2, b: 4, c: 6 });
  });
});
