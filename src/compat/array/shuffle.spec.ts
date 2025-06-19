import { describe, expect, it, expectTypeOf } from 'vitest';
import type { shuffle as shuffleLodash } from 'lodash';
import { shuffle } from './shuffle.ts';
import { sortBy } from './sortBy';
import { uniqBy } from './uniqBy';
import { times } from '../util/times';

describe('shuffle', () => {
  const array = [1, 2, 3];
  const object = { a: 1, b: 2, c: 3 };

  it('should return a new array', () => {
    expect(shuffle(array)).not.toBe(array);
  });

  it('should contain the same elements after a collection is shuffled', () => {
    expect(shuffle(array).sort()).toEqual(array);
    expect(shuffle(object).sort()).toEqual(array);
  });

  it('should shuffle small collections', () => {
    const actual = times(1000, () => shuffle([1, 2]));

    expect(sortBy(uniqBy(actual, String), '0')).toEqual([
      [1, 2],
      [2, 1],
    ]);
  });

  it('should treat number values for `collection` as empty', () => {
    // @ts-expect-error - Testing behavior with number input, though not strictly typed
    expect(shuffle(1)).toEqual([]);
  });

  // additional test
  it('should treat nullish values for `collection` as empty', () => {
    expect(shuffle(null)).toEqual([]);
    expect(shuffle(undefined)).toEqual([]);
  });

  it('should treat array-like objects as arrays', () => {
    const arrayLike = {
      2: 'a',
      0: 'b',
      1: 'c',
      length: 3,
    };

    const result = shuffle(arrayLike);

    expect(result).not.toBe(Array.from(arrayLike));
    expect(shuffle(arrayLike).sort()).toEqual(['a', 'b', 'c']);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(shuffle).toEqualTypeOf<typeof shuffleLodash>();
  });
});
