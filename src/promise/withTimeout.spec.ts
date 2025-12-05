import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { delay } from './delay.ts';
import { withTimeout } from './withTimeout.ts';

describe('withTimeout', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns the result value if a response is received before the specified wait time', async () => {
    const promise = withTimeout(async () => {
      await delay(50);
      return 'foo';
    }, 100);
    vi.advanceTimersByTime(50);
    const result = await promise;

    expect(result).toEqual('foo');
  });

  it('returns a reason if a response is received after the specified wait time', async () => {
    const promise = withTimeout(() => delay(1000), 50);
    vi.advanceTimersByTime(50);

    await expect(promise).rejects.toThrow('The operation was timed out');
  });
});
