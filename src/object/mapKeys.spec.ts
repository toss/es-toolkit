import { describe, expect, expectTypeOf, it } from 'vitest';
import { mapKeys } from './mapKeys';

describe('mapKeys', () => {
  it('should iterate over and map the object using its own string keys', () => {
    expect(mapKeys({ a: 1, b: 2, c: 3 }, (_, key) => `${key}a`)).toEqual({ aa: 1, ba: 2, ca: 3 });
  });

  it('should iterate over and map the object using its own number keys', () => {
    expect(mapKeys({ 1: 'a', 2: 'b', 3: 'c' }, (_, key) => Number(key) * 2)).toEqual({ 2: 'a', 4: 'b', 6: 'c' });
  });

  it('should pass string enum keys as the enum type', () => {
    enum Status {
      Active = 'active',
      Inactive = 'inactive',
    }
    const counts: Record<Status, number> = { [Status.Active]: 1, [Status.Inactive]: 2 };

    const result = mapKeys(counts, (_, key) => {
      expectTypeOf(key).toEqualTypeOf<Status>();
      return key.toUpperCase();
    });

    expect(result).toEqual({ ACTIVE: 1, INACTIVE: 2 });
  });

  it('should pass keys that support string methods when the object type is generic', () => {
    function upperCaseKeys<T extends Record<string, number>>(object: T) {
      return mapKeys(object, (_, key) => key.toUpperCase());
    }

    expect(upperCaseKeys({ a: 1, b: 2 })).toEqual({ A: 1, B: 2 });
  });

  it('should pass the value corresponding to the current key into the iteratee', () => {
    expect(mapKeys({ a: 1, b: 2, c: 3 }, value => value)).toEqual({ 1: 1, 2: 2, 3: 3 });
  });
});
