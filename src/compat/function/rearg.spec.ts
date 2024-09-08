import { describe, it, expect } from 'vitest';
import { rearg } from './rearg';

describe('rearg', () => {
  function fn() {
    // eslint-disable-next-line prefer-rest-params
    return Array.from(arguments);
  }

  it('should reorder arguments provided to `func`', () => {
    const rearged = rearg(fn, [2, 0, 1]);
    expect(rearged('b', 'c', 'a')).toEqual(['a', 'b', 'c']);
  });

  it('should work with repeated indexes', () => {
    const rearged = rearg(fn, [1, 1, 1]);
    expect(rearged('c', 'a', 'b')).toEqual(['a', 'a', 'a']);
  });

  it('should use `undefined` for nonexistent indexes', () => {
    const rearged = rearg(fn, [1, 4]);
    expect(rearged('b', 'a', 'c')).toEqual(['a', undefined, 'c']);
  });

  it('should use `undefined` for non-index values', () => {
    const values = [{}, null, undefined, false, NaN, '', -1, 1.1];
    for (const value of values) {
      // @ts-expect-error - invalid args
      const rearged = rearg(fn, value);
      expect(rearged('a', 'b', 'c')).toEqual([undefined, 'b', 'c']);
    }
  });

  it('should not rearrange arguments when no indexes are given', () => {
    let rearged = rearg(fn);
    expect(rearged('a', 'b', 'c')).toEqual(['a', 'b', 'c']);

    rearged = rearg(fn, [], []);
    expect(rearged('a', 'b', 'c')).toEqual(['a', 'b', 'c']);
  });

  it('should accept multiple index arguments', () => {
    const rearged = rearg(fn, 2, 0, 1);
    expect(rearged('b', 'c', 'a')).toEqual(['a', 'b', 'c']);
  });

  it('should accept multiple arrays of indexes', () => {
    const rearged = rearg(fn, [2], [0, 1]);
    expect(rearged('b', 'c', 'a')).toEqual(['a', 'b', 'c']);
  });

  it('should work with fewer indexes than arguments', () => {
    const rearged = rearg(fn, [1, 0]);
    expect(rearged('b', 'a', 'c')).toEqual(['a', 'b', 'c']);
  });

  it('should work on functions that have been rearged', () => {
    const rearged1 = rearg(fn, 2, 1, 0),
      rearged2 = rearg(rearged1, 1, 0, 2);
    expect(rearged2('b', 'c', 'a')).toEqual(['a', 'b', 'c']);
  });
});
