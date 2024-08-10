import { describe, it, expect } from 'vitest';
import { getPath } from './getPath';

describe('getPath function', () => {
  it('should return a property name from a string', () => {
    expect(getPath('a', { a: 1 })).toBe('a');
  });

  it('should return an array of property names from a deep path string', () => {
    expect(getPath('a.b.c', { a: { b: { c: 1 } } })).toEqual(['a', 'b', 'c']);
  });

  it('should return an array of property names from a string array', () => {
    expect(getPath(['a', 'b', 'c'], { a: { b: { c: 1 } } })).toEqual(['a', 'b', 'c']);
  });

  it('should return an array of property names from a string array with a nested string', () => {
    expect(getPath(['a', 'b.c', 'd'], { a: { b: { c: { d: 1 } } } })).toEqual(['a', 'b', 'c', 'd']);
  });

  it('should return an array of property names from a deep path like string array', () => {
    expect(getPath(['a.b.c', 'd'], { 'a.b.c': { d: 1 } })).toEqual(['a.b.c', 'd']);
  });
});
