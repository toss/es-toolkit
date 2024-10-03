import { describe, expect, it } from 'vitest';
import { isArrayBuffer } from './isArrayBuffer';

describe('isArrayBuffer', () => {
  it('returns true if the value is a ArrayBuffer', () => {
    expect(isArrayBuffer(new ArrayBuffer(8))).toBe(true);
  });

  it('returns false if the value is not a ArrayBuffer', () => {
    expect(isArrayBuffer(null)).toBe(false);
    expect(isArrayBuffer('')).toBe(false);
    expect(isArrayBuffer(123)).toBe(false);
    expect(isArrayBuffer({})).toBe(false);
    expect(isArrayBuffer([])).toBe(false);
    expect(isArrayBuffer(new Map())).toBe(false);
  });
});
