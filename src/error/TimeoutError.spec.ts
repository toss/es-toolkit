import { describe, expect, it } from 'vitest';
import { TimeoutError } from './TimeoutError';

describe('TimeoutError', () => {
  it('is an instance of Error', () => {
    expect(new TimeoutError()).toBeInstanceOf(Error);
  });

  it('uses the default message when none is provided', () => {
    expect(new TimeoutError().message).toBe('The operation was timed out');
  });

  it('uses the provided message', () => {
    expect(new TimeoutError('custom').message).toBe('custom');
  });

  it.skipIf(typeof DOMException === 'undefined')('extends DOMException when available', () => {
    expect(new TimeoutError()).toBeInstanceOf(DOMException);
  });
});
