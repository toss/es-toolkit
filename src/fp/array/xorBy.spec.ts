import { describe, expect, it } from 'vitest';
import { xorBy } from './xorBy';

describe('xorBy', () => {
  it('(non-curried) should compute symmetric difference using iteratee', () => {
    const objects = [{ x: 1 }, { x: 2 }];
    const others = [{ x: 2 }, { x: 3 }];
    const result = xorBy(objects, others, value => value.x);
    expect(result).toEqual([{ x: 1 }, { x: 3 }]);
  });

  it('(curried) should compute symmetric difference using iteratee', () => {
    const objects = [{ x: 1 }, { x: 2 }];
    const others = [{ x: 2 }, { x: 3 }];
    const result = xorBy(others, value => value.x)(objects);
    expect(result).toEqual([{ x: 1 }, { x: 3 }]);
  });

  it('(non-curried) should handle empty arrays', () => {
    const result = xorBy([], [], (value: number) => value);
    expect(result).toEqual([]);
  });

  it('(curried) should handle empty arrays', () => {
    const result = xorBy([], (value: number) => value)([]);
    expect(result).toEqual([]);
  });

  it('(non-curried) should not modify original arrays', () => {
    const array1 = [{ x: 1 }, { x: 2 }];
    const array2 = [{ x: 2 }, { x: 3 }];
    const original1 = [...array1];
    const original2 = [...array2];
    xorBy(array1, array2, value => value.x);
    expect(array1).toEqual(original1);
    expect(array2).toEqual(original2);
  });

  it('(curried) should not modify original arrays', () => {
    const array1 = [{ x: 1 }, { x: 2 }];
    const array2 = [{ x: 2 }, { x: 3 }];
    const original1 = [...array1];
    const original2 = [...array2];
    xorBy(array2, value => value.x)(array1);
    expect(array1).toEqual(original1);
    expect(array2).toEqual(original2);
  });
});
