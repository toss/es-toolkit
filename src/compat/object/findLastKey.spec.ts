import { describe, expect, it } from 'vitest';
import { findLastKey } from './findLastKey';

/**
 * @see https://lodash.com/docs/4.17.15#findLastKey
 */
describe('findLastKey', () => {
  const users = {
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
    pebbles: { age: 1, active: true },
  };

  it('should find key with a function predicate', () => {
    const actual = findLastKey(users, o => o.age < 40);
    expect(actual).toBe('pebbles');
  });

  it('should work with `_.matches` shorthands', () => {
    const actual = findLastKey(users, { age: 1, active: true });
    expect(actual).toBe('pebbles');
  });

  it('should work with `_.matchesProperty` shorthands', () => {
    const actual = findLastKey(users, ['active', false]);
    expect(actual).toBe('fred');
  });

  it('should work with `_.property` shorthands', () => {
    const actual = findLastKey(users, 'active');
    expect(actual).toBe('pebbles');
  });

  it('should return undefined for an empty object', () => {
    const actual = findLastKey({}, { age: 36 } as any);
    expect(actual).toBeUndefined();
  });

  it('should return undefined for null input', () => {
    const actual = findLastKey(null, { age: 36 });
    expect(actual).toBeUndefined();
  });

  it('should return undefined for undefined input', () => {
    const actual = findLastKey(undefined, { age: 36 });
    expect(actual).toBeUndefined();
  });

  it('should return undefined if no matching key is found', () => {
    const actual = findLastKey(users, { age: 100 });
    expect(actual).toBeUndefined();
  });

  it('should handle partial matches with `Partial<T[keyof T]>`', () => {
    const actual = findLastKey(users, { active: true });
    expect(actual).toBe('pebbles');
  });

  it('should provide correct predicate arguments', () => {
    const object = { a: 1 };
    let args: unknown[] | undefined;

    findLastKey(object, function (...fnArgs) {
      args ??= fnArgs;
      return false;
    });

    expect(args).toEqual([1, 'a', object]);
  });
});
