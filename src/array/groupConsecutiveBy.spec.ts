import { describe, expect, it } from 'vitest';
import { groupConsecutiveBy } from './groupConsecutiveBy';

describe('groupConsecutiveBy', () => {
  it('should group elements by a given key', () => {
    const array = [
      { category: 'fruit', name: 'apple' },
      { category: 'fruit', name: 'banana' },
      { category: 'vegetable', name: 'carrot' },
      { category: 'fruit', name: 'pear' },
      { category: 'vegetable', name: 'broccoli' },
      { category: 'vegetable', name: 'tomato' },
    ];

    const result = groupConsecutiveBy(array, item => item.category);

    expect(result).toEqual([
      [
        { category: 'fruit', name: 'apple' },
        { category: 'fruit', name: 'banana' },
      ],
      [{ category: 'vegetable', name: 'carrot' }],
      [{ category: 'fruit', name: 'pear' }],
      [
        { category: 'vegetable', name: 'broccoli' },
        { category: 'vegetable', name: 'tomato' },
      ],
    ]);
  });

  it('should handle an empty array', () => {
    const array: Array<{ category: string; name: string }> = [];

    const result = groupConsecutiveBy(array, item => item.category);

    expect(result).toEqual([]);
  });

  it('should handle an array with one element', () => {
    const array = [{ category: 'fruit', name: 'apple' }];

    const result = groupConsecutiveBy(array, item => item.category);

    expect(result).toEqual([[{ category: 'fruit', name: 'apple' }]]);
  });

  it('should group elements by a numeric key', () => {
    const array = [
      { score: 1, name: 'John' },
      { score: 2, name: 'Jane' },
      { score: 1, name: 'Joe' },
      { score: 3, name: 'Jade' },
      { score: 3, name: 'Jordan' },
    ];

    const result = groupConsecutiveBy(array, item => item.score);

    expect(result).toEqual([
      [{ score: 1, name: 'John' }],
      [{ score: 2, name: 'Jane' }],
      [{ score: 1, name: 'Joe' }],
      [
        { score: 3, name: 'Jade' },
        { score: 3, name: 'Jordan' },
      ],
    ]);
  });

  it('should group elements by a symbol key', () => {
    const TYPE_A = Symbol();
    const TYPE_B = Symbol();
    const array = [
      { type: TYPE_A, score: 1, name: 'John' },
      { type: TYPE_A, score: 2, name: 'Jane' },
      { type: TYPE_B, score: 1, name: 'Joe' },
      { type: TYPE_A, score: 4, name: 'Jordan' },
      { type: TYPE_A, score: 9, name: 'Jade' },
    ];

    const result = groupConsecutiveBy(array, item => item.type);

    expect(result).toEqual([
      [
        { type: TYPE_A, score: 1, name: 'John' },
        { type: TYPE_A, score: 2, name: 'Jane' },
      ],
      [{ type: TYPE_B, score: 1, name: 'Joe' }],
      [
        { type: TYPE_A, score: 4, name: 'Jordan' },
        { type: TYPE_A, score: 9, name: 'Jade' },
      ],
    ]);
  });

  it('should handle duplicate keys correctly', () => {
    const array = [
      { category: 'fruit', name: 'apple' },
      { category: 'fruit', name: 'apple' },
    ];

    const result = groupConsecutiveBy(array, item => item.category);

    expect(result).toEqual([
      [
        { category: 'fruit', name: 'apple' },
        { category: 'fruit', name: 'apple' },
      ],
    ]);
  });
});
