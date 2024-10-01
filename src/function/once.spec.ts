import { describe, expect, it, vi } from 'vitest';
import { once } from './once';

// adjust the import path as necessary

describe('once', () => {
  it('should call the function only once', () => {
    const func = vi.fn(() => 42);
    const onceFunc = once(func);

    expect(onceFunc()).toBe(42);
    expect(onceFunc()).toBe(42);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should work with functions returning undefined', () => {
    const func = vi.fn(() => undefined);
    const onceFunc = once(func);

    expect(onceFunc()).toBeUndefined();
    expect(onceFunc()).toBeUndefined();
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('should handle functions with no return value', () => {
    const func = vi.fn(() => {
      console.log('Side effect');
    });
    const onceFunc = once(func);

    expect(onceFunc()).toBeUndefined();
    expect(onceFunc()).toBeUndefined();
    expect(func).toHaveBeenCalledTimes(1);
  });
});
