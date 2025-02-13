import { describe, expect, it, vi } from 'vitest';
import { forEach } from './forEach';

describe('forEach', () => {
  it('(non-curried) should iterate over array elements', () => {
    const arr = [1, 2, 3];
    const spy = vi.fn();
    forEach(arr, spy);
    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenNthCalledWith(1, 1, 0, arr);
    expect(spy).toHaveBeenNthCalledWith(2, 2, 1, arr);
    expect(spy).toHaveBeenNthCalledWith(3, 3, 2, arr);
  });

  it('(curried) should iterate over array elements', () => {
    const arr = [1, 2, 3];
    const spy = vi.fn();
    forEach<number[]>(spy)(arr);
    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenNthCalledWith(1, 1, 0, arr);
    expect(spy).toHaveBeenNthCalledWith(2, 2, 1, arr);
    expect(spy).toHaveBeenNthCalledWith(3, 3, 2, arr);
  });

  it('(non-curried) should work with different types', () => {
    const arr = ['a', 'b', 'c'];
    const spy = vi.fn();
    forEach(arr, spy);
    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenNthCalledWith(1, 'a', 0, arr);
    expect(spy).toHaveBeenNthCalledWith(2, 'b', 1, arr);
    expect(spy).toHaveBeenNthCalledWith(3, 'c', 2, arr);
  });

  it('(curried) should work with different types', () => {
    const arr = ['a', 'b', 'c'];
    const spy = vi.fn();
    forEach<string[]>(spy)(arr);
    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenNthCalledWith(1, 'a', 0, arr);
    expect(spy).toHaveBeenNthCalledWith(2, 'b', 1, arr);
    expect(spy).toHaveBeenNthCalledWith(3, 'c', 2, arr);
  });

  it('(non-curried) should handle empty arrays', () => {
    const spy = vi.fn();
    forEach([], spy);
    expect(spy).not.toHaveBeenCalled();
  });

  it('(curried) should handle empty arrays', () => {
    const spy = vi.fn();
    forEach<never[]>(spy)([]);
    expect(spy).not.toHaveBeenCalled();
  });

  it('(non-curried) should not modify the original array', () => {
    const arr = [1, 2, 3];
    const original = [...arr];
    forEach(arr, value => value + 1);
    expect(arr).toEqual(original);
  });

  it('(curried) should not modify the original array', () => {
    const arr = [1, 2, 3];
    const original = [...arr];
    forEach<number[]>(value => value + 1)(arr);
    expect(arr).toEqual(original);
  });

  it('(non-curried) should allow mutation within the callback', () => {
    const arr = [{ value: 1 }, { value: 2 }, { value: 3 }];
    forEach(arr, item => item.value++);
    expect(arr).toEqual([{ value: 2 }, { value: 3 }, { value: 4 }]);
  });

  it('(curried) should allow mutation within the callback', () => {
    const arr = [{ value: 1 }, { value: 2 }, { value: 3 }];
    forEach<Array<{ value: number }>>(item => item.value++)(arr);
    expect(arr).toEqual([{ value: 2 }, { value: 3 }, { value: 4 }]);
  });
});
