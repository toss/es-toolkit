import { describe, expect, it } from 'vitest';
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
});
