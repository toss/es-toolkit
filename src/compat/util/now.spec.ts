import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { now } from './now';

describe('now', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return the number of milliseconds that have elapsed since the Unix epoch', async () => {
    const stamp = +new Date();
    const actual = now();

    expect(actual).toBeGreaterThanOrEqual(stamp);

    await vi.advanceTimersByTimeAsync(32);

    expect(now() > actual);
  });
});
