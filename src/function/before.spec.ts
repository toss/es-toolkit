import { describe, expect, it, vi } from 'vitest';
import { before } from './before';

describe('before', () => {
  it('should throw error if n is less than zero.', () => {
    const mockFn = vi.fn();
    expect(() => before(-1, mockFn)).toThrowErrorMatchingInlineSnapshot('[Error: n must be a non-negative integer.]');
  });

  it('should create a function that invokes `func` only until the `n-1`-th calls.', () => {
    const mockFn = vi.fn();
    mockFn.mockReturnValue(1);
    const n = 3;
    const beforeFn = before(n, mockFn);
    expect(beforeFn()).toBe(1);
    expect(mockFn).toHaveBeenCalledTimes(1);

    expect(beforeFn()).toBe(1);
    expect(mockFn).toHaveBeenCalledTimes(2);

    expect(beforeFn()).toBeUndefined();
  });

  it('should not invoke func immediately when n is a positive integer', () => {
    const mockFn = vi.fn();
    mockFn.mockReturnValue(1);
    const n = 3;
    const beforeFn = before(n, mockFn);
    expect(mockFn).toHaveBeenCalledTimes(0);

    expect(beforeFn()).toBe(1);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should handle arguments correctly', () => {
    const mockFn = vi.fn();
    mockFn.mockReturnValue(3);
    const n = 3;
    const beforeFn = before(n, mockFn);
    expect(beforeFn(1, 2)).toBe(3);
    expect(mockFn).toHaveBeenCalledWith(1, 2);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
