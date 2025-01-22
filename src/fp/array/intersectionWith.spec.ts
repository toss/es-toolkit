import { describe, expect, it } from 'vitest';
import { intersectionWith } from './intersectionWith';

describe('intersectionWith', () => {
  it('(non-curried) should return intersection of two arrays using comparator', () => {
    const arr1 = [{ x: 1, y: 1 }, { x: 2, y: 1 }];
    const arr2 = [{ x: 1, y: 2 }];
    expect(
      intersectionWith(arr1, arr2, (a, b) => a.x + a.y === b.x + b.y)
    ).toEqual([{ x: 2, y: 1 }]);
  });

  it('(curried) should return intersection of two arrays using comparator', () => {
    const arr1 = [{ x: 1, y: 1 }, { x: 2, y: 1 }];
    const arr2 = [{ x: 1, y: 2 }];
    expect(
      intersectionWith(arr2, (a, b) => a.x + a.y === b.x + b.y)(arr1)
    ).toEqual([{ x: 2, y: 1 }]);
  });

  it('(non-curried) should work with different types of values', () => {
    const arr1 = [1.2, 2.4, 3.6];
    const arr2 = [2.0, 3.0];
    expect(
      intersectionWith(arr1, arr2, (a, b) => Math.floor(a) === Math.floor(b))
    ).toEqual([2.4, 3.6]);
  });

  it('(curried) should work with different types of values', () => {
    const arr1 = [1.2, 2.4, 3.6];
    const arr2 = [2.0, 3.0];
    expect(
      intersectionWith(arr2, (a, b) => Math.floor(a) === Math.floor(b))(arr1)
    ).toEqual([2.4, 3.6]);
  });

  it('(non-curried) should return empty array when no intersection', () => {
    const arr1 = [{ x: 1 }, { x: 2 }];
    const arr2 = [{ x: 3 }, { x: 4 }];
    expect(
      intersectionWith(arr1, arr2, (a, b) => a.x === b.x)
    ).toEqual([]);
  });

  it('(curried) should return empty array when no intersection', () => {
    const arr1 = [{ x: 1 }, { x: 2 }];
    const arr2 = [{ x: 3 }, { x: 4 }];
    expect(
      intersectionWith(arr2, (a, b) => a.x === b.x)(arr1)
    ).toEqual([]);
  });

  it('(non-curried) should handle empty arrays', () => {
    const arr1: Array<{ x: number }> = [];
    const arr2 = [{ x: 1 }, { x: 2 }];
    expect(
      intersectionWith(arr1, arr2, (a, b) => a.x === b.x)
    ).toEqual([]);
    expect(
      intersectionWith(arr2, arr1, (a, b) => a.x === b.x)
    ).toEqual([]);
  });

  it('(curried) should handle empty arrays', () => {
    const arr1: Array<{ x: number }> = [];
    const arr2 = [{ x: 1 }, { x: 2 }];
    expect(
      intersectionWith(arr2, (a, b) => a.x === b.x)(arr1)
    ).toEqual([]);
    expect(
      intersectionWith(arr1, (a, b) => a.x === b.x)(arr2)
    ).toEqual([]);
  });

  it('(non-curried) should not modify original arrays', () => {
    const arr1 = [{ x: 1 }, { x: 2 }];
    const arr2 = [{ x: 2 }, { x: 3 }];
    const original1 = [...arr1];
    const original2 = [...arr2];
    
    intersectionWith(arr1, arr2, (a, b) => a.x === b.x);
    
    expect(arr1).toEqual(original1);
    expect(arr2).toEqual(original2);
  });

  it('(curried) should not modify original arrays', () => {
    const arr1 = [{ x: 1 }, { x: 2 }];
    const arr2 = [{ x: 2 }, { x: 3 }];
    const original1 = [...arr1];
    const original2 = [...arr2];
    
    intersectionWith(arr2, (a, b) => a.x === b.x)(arr1);
    
    expect(arr1).toEqual(original1);
    expect(arr2).toEqual(original2);
  });
});
