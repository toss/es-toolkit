import { describe, expect, it } from 'vitest';
import { isPromise } from './isPromise';

describe('isPromise', () => {
  it('returns true if the value is a Promise', () => {
    expect(isPromise(new Promise<void>(resolve => resolve()))).toBe(true);
  });

  it('returns false if the value is not a Promise', () => {
    expect(isPromise(null)).toBe(false);
    expect(isPromise('')).toBe(false);
    expect(isPromise(123)).toBe(false);
    expect(isPromise({})).toBe(false);
    expect(isPromise([])).toBe(false);
    expect(isPromise(new Map())).toBe(false);
    expect(isPromise(new Set())).toBe(false);
    expect(isPromise(new WeakSet())).toBe(false);
  });
});
