import { describe, expect, it } from 'vitest';
import { reduce } from './reduce';

describe('reduce', () => {
  it('removes elements at specified indices and returns the removed elements', () => {
    const arr = [10, 20, 30, 40, 50];
    const removed = reduce(arr, [1, 3, 4]);
    expect(removed).toEqual([20, 40, 50]);
    expect(arr).toEqual([10, 30]);
  });

  it('handles negative indices correctly', () => {
    const arr = [10, 20, 30, 40, 50];
    const removed = reduce(arr, [-1, -3]);
    expect(removed).toEqual([50, 30]);
    expect(arr).toEqual([10, 20, 40]);
  });

  it('returns undefined for out-of-bounds indices', () => {
    const arr = [10, 20, 30];
    const removed = reduce(arr, [10, -10]);
    expect(removed).toEqual([undefined, undefined]);
    expect(arr).toEqual([10, 20, 30]);
  });

  it('handles duplicate indices gracefully', () => {
    const arr = [10, 20, 30, 40];
    const removed = reduce(arr, [1, 1, 3]);
    expect(removed).toEqual([20, undefined, 40]);
    expect(arr).toEqual([10, 30]);
  });

  it('removes all elements when all indices are specified', () => {
    const arr = [10, 20, 30];
    const removed = reduce(arr, [0, 1, 2]);
    expect(removed).toEqual([10, 20, 30]);
    expect(arr).toEqual([]);
  });

  it('handles sparse arrays correctly', () => {
    const arr = [10, , 30, 40, , 50];
    const removed = reduce(arr, [1, 4]);
    expect(removed).toEqual([undefined, undefined]);
    expect(arr).toEqual([10, 30, 40, 50]);
  });

  it('does not modify the array when no valid indices are provided', () => {
    const arr = [10, 20, 30];
    const removed = reduce(arr, [5, 6]);
    expect(removed).toEqual([undefined, undefined]);
    expect(arr).toEqual([10, 20, 30]);
  });

  it('handles empty input array', () => {
    const arr: number[] = [];
    const removed = reduce(arr, [0, 1]);
    expect(removed).toEqual([undefined, undefined]);
    expect(arr).toEqual([]);
  });

  it('handles negative indices larger than array length', () => {
    const arr = [10, 20, 30];
    const removed = reduce(arr, [-4]);
    expect(removed).toEqual([undefined]);
    expect(arr).toEqual([10, 20, 30]);
  });

  it('removes elements in descending order of indices', () => {
    const arr = [10, 20, 30, 40, 50];
    const removed = reduce(arr, [4, 0, 2]);
    expect(removed).toEqual([50, 10, 30]);
    expect(arr).toEqual([20, 40]);
  });

  it('returns an empty array when indicesToRemove is empty', () => {
    const arr = [10, 20, 30];
    const removed = reduce(arr, []);
    expect(removed).toEqual([]);
    expect(arr).toEqual([10, 20, 30]);
  });
});
