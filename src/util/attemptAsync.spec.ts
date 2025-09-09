import { describe, expect, it } from 'vitest';
import { attemptAsync } from './attemptAsync';
import { delay } from '../promise';

describe('attemptAsync', () => {
  it('should return the result of the async function', async () => {
    const [error, result] = await attemptAsync(async () => 1);
    expect(error).toBeNull();
    expect(result).toBe(1);
  });

  it('should return the error of the async function', async () => {
    const [error, result] = await attemptAsync(async () => {
      throw new Error('test');
    });
    expect(error).toBeInstanceOf(Error);
    expect(error instanceof Error && error.message).toBe('test');
    expect(result).toBeNull();
  });

  it('should return the error of the async function that rejects after a delay', async () => {
    const [error, result] = await attemptAsync(async () => {
      await delay(100);
      throw new Error('delayed error');
    });
    expect(error).toBeInstanceOf(Error);
    expect(error instanceof Error && error.message).toBe('delayed error');
    expect(result).toBeNull();
  });

  it('should return the result of a complex async operation', async () => {
    const [error, result] = await attemptAsync(async () => {
      const value1 = await Promise.resolve(10);
      const value2 = await Promise.resolve(20);
      return value1 + value2;
    });
    expect(error).toBeNull();
    expect(result).toBe(30);
  });

  it('should work with non-Error thrown objects', async () => {
    const [error, result] = await attemptAsync(async () => {
      throw 'string error'; // Not an Error instance
    });
    expect(error).toBe('string error');
    expect(result).toBeNull();
  });
});
