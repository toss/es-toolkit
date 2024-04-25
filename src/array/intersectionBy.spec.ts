import { describe, expect, it } from 'vitest';
import { intersectionBy } from './intersectionBy';

describe('intersectionBy', () => {
  it('should return the intersection of two arrays with `mapper`', () => {
    expect(intersectionBy([1.2, 2.1], [1.4, 3.1], Math.floor)).toStrictEqual([1.2]);
    expect(intersectionBy([{ foo: 1 }, { foo: 2 }], [{ foo: 1 }, { foo: 3 }], x => x.foo)).toStrictEqual([{ foo: 1 }]);
  });
})