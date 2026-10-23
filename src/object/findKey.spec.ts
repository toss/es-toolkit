import { describe, expect, expectTypeOf, it } from 'vitest';
import { findKey } from './findKey';

describe('findKey', () => {
  const users = {
    pebbles: { age: 24, active: true },
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
  };

  it('should return the key of the first element that satisfies the predicate', () => {
    expect(findKey(users, o => o.age < 40)).toBe('pebbles');
  });

  it('should return the first key if all elements satisfy the predicate', () => {
    expect(findKey(users, o => o.age > 20)).toBe('pebbles');
  });

  it('should return undefined if no element satisfies the predicate', () => {
    expect(findKey(users, o => o.age > 50)).toBeUndefined();
  });

  it('should return undefined for an empty object', () => {
    const users = {};

    // @ts-expect-error users is empty here
    expect(findKey(users, o => o.age < 40)).toBeUndefined();
  });

  it('should handle objects with various data types', () => {
    const data = {
      num: 42,
      str: 'hello',
      bool: true,
    };

    expect(findKey(data, value => typeof value === 'string')).toBe('str');
  });

  it('should keep string enum keys as the enum type', () => {
    enum Status {
      Active = 'active',
      Inactive = 'inactive',
    }
    const counts: Record<Status, number> = { [Status.Active]: 1, [Status.Inactive]: 2 };

    const key = findKey(counts, value => value === 2);

    expectTypeOf(key).toEqualTypeOf<Status | undefined>();
    expect(key).toBe(Status.Inactive);
  });

  it('should pass the key and object to the predicate function', () => {
    const users = {
      barney: { age: 36, active: true },
      fred: { age: 40, active: false },
    };

    expect(findKey(users, (_, key, obj) => key === 'fred' && obj[key].active === false)).toBe('fred');
  });
});
