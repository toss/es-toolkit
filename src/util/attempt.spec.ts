import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { attempt } from './attempt';
import { delay } from '../promise';

describe('attempt', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return the result of the function', () => {
    expect(attempt(() => 1)).toEqual([null, 1]);
  });

  it('should return the error of the function', () => {
    expect(
      attempt(() => {
        throw new Error('test');
      })
    ).toEqual([new Error('test'), null]);
  });

  it('should return the result of the promise', async () => {
    const [error, result] = attempt(async () => 1);
    expect(error).toBeNull();
    expect(await result).toBe(1);
  });

  it('should return the result of the promise that throws an error', async () => {
    const [error, result] = attempt(async () => {
      await delay(100);
      throw new Error('test');
    });

    expect(error).toBeNull();

    vi.advanceTimersByTime(100);

    try {
      await result;
    } catch (tryError) {
      expect(tryError).toBeInstanceOf(Error);
      expect(error).toBeNull();
    }
  });
});
