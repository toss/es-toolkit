import { describe, expect, it, vi } from 'vitest';
import { after } from './after';

describe('after', () => {
  it('should throw error if n is less than zero.', () => {
    const mockFn = vi.fn();
    const n = -1;
    expect(() => after(n, mockFn)).toThrowErrorMatchingInlineSnapshot('[Error: n must be a non-negative integer.]');
    expect(() => after(NaN, mockFn)).toThrowErrorMatchingInlineSnapshot('[Error: n must be a non-negative integer.]');
  });

  it('should create a function that invokes `func` only after being called `n` calls.`', () => {
    const mockFn = vi.fn();
    const n = 3;

    const afterFn = after(n, mockFn);
    for (let i = 0; i < n - 1; i++) {
      expect(afterFn()).toBeUndefined();
    }
    expect(mockFn).toHaveBeenCalledTimes(0);

    afterFn();
    expect(mockFn).toHaveBeenCalledTimes(1);

    afterFn();
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('should not invoke func immediately when n is zero.', () => {
    const mockFn = vi.fn();
    const afterFn = after(0, mockFn);
    expect(mockFn).toHaveBeenCalledTimes(0);

    afterFn();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should handle arguments correctly.', () => {
    const mockFn = vi.fn();
    mockFn.mockReturnValue(3);

    const afterFn = after(0, mockFn);
    expect(afterFn(1, 2)).toBe(3);
    expect(mockFn).toHaveBeenCalledWith(1, 2);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
