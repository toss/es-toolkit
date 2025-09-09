import { describe, expect, it } from 'vitest';
import { zip } from './zip';

describe('zip', () => {
  it('zips multiple arrays to create a tuple', () => {
    expect(zip([1, 2, 3])).toEqual([[1], [2], [3]]);

    expect(zip([1, 2, 3], ['a', 'b', 'c'])).toEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);
    expect(zip([1, 2, 3], ['a', 'b'])).toEqual([
      [1, 'a'],
      [2, 'b'],
      [3, undefined],
    ]);

    expect(zip([1, 2, 3], ['a', 'b', 'c'], [true, true, false])).toEqual([
      [1, 'a', true],
      [2, 'b', true],
      [3, 'c', false],
    ]);
    expect(zip([1], ['a'], [true], [null])).toEqual([[1, 'a', true, null]]);
  });

  it('supports spread operators', () => {
    expect(zip(...[[1], ['s'], [{ a: 2 }]])).toEqual([[1, 's', { a: 2 }]]);
  });
});
