import { describe, expect, it } from 'vitest';
import { intersectionWith } from './intersectionWith';

describe('intersectionWith', () => {
  it('should return the intersection of two arrays with `mapper`', () => {
    expect(intersectionWith([1.2, 2.1], [1.4, 3.1], (x, y) => Math.floor(x) === Math.floor(y))).toStrictEqual([1.2]);
    expect(
      intersectionWith([{ foo: 1 }, { foo: 2 }], [{ foo: 1 }, { foo: 3 }], (x, y) => x.foo === y.foo)
    ).toStrictEqual([{ foo: 1 }]);
  });

  it('should return the intersection of two arrays have different type', () => {
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

    const result = intersectionWith(array1, array2, (a, b) => a.id === b.id);
    expect(result).toEqual([{ id: 2, csv: 1 }]);
  });
});
