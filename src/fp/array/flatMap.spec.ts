import { describe, expect, it } from 'vitest';
import { flatMap } from './flatMap';

describe('flatMap', () => {
  it('(non-curried) should map and flatten array values', () => {
    expect(flatMap([1, 2, 3], x => [x, x * 2])).toEqual([1, 2, 2, 4, 3, 6]);
    expect(flatMap(['a', 'b'], x => [x, x])).toEqual(['a', 'a', 'b', 'b']);
  });

  it('(curried) should map and flatten array values', () => {
    expect(flatMap<number[], number>(x => [x, x * 2])([1, 2, 3])).toEqual([1, 2, 2, 4, 3, 6]);
    expect(flatMap<string[], string>(x => [x, x])(['a', 'b'])).toEqual(['a', 'a', 'b', 'b']);
  });

  it('(non-curried) should handle empty arrays', () => {
    expect(flatMap([], x => [x, x])).toEqual([]);
  });

  it('(curried) should handle empty arrays', () => {
    expect(flatMap<number[], number>(x => [x, x])([])).toEqual([]);
  });

  it('(non-curried) should handle empty result arrays', () => {
    expect(flatMap([1, 2, 3], () => [])).toEqual([]);
  });

  it('(curried) should handle empty result arrays', () => {
    expect(flatMap<number[], number>(() => [])([1, 2, 3])).toEqual([]);
  });

  it('(non-curried) should handle nested arrays', () => {
    expect(flatMap([1, 2], x => [[x, x]])).toEqual([[1, 1], [2, 2]]);
  });

  it('(curried) should handle nested arrays', () => {
    expect(flatMap<number[], number[]>(x => [[x, x]])([1, 2])).toEqual([[1, 1], [2, 2]]);
  });
}); 