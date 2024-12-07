import { describe, expect, it } from 'vitest';
import { findKey } from './findKey';

/**
 * @see https://lodash.com/docs/4.17.15#findKey
 */
describe('findKey', () => {
  const users = {
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
    pebbles: { age: 1, active: true },
  };

  it('should find key with a function predicate', function () {
    const actual = findKey(users, function (o) {
      return o.age < 40;
    });
    expect(actual).toBe('barney');
  });

  it('should work with `_.matches` shorthands', function () {
    const actual = findKey(users, { age: 1, active: true });
    expect(actual).toBe('pebbles');
  });

  it('should work with `_.matchesProperty` shorthands', function () {
    const actual = findKey(users, ['active', false]);
    expect(actual).toBe('fred');
  });

  it('should work with `_.property` shorthands', function () {
    const actual = findKey(users, 'active');
    expect(actual).toBe('barney');
  });

  it('should return undefined for an empty object', function () {
    // @ts-expect-error - invalid argument
    const actual = findKey({}, { age: 36 });
    expect(actual).toBeUndefined();
  });

  it('should return undefined for null input', function () {
    const actual = findKey(null, { age: 36 });
    expect(actual).toBeUndefined();
  });

  it('should return undefined for undefined input', function () {
    const actual = findKey(undefined, { age: 36 });
    expect(actual).toBeUndefined();
  });

  it('should return undefined if no matching key is found', function () {
    const actual = findKey(users, { age: 100 });
    expect(actual).toBeUndefined();
  });

  it('should handle partial matches with `Partial<T[keyof T]>`', function () {
    const actual = findKey(users, { active: true });
    expect(actual).toBe('barney');
  });
});
