import { describe, expect, it } from 'vitest';
import { unionBy } from './unionBy';

describe('unionBy', () => {
  it('(non-curried) should create a duplicate-free array by iteratee', () => {
    const array = [{ x: 1 }, { x: 2 }, { x: 1 }];
    const result = unionBy(array, [{ x: 2 }, { x: 3 }], value => value.x);
    expect(result).toEqual([{ x: 1 }, { x: 2 }, { x: 3 }]);
  });

  it('(curried) should create a duplicate-free array by iteratee', () => {
    const array = [{ x: 1 }, { x: 2 }, { x: 1 }];
    const result = unionBy([{ x: 2 }, { x: 3 }], value => value.x)(array);
    expect(result).toEqual([{ x: 1 }, { x: 2 }, { x: 3 }]);
  });

  it('(non-curried) should handle empty arrays', () => {
    const result = unionBy([], [], (value: number) => value);
    expect(result).toEqual([]);
  });

  it('(curried) should handle empty arrays', () => {
    const result = unionBy([], (value: number) => value)([]);
    expect(result).toEqual([]);
  });

  it('(non-curried) should not modify original arrays', () => {
    const array1 = [{ x: 1 }, { x: 2 }];
    const array2 = [{ x: 2 }, { x: 3 }];
    const original1 = [...array1];
    const original2 = [...array2];
    unionBy(array1, array2, value => value.x);
    expect(array1).toEqual(original1);
    expect(array2).toEqual(original2);
  });

  it('(curried) should not modify original arrays', () => {
    const array1 = [{ x: 1 }, { x: 2 }];
    const array2 = [{ x: 2 }, { x: 3 }];
    const original1 = [...array1];
    const original2 = [...array2];
    unionBy(array2, value => value.x)(array1);
    expect(array1).toEqual(original1);
    expect(array2).toEqual(original2);
  });
});
