import { describe, expect, it, vi } from 'vitest';
import { reduce } from './reduce';

describe('reduce', () => {
  it('should reduce a Map to a single value with an initial value', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    const result = reduce(map, (acc, value) => acc + value, 0);

    expect(result).toBe(6);
  });

  it('should return the last value when no initial value is provided', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    const result = reduce(map, (acc, value) => acc + value);

    expect(result).toBe(6);
  });

  it('should throw an error when reducing an empty Map without an initial value', () => {
    const map = new Map<string, number>();

    expect(() => reduce(map, (acc, value) => acc + value)).toThrow('Reduce of empty map with no initial value');
  });

  it('should handle an empty Map with an initial value', () => {
    const map = new Map<string, number>();

    const result = reduce(map, (acc, value) => acc + value, 10);

    expect(result).toBe(10);
  });

  it('should pass the key to the callback function', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    const result = reduce(map, (acc, value, key) => acc + key, '');

    expect(result).toBe('abc');
  });

  it('should pass the original map to the callback function', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);

    const result = reduce(
      map,
      (acc, value, _key, originalMap) => {
        expect(originalMap).toBe(map);
        return acc + value;
      },
      0
    );

    expect(result).toBe(3);
  });

  it('should handle a single entry Map with initial value', () => {
    const map = new Map([['only', 42]]);

    const result = reduce(map, (acc, value) => acc + value, 10);

    expect(result).toBe(52);
  });

  it('should handle a single entry Map without initial value', () => {
    const map = new Map([['only', 42]]);

    const result = reduce(map, (acc, value) => acc + value);

    expect(result).toBe(42);
  });

  it('should work with string concatenation', () => {
    const map = new Map([
      ['a', 'hello'],
      ['b', ' '],
      ['c', 'world'],
    ]);

    const result = reduce(map, (acc, value) => acc + value, '');

    expect(result).toBe('hello world');
  });

  it('should work with number keys', () => {
    const map = new Map([
      [1, 10],
      [2, 20],
      [3, 30],
    ]);

    const result = reduce(map, (acc, value) => acc + value, 0);

    expect(result).toBe(60);
  });

  it('should build an object from Map entries', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    const result = reduce(
      map,
      (acc, value, key) => {
        return { ...acc, [key]: value * 2 };
      },
      {} as Record<string, number>
    );

    expect(result).toEqual({ a: 2, b: 4, c: 6 });
  });

  it('should find maximum value', () => {
    const map = new Map([
      ['a', 10],
      ['b', 25],
      ['c', 15],
    ]);

    const result = reduce(map, (acc, value) => (value > acc ? value : acc), 0);

    expect(result).toBe(25);
  });

  it('should find minimum value', () => {
    const map = new Map([
      ['a', 10],
      ['b', 25],
      ['c', 15],
    ]);

    const result = reduce(map, (acc, value) => (value < acc ? value : acc), Infinity);

    expect(result).toBe(10);
  });

  it('should handle complex accumulation', () => {
    const map = new Map([
      ['item1', { price: 100, quantity: 2 }],
      ['item2', { price: 50, quantity: 3 }],
      ['item3', { price: 75, quantity: 1 }],
    ]);

    const result = reduce(map, (acc, value) => acc + value.price * value.quantity, 0);

    expect(result).toBe(425); // 100*2 + 50*3 + 75*1 = 200 + 150 + 75
  });

  it('should use null as the initial value', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);
    const callback = vi.fn((acc: number | null, value: number) => (acc ?? 0) + value);

    const result = reduce(map, callback, null);

    expect(result).toBe(3);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback.mock.calls[0]).toEqual([null, 1, 'a', map]);
    expect(callback.mock.calls[1]).toEqual([1, 2, 'b', map]);
  });

  it('should use undefined as the initial value', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);
    const callback = vi.fn((acc: number | undefined, value: number) => (acc ?? 0) + value);

    const result = reduce(map, callback, undefined);

    expect(result).toBe(3);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback.mock.calls[0]).toEqual([undefined, 1, 'a', map]);
    expect(callback.mock.calls[1]).toEqual([1, 2, 'b', map]);
  });

  it('should return null initial value for an empty Map', () => {
    const map = new Map<string, number>();
    const callback = vi.fn((acc: number | null, value: number) => (acc ?? 0) + value);

    expect(reduce(map, callback, null)).toBeNull();
    expect(callback).not.toHaveBeenCalled();
  });

  it('should return undefined initial value for an empty Map', () => {
    const map = new Map<string, number>();
    const callback = vi.fn((acc: number | undefined, value: number) => (acc ?? 0) + value);

    expect(reduce(map, callback, undefined)).toBeUndefined();
    expect(callback).not.toHaveBeenCalled();
  });

  it('should pass a null value returned by the callback to the next call', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);
    const callback = vi.fn((acc: number | null, value: number) => (acc === null ? value : null));

    const result = reduce(map, callback, 0);

    expect(result).toBe(2);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback.mock.calls[1]).toEqual([null, 2, 'b', map]);
  });

  it('should use a null first value as the initial value', () => {
    const map = new Map<string, number | null>([
      ['a', null],
      ['b', 2],
    ]);
    const callback = vi.fn((acc: number | null, value: number | null) => acc ?? value);

    const result = reduce(map, callback);

    expect(result).toBe(2);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.calls[0]).toEqual([null, 2, 'b', map]);
  });

  it('should return the last value when no initial value provided', () => {
    const map = new Map([
      ['a', 5],
      ['b', 10],
      ['c', 15],
    ]);

    const result = reduce(map, (acc, value) => acc + value);

    expect(result).toBe(30);
  });
});
