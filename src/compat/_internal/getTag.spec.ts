import { describe, expect, it } from 'vitest';
import { getTag } from './getTag';

describe('getTag function', () => {
  it('should return the tag of the value', () => {
    expect(getTag(null)).toBe('[object Null]');
    expect(getTag(undefined)).toBe('[object Undefined]');
    expect(getTag(1)).toBe('[object Number]');
    expect(getTag('')).toBe('[object String]');
    expect(getTag(true)).toBe('[object Boolean]');
    expect(getTag(Symbol())).toBe('[object Symbol]');
    expect(getTag([])).toBe('[object Array]');
    expect(getTag({})).toBe('[object Object]');
    expect(getTag(() => {})).toBe('[object Function]');
    expect(getTag(new Date())).toBe('[object Date]');
    expect(getTag(/./)).toBe('[object RegExp]');
  });

  it('should return the tag of the custom object', () => {
    class Custom {}
    expect(getTag(new Custom())).toBe('[object Object]');
  });
});
