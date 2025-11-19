import { describe, expect, it } from 'vitest';
import { uniqBy } from './uniqBy';

describe('uniqBy', () => {
  it('should work with a `mapper`', () => {
    expect(uniqBy([2.1, 1.2, 2.3], Math.floor)).toEqual([2.1, 1.2]);
    expect(uniqBy([1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19], Math.floor)).toEqual([1.2, 2.1, 3.2, 5.7, 7.19]);
  });

  it('should keep the first occurrence when duplicates are found', () => {
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
});
