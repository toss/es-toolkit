import { describe, expect, it } from 'vitest';
import { intersectionBy } from './intersectionBy';

describe('intersectionBy', () => {
  it('should return the intersection of two arrays with `mapper`', () => {
    expect(intersectionBy([1.2, 2.1], [1.4, 3.1], Math.floor)).toStrictEqual([1.2]);
    expect(intersectionBy([{ foo: 1 }, { foo: 2 }], [{ foo: 1 }, { foo: 3 }], x => x.foo)).toStrictEqual([{ foo: 1 }]);
  });

  it('should return the intersection of two arrays with different element types using a `mapper` function', () => {
    type CSV = { id: number; csv: number };
    type JSON = { id: number; json: number };

    const array1: CSV[] = [
      { id: 1, csv: 1 },
      { id: 2, csv: 1 },
      { id: 3, csv: 1 },
    ];
    const array2: JSON[] = [
      { id: 2, json: 2 },
      { id: 4, json: 2 },
    ];

    const result = intersectionBy(array1, array2, value => value.id);
    expect(result).toEqual([{ id: 2, csv: 1 }]);
  });
});
