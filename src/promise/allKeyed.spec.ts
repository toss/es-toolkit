import { describe, expect, it } from 'vitest';
import { allKeyed } from './allKeyed';

describe('allKeyed', () => {
  it('should resolve an object of promises concurrently', async () => {
    const result = await allKeyed({
      a: Promise.resolve(1),
      b: Promise.resolve('hello'),
      c: Promise.resolve(true),
    });

    expect(result).toEqual({ a: 1, b: 'hello', c: true });
  });

  it('should handle plain (non-promise) values', async () => {
    const result = await allKeyed({
      a: 1,
      b: 'hello',
    });

    expect(result).toEqual({ a: 1, b: 'hello' });
  });

  it('should handle a mix of promises and plain values', async () => {
    const result = await allKeyed({
      a: Promise.resolve(1),
      b: 'plain',
    });

    expect(result).toEqual({ a: 1, b: 'plain' });
  });

  it('should return an empty object for empty input', async () => {
    const result = await allKeyed({});

    expect(result).toEqual({});
  });

  it('should reject if any promise rejects', async () => {
    await expect(
      allKeyed({
        a: Promise.resolve(1),
        b: Promise.reject(new Error('fail')),
      })
    ).rejects.toThrow('fail');
  });

  it('should resolve promises concurrently, not sequentially', async () => {
    const start = Date.now();

    await allKeyed({
      a: new Promise(resolve => setTimeout(() => resolve('a'), 50)),
      b: new Promise(resolve => setTimeout(() => resolve('b'), 50)),
    });

    const elapsed = Date.now() - start;

    // If run sequentially, would take ~100ms. Concurrently should be ~50ms.
    expect(elapsed).toBeLessThan(90);
  });

  it('should preserve key-value associations', async () => {
    const result = await allKeyed({
      first: Promise.resolve(1),
      second: Promise.resolve(2),
      third: Promise.resolve(3),
    });

    expect(result.first).toBe(1);
    expect(result.second).toBe(2);
    expect(result.third).toBe(3);
  });
});
