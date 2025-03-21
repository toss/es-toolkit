import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { withTimeout } from './withTimeout.ts';

describe('withTimeout', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns the result value if a response is received before the specified wait time', async () => {
    const result = await withTimeout(async () => {
      await vi.advanceTimersByTimeAsync(50);
      return 'foo';
    }, 100);

    expect(result).toEqual('foo');
  });

  it('returns a reason if a response is received after the specified wait time', () => {
    expect(withTimeout(() => vi.advanceTimersByTimeAsync(1000), 50)).rejects.toThrow('The operation was timed out');
  });
});
