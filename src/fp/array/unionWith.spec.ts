import { describe, expect, it } from 'vitest';
import { unionWith } from './unionWith';

describe('unionWith', () => {
  const isEqual = (a: { x: number; y: number }, b: { x: number; y: number }) => 
    a.x === b.x && a.y === b.y;

  it('(non-curried) should create a duplicate-free array using comparator', () => {
    const objects = [{ x: 1, y: 2 }, { x: 2, y: 1 }];
    const others = [{ x: 1, y: 1 }, { x: 1, y: 2 }];
    const result = unionWith(objects, others, isEqual);
    expect(result).toEqual([
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 1, y: 1 },
    ]);
  });

  it('(curried) should create a duplicate-free array using comparator', () => {
    const objects = [{ x: 1, y: 2 }, { x: 2, y: 1 }];
    const others = [{ x: 1, y: 1 }, { x: 1, y: 2 }];
    const result = unionWith(others, isEqual)(objects);
    expect(result).toEqual([
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 1, y: 1 },
    ]);
  });

  it('(non-curried) should handle empty arrays', () => {
    const result = unionWith([], [], isEqual);
    expect(result).toEqual([]);
  });

  it('(curried) should handle empty arrays', () => {
    const result = unionWith([], isEqual)([]);
    expect(result).toEqual([]);
  });

  it('(non-curried) should not modify original arrays', () => {
    const array1 = [{ x: 1, y: 2 }];
    const array2 = [{ x: 1, y: 1 }];
    const original1 = [...array1];
    const original2 = [...array2];
    unionWith(array1, array2, isEqual);
    expect(array1).toEqual(original1);
    expect(array2).toEqual(original2);
  });

  it('(curried) should not modify original arrays', () => {
    const array1 = [{ x: 1, y: 2 }];
    const array2 = [{ x: 1, y: 1 }];
    const original1 = [...array1];
    const original2 = [...array2];
    unionWith(array2, isEqual)(array1);
    expect(array1).toEqual(original1);
    expect(array2).toEqual(original2);
  });
});
