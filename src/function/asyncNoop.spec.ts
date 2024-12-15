import { describe, expect, it } from 'vitest';
import { asyncNoop } from './asyncNoop';

describe('asyncNoop', () => {
  it('should be a function', () => {
    expect(typeof asyncNoop).toBe('function');
  });

  it('should return a Promise', () => {
    expect(asyncNoop()).toBeInstanceOf(Promise);
  });

  it('should resolve to undefined', async () => {
    await expect(asyncNoop()).resolves.toBeUndefined();
  });
});
