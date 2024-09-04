import { describe, expect, it } from 'vitest';
import { flatMapDeep } from './flatMapDeep';

describe('flatMapDeep', () => {
  it('should map and deeply flatten an array', () => {
    const result1 = flatMapDeep([1, 2, 3], n => [[n, n]]);
    expect(result1).toEqual([1, 1, 2, 2, 3, 3]);

    const result2 = flatMapDeep([1, 2, 3], n => [[[n]], [[n]]]);
    expect(result2).toEqual([1, 1, 2, 2, 3, 3]);

    const result3 = flatMapDeep([1, 2, 3], n => [n, [n, [n, [n]]]]);
    expect(result3).toEqual([1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3]);
  });

  it('should return an empty array when provided with an empty array', () => {
    const result = flatMapDeep([], n => [[n]]);
    expect(result).toEqual([]);
  });
});
