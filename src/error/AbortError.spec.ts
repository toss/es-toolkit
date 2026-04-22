import { afterEach, describe, expect, it, vi } from 'vitest';
import { AbortError } from './AbortError';

describe('AbortError', () => {
  it('is an instance of Error', () => {
    expect(new AbortError()).toBeInstanceOf(Error);
  });

  it('uses the default message when none is provided', () => {
    expect(new AbortError().message).toBe('The operation was aborted');
  });

  it('uses the provided message', () => {
    expect(new AbortError('custom').message).toBe('custom');
  });

  it.skipIf(typeof DOMException === 'undefined')('extends DOMException when available', () => {
    expect(new AbortError()).toBeInstanceOf(DOMException);
  });

  describe('when DOMException is unavailable (e.g. Hermes)', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
      vi.resetModules();
    });

    it('loads without throwing and falls back to Error', async () => {
      vi.stubGlobal('DOMException', undefined);
      vi.resetModules();
      const { AbortError: FallbackAbortError } = await import('./AbortError');
      const err = new FallbackAbortError();
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('The operation was aborted');
    });
  });
});
