import { describe, expect, it, vi } from 'vitest';
import { performance } from 'node:perf_hooks';
import { retry } from './retry';

describe('retry', () => {
  it('should resolve successfully on the first attempt', async () => {
    const func = vi.fn().mockResolvedValue('success');
    const result = await retry(func);
    expect(result).toBe('success');
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should retry the specified number of times and eventually resolve', async () => {
    const func = vi
      .fn()
      .mockRejectedValueOnce(new Error('failure'))
      .mockRejectedValueOnce(new Error('failure'))
      .mockResolvedValue('success');
    const result = await retry(func, 3);
    expect(result).toBe('success');
    expect(func).toHaveBeenCalledTimes(3);
  });

  it('should retry with the specified delay between attempts', async () => {
    const func = vi.fn().mockRejectedValueOnce(new Error('failure')).mockResolvedValue('success');
    const delay = 100;
    const start = performance.now();
    const result = await retry(func, { delay, retries: 2 });
    const end = performance.now();
    expect(result).toBe('success');
    expect(func).toHaveBeenCalledTimes(2);
    // Date.now() has millisecond precision but not microsecond precision, so the result might be 99ms due to rounding.
    // Date.now() is also *not* guaranteed to increment every millisecond - on some systems, it may tick every ~4ms.
    expect(end - start).toBeGreaterThanOrEqual(delay - 1);
  });

  it('should retry with a dynamic delay function based on attempt count', async () => {
    const func = vi
      .fn()
      .mockRejectedValueOnce(new Error('failure'))
      .mockRejectedValueOnce(new Error('failure'))
      .mockResolvedValue('success');

    const delays: number[] = [];
    const delayFn = vi.fn(attempt => {
      const d = attempt * 50;
      delays.push(d);
      return d;
    });

    const start = performance.now();
    const result = await retry(func, { delay: delayFn, retries: 3 });
    const end = performance.now();

    const totalDelay = delays.reduce((sum, d) => sum + d, 0);

    expect(result).toBe('success');
    expect(func).toHaveBeenCalledTimes(3);
    expect(end - start).toBeGreaterThanOrEqual(totalDelay);
  });

  it('should throw an error after the specified number of retries', async () => {
    const func = vi.fn().mockRejectedValue(new Error('failure'));
    await expect(retry(func, 3)).rejects.toThrow('failure');
    expect(func).toHaveBeenCalledTimes(4);
  });

  it('should abort the retry operation if the signal is already aborted', async () => {
    const func = vi.fn().mockRejectedValue(new Error('failure'));
    const controller = new AbortController();
    const signal = controller.signal;
    controller.abort();
    await expect(retry(func, { retries: 5, signal })).rejects.toThrow(
      'The retry operation was aborted due to an abort signal.'
    );
    expect(func).toHaveBeenCalledTimes(0);
  });

  it('should retry when shouldRetry returns true', async () => {
    const error = { status: 500, message: 'Server Error' };
    const func = vi.fn().mockRejectedValueOnce(error).mockResolvedValue('success');
    const shouldRetry = vi.fn((err: unknown) => (err as { status: number }).status >= 500);

    const result = await retry(func, { retries: 3, shouldRetry });

    expect(result).toBe('success');
    expect(func).toHaveBeenCalledTimes(2);
    expect(shouldRetry).toHaveBeenCalledWith(error, 0);
  });

  it('should not retry when shouldRetry returns false', async () => {
    const error = { status: 400, message: 'Bad Request' };
    const func = vi.fn().mockRejectedValue(error);
    const shouldRetry = vi.fn((err: unknown) => (err as { status: number }).status >= 500);

    await expect(retry(func, { retries: 3, shouldRetry })).rejects.toEqual(error);
    expect(func).toHaveBeenCalledTimes(1);
    expect(shouldRetry).toHaveBeenCalledWith(error, 0);
  });

  it('should pass attempt number to shouldRetry', async () => {
    const error = new Error('failure');
    const func = vi.fn().mockRejectedValue(error);
    const shouldRetry = vi.fn((_err: unknown, attempt: number) => attempt < 2);

    await expect(retry(func, { retries: 5, shouldRetry })).rejects.toThrow('failure');
    expect(func).toHaveBeenCalledTimes(3);
    expect(shouldRetry).toHaveBeenCalledWith(error, 0);
    expect(shouldRetry).toHaveBeenCalledWith(error, 1);
    expect(shouldRetry).toHaveBeenCalledWith(error, 2);
  });
});
