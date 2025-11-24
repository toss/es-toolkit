import { describe, expect, it } from 'vitest';
import { uniqBy } from './uniqBy';

describe('uniqBy', () => {
  it('should work with a selector function (mapper)', () => {
    expect(uniqBy([2.1, 1.2, 2.3], Math.floor)).toEqual([2.1, 1.2]);
    expect(uniqBy([1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19], Math.floor)).toEqual([1.2, 2.1, 3.2, 5.7, 7.19]);
  });

  it('should keep the first occurrence when duplicates are found (selector function)', () => {
    const items = [
      { id: 1, value: 'apple' },
      { id: 2, value: 'banana' },
      { id: 1, value: 'avocado' },
      { id: 3, value: 'cherry' },
      { id: 2, value: 'blueberry' },
    ];

    const result = uniqBy(items, x => x.id);

    expect(result).toEqual([
      { id: 1, value: 'apple' },
      { id: 2, value: 'banana' },
      { id: 3, value: 'cherry' },
    ]);
  });
  it('should work with a property key selector', () => {
    const items = [
      { id: 1, value: 'jinho' },
      { id: 2, value: 'dohee' },
      { id: 1, value: 'jihun' },
      { id: 3, value: 'taeho' },
      { id: 2, value: 'eunji' },
    ];

    const result = uniqBy(items, 'id');

    expect(result).toEqual([
      { id: 1, value: 'jinho' },
      { id: 2, value: 'dohee' },
      { id: 3, value: 'taeho' },
    ]);
  });

  it('should work with a property key selector for string fields', () => {
    const items = [
      { category: 'fruit', name: 'apple' },
      { category: 'fruit', name: 'banana' },
      { category: 'vegetable', name: 'carrot' },
      { category: 'vegetable', name: 'onion' },
    ];

    const result = uniqBy(items, 'category');

    expect(result).toEqual([
      { category: 'fruit', name: 'apple' },
      { category: 'vegetable', name: 'carrot' },
    ]);
  });

  it('should return an empty array when input is empty', () => {
    expect(uniqBy([], Math.floor)).toEqual([]);
    expect(uniqBy([] as Array<{ id: number }>, 'id')).toEqual([]);
  });
});
