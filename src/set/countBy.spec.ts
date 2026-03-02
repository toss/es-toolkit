import { describe, expect, it } from 'vitest';
import { countBy } from './countBy';

describe('countBy', () => {
  it('should count elements by the result of the mapper function', () => {
    const set = new Set([1, 2, 3, 4, 5]);

    const result = countBy(set, value => (value % 2 === 0 ? 'even' : 'odd'));

    expect(result).toEqual(
      new Map([
        ['odd', 3],
        ['even', 2],
      ])
    );
  });

  it('should pass the original set to the mapper function', () => {
    const set = new Set([1, 2, 3]);

    const result = countBy(set, (value, value2, originalSet) => {
      expect(originalSet).toBe(set);
      return value >= originalSet.size ? 'large' : 'small';
    });

    expect(result).toEqual(
      new Map([
        ['small', 2],
        ['large', 1],
      ])
    );
  });

  it('should return an empty Map for an empty Set', () => {
    const set = new Set<number>();

    const result = countBy(set, value => value);

    expect(result).toEqual(new Map());
  });

  it('should handle string values', () => {
    const set = new Set(['apple', 'banana', 'cherry', 'date']);

    const result = countBy(set, value => value.length);

    // apple=5, banana=6, cherry=6, date=4
    expect(result).toEqual(
      new Map([
        [5, 1],
        [6, 2],
        [4, 1],
      ])
    );
  });

  it('should handle object values', () => {
    const set = new Set([
      { category: 'fruit', name: 'apple' },
      { category: 'fruit', name: 'banana' },
      { category: 'vegetable', name: 'carrot' },
    ]);

    const result = countBy(set, value => value.category);

    expect(result).toEqual(
      new Map([
        ['fruit', 2],
        ['vegetable', 1],
      ])
    );
  });

  it('should count all elements as one key when mapper returns the same value', () => {
    const set = new Set([1, 2, 3, 4, 5]);

    const result = countBy(set, () => 'all');

    expect(result).toEqual(new Map([['all', 5]]));
  });

  it('should count each element separately when mapper returns unique values', () => {
    const set = new Set(['a', 'b', 'c']);

    const result = countBy(set, value => value);

    expect(result).toEqual(
      new Map([
        ['a', 1],
        ['b', 1],
        ['c', 1],
      ])
    );
  });

  it('should not modify the original Set', () => {
    const set = new Set([1, 2, 3]);
    const originalSize = set.size;
    const originalValues = Array.from(set);

    countBy(set, value => value % 2);

    expect(set.size).toBe(originalSize);
    expect(Array.from(set)).toEqual(originalValues);
  });

  it('should handle boolean keys', () => {
    const set = new Set([1, 2, 3, 4, 5]);

    const result = countBy(set, value => value > 3);

    expect(result).toEqual(
      new Map([
        [false, 3],
        [true, 2],
      ])
    );
  });
});
