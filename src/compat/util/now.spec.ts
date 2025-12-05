import { afterEach, beforeEach, describe, expect, expectTypeOf, it, vi } from 'vitest';
import type { now as nowLodash } from 'lodash';
import { now } from './now';

describe('now', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return the number of milliseconds that have elapsed since the Unix epoch', () => {
    const stamp = Number(new Date());
    const actual = now();

    expect(actual).toBeGreaterThanOrEqual(stamp);

    vi.advanceTimersByTime(32);

    expect(now()).toBeGreaterThan(actual);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(now).toEqualTypeOf<typeof nowLodash>();
  });
});
