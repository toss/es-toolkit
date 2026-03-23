import { describe, it, expect, vi } from 'vitest';
import { asCallback, nodeify } from './asCallback';

describe('asCallback', () => {
  it('invokes callback with result on success', async () => {
    const cb = vi.fn();
    await asCallback(Promise.resolve(42), cb);
    await Promise.resolve();
    expect(cb).toHaveBeenCalledWith(null, 42);
  });

  it('invokes callback with error on rejection', async () => {
    const cb = vi.fn();
    const error = new Error('test error');
    const promise = Promise.reject(error);

    asCallback(promise, cb).catch(() => {
      // Suppress unhandled rejection
    });
    await Promise.resolve();

    expect(cb).toHaveBeenCalledWith(error, undefined);
  });

  it('converts non-Error rejections to Error instances', async () => {
    const cb = vi.fn();
    const promise = Promise.reject('string error');

    asCallback(promise, cb).catch(() => {
      // Suppress unhandled rejection
    });
    await Promise.resolve();

    expect(cb).toHaveBeenCalled();
    const [err] = cb.mock.calls[0];
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toBe('string error');
  });

  it('returns the original promise for chaining', async () => {
    const cb = vi.fn();
    const promise = Promise.resolve('value');
    const result = asCallback(promise, cb);
    expect(result).toBe(promise);
  });

  it('nodeify is an alias for asCallback', () => {
    expect(nodeify).toBe(asCallback);
  });
});
