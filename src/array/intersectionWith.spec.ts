import { describe, expect, it } from 'vitest';
import { intersectionWith } from './intersectionWith';

describe('intersectionWith', () => {
  it('should return the intersection of two arrays with `mapper`', () => {
    expect(intersectionWith([1.2, 2.1], [1.4, 3.1], (x, y) => Math.floor(x) === Math.floor(y))).toStrictEqual([1.2]);
    expect(intersectionWith([{ foo: 1 }, { foo: 2 }], [{ foo: 1 }, { foo: 3 }], (x, y) => x.foo === y.foo)).toStrictEqual([{ foo: 1 }]);
  });
})