import { describe, expect, it, vi } from 'vitest';
import { defer } from './defer';

// Prettier (3.2.5) cannot parse `using` declarations yet, so these tests
// invoke `[Symbol.dispose]()` directly, exactly as the `using` machinery does.
describe('defer', () => {
  it('should not run the callback until disposed', () => {
    const callback = vi.fn();

    defer(callback);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should run the callback when disposed', () => {
    const callback = vi.fn();

    const disposable = defer(callback);
    disposable[Symbol.dispose]();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should run the callback without arguments', () => {
    const callback = vi.fn();

    defer(callback)[Symbol.dispose]();

    expect(callback).toHaveBeenCalledWith();
  });

  it('should propagate errors thrown by the callback', () => {
    const disposable = defer(() => {
      throw new Error('boom');
    });

    expect(() => disposable[Symbol.dispose]()).toThrowError('boom');
  });
});
