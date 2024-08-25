import { describe, expect, it } from 'vitest';
import { isRegExp } from './isRegExp';

describe('isRegExp', () => {
  it('returns `true` for RegExp', () => {
    expect(isRegExp(new RegExp(''))).toBe(true);
    expect(isRegExp(/abc/)).toBe(true);
    expect(isRegExp(/abc/g)).toBe(true);
    expect(isRegExp(/abc/i)).toBe(true);
    expect(isRegExp(/abc/m)).toBe(true);
    expect(isRegExp(/abc/s)).toBe(true);
    expect(isRegExp(/abc/u)).toBe(true);
    expect(isRegExp(/abc/y)).toBe(true);
  });

  it('returns `false` for non-RegExp values', () => {
    expect(isRegExp({})).toBe(false);
    expect(isRegExp('/abc/')).toBe(false);
    expect(isRegExp(new Date())).toBe(false);
    expect(isRegExp(new Map())).toBe(false);
    expect(isRegExp(new Set())).toBe(false);
    expect(isRegExp([1, 2, 3])).toBe(false);
  });
});
