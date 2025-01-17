import { describe, expect, it } from 'vitest';
import { sortBy } from './sortBy';

describe('sortBy', () => {
  it('should sort array by key selector', () => {
    const users = [
      { name: 'fred', age: 48 },
      { name: 'barney', age: 36 },
      { name: 'fred', age: 40 },
    ];

    expect(sortBy(users, user => user.age)).toEqual([
      { name: 'barney', age: 36 },
      { name: 'fred', age: 40 },
      { name: 'fred', age: 48 },
    ]);

    expect(sortBy<typeof users, number>(user => user.age)(users)).toEqual([
      { name: 'barney', age: 36 },
      { name: 'fred', age: 40 },
      { name: 'fred', age: 48 },
    ]);
  });

  it('should sort array by string key', () => {
    const users = [
      { name: 'fred', age: 48 },
      { name: 'barney', age: 36 },
      { name: 'fred', age: 40 },
    ];

    expect(sortBy(users, user => user.name)).toEqual([
      { name: 'barney', age: 36 },
      { name: 'fred', age: 48 },
      { name: 'fred', age: 40 },
    ]);
  });

  it('should not change value of original array', () => {
    const arr = [{ id: 3 }, { id: 1 }, { id: 2 }];
    const arr2 = [{ id: 3 }, { id: 1 }, { id: 2 }];

    sortBy(arr, item => item.id);
    sortBy<typeof arr, number>(item => item.id)(arr2);

    expect(arr).toEqual([{ id: 3 }, { id: 1 }, { id: 2 }]);
    expect(arr2).toEqual([{ id: 3 }, { id: 1 }, { id: 2 }]);
  });
});
