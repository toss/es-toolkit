
import { describe, expect, it } from 'vitest';
import { isIndex } from './isIndex';


describe('isIndex', () => {
  it('should return `true` for indices', () => {
    expect(isIndex(0)).toBe(true);
    expect(isIndex('0')).toBe(true);
    expect(isIndex('1')).toBe(true);
    expect(isIndex(3)).toBe(true);
  });

  it('should return `false` for non-indexes', () => {
    expect(isIndex('1abc')).toBe(false);
    expect(isIndex('07')).toBe(false);
    expect(isIndex('0001')).toBe(false);
    expect(isIndex(-1)).toBe(false);
    expect(isIndex(1.1)).toBe(false);
    expect(isIndex(Number.MAX_SAFE_INTEGER)).toBe(false);
  });
});
