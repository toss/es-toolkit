import { describe, expect, it } from 'vitest';
import { isBlob } from './isBlob';

describe('isBlob', () => {
  it('returns true if the value is a Blob', () => {
    expect(isBlob(new Blob())).toBe(true);
    const blobWithOptions = new Blob(['content'], { type: 'text/plain' });
    expect(isBlob(blobWithOptions)).toBe(true);
    const file = new File(['content'], 'example.txt', { type: 'text/plain' });
    expect(isBlob(file)).toBe(true);
  });

  it('returns false if the value is not a Blob', () => {
    expect(isBlob(0)).toBe(false);
    expect(isBlob('abc')).toBe(false);
    expect(isBlob(123)).toBe(false);
    expect(isBlob({ a: 1 })).toBe(false);
    expect(isBlob([1, 2, 3])).toBe(false);
    expect(isBlob(null)).toBe(false);
    expect(isBlob(undefined)).toBe(false);
  });

  it('can be used with TypeScript as a type predicate', () => {
    const items: Array<Blob | number> = [new Blob(), 1, new Blob(), 2];
    const result = items.filter(isBlob);
    expect(result).toHaveLength(2);
    expect(result[0]).toBeInstanceOf(Blob);
    expect(result[1]).toBeInstanceOf(Blob);
  });

  it('returns false if Blob is not supported in the environment', () => {
    const blob = new Blob();
    const originalBlob = globalThis.Blob;
    // @ts-expect-error - we need to simulate the absence of Blob
    globalThis.Blob = undefined;
    expect(isBlob(blob)).toBe(false);
    globalThis.Blob = originalBlob;
  });
});
