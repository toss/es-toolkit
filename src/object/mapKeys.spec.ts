import { describe, expect, it } from 'vitest';
import { mapKeys } from './mapKeys';

describe('mapKeys', () => {
  it('should iterate over and map the object using its own string keys', () => {
    expect(mapKeys({ a: 1, b: 2, c: 3 }, ({ key }) => `${key}a`)).toEqual({ aa: 1, ba: 2, ca: 3 });
  });

  it('should iterate over and map the object using its own number keys', () => {
    expect(mapKeys({ 1: 'a', 2: 'b', 3: 'c' }, ({ key }) => key * 2)).toEqual({ 2: 'a', 4: 'b', 6: 'c' });
  });

  it('should pass the value corresponding to the current key into the iteratee', () => {
    expect(mapKeys({ a: 1, b: 2, c: 3 }, ({ value }) => value)).toEqual({ 1: 1, 2: 2, 3: 3 });
  });
});
