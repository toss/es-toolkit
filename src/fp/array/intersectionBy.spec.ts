import { describe, expect, it } from 'vitest';
import { intersectionBy } from './intersectionBy';

describe('intersectionBy', () => {
  it('(non-curried) should return intersection of two arrays using mapper', () => {
    const arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const arr2 = [{ id: 2 }, { id: 4 }];
    expect(intersectionBy(arr1, arr2, item => item.id)).toEqual([{ id: 2 }]);
  });

  it('(curried) should return intersection of two arrays using mapper', () => {
    const arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const arr2 = [{ id: 2 }, { id: 4 }];
    expect(intersectionBy(arr2, item => item.id)(arr1)).toEqual([{ id: 2 }]);
  });

  it('(non-curried) should work with different types of values', () => {
    const arr1 = [2.1, 1.2, 3.3];
    const arr2 = [2.3, 3.4];
    expect(intersectionBy(arr1, arr2, Math.floor)).toEqual([2.1, 3.3]);
  });

  it('(curried) should work with different types of values', () => {
    const arr1 = [2.1, 1.2, 3.3];
    const arr2 = [2.3, 3.4];
    expect(intersectionBy(arr2, Math.floor)(arr1)).toEqual([2.1, 3.3]);
  });

  it('(non-curried) should return empty array when no intersection', () => {
    const arr1 = [{ id: 1 }, { id: 2 }];
    const arr2 = [{ id: 3 }, { id: 4 }];
    expect(intersectionBy(arr1, arr2, item => item.id)).toEqual([]);
  });

  it('(curried) should return empty array when no intersection', () => {
    const arr1 = [{ id: 1 }, { id: 2 }];
    const arr2 = [{ id: 3 }, { id: 4 }];
    expect(intersectionBy(arr2, item => item.id)(arr1)).toEqual([]);
  });

  it('(non-curried) should handle empty arrays', () => {
    const arr1: Array<{ id: number }> = [];
    const arr2 = [{ id: 1 }, { id: 2 }];
    expect(intersectionBy(arr1, arr2, item => item.id)).toEqual([]);
    expect(intersectionBy(arr2, arr1, item => item.id)).toEqual([]);
  });

  it('(curried) should handle empty arrays', () => {
    const arr1: Array<{ id: number }> = [];
    const arr2 = [{ id: 1 }, { id: 2 }];
    expect(intersectionBy(arr2, item => item.id)(arr1)).toEqual([]);
    expect(intersectionBy(arr1, item => item.id)(arr2)).toEqual([]);
  });

  it('(non-curried) should not modify original arrays', () => {
    const arr1 = [{ id: 1 }, { id: 2 }];
    const arr2 = [{ id: 2 }, { id: 3 }];
    const original1 = [...arr1];
    const original2 = [...arr2];
    
    intersectionBy(arr1, arr2, item => item.id);
    
    expect(arr1).toEqual(original1);
    expect(arr2).toEqual(original2);
  });

  it('(curried) should not modify original arrays', () => {
    const arr1 = [{ id: 1 }, { id: 2 }];
    const arr2 = [{ id: 2 }, { id: 3 }];
    const original1 = [...arr1];
    const original2 = [...arr2];
    
    intersectionBy(arr2, item => item.id)(arr1);
    
    expect(arr1).toEqual(original1);
    expect(arr2).toEqual(original2);
  });
});
