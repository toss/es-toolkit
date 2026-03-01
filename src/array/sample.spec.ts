import { describe, expect, expectTypeOf, it } from 'vitest';
import { sample } from './sample';

describe('sample', () => {
  it('selects a random element from an array', () => {
    const arr = [1, 2, 3, 4, 5];

    expect(arr).toContain(sample(arr));
  });

  it('returns undefined for an empty array', () => {
    expect(sample([])).toBeUndefined();
  });

  it('should have return type T | undefined', () => {
    const arr: string[] = ['a', 'b', 'c'];
    expectTypeOf(sample(arr)).toEqualTypeOf<string | undefined>();
  });
});
