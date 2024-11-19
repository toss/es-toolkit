import { describe, expect, it } from 'vitest';
import { mapKeys } from './mapKeys';

describe('mapKeys', () => {
  it('(non-curried) should iterate over and map the object using its own string keys', () => {
    expect(mapKeys({ a: 1, b: 2, c: 3 }, (_, key) => `${key}a`)).toEqual({ aa: 1, ba: 2, ca: 3 });
  });

  it('(curried) should iterate over and map the object using its own string keys', () => {
    expect(mapKeys((_, key) => `${key}a`)({ a: 1, b: 2, c: 3 })).toEqual({ aa: 1, ba: 2, ca: 3 });
  });

  it('(non-curried) should iterate over and map the object using its own number keys', () => {
    expect(mapKeys({ 1: 'a', 2: 'b', 3: 'c' }, (_, key) => key * 2)).toEqual({ 2: 'a', 4: 'b', 6: 'c' });
  });

  it('(curried) should iterate over and map the object using its own number keys', () => {
    expect(mapKeys((_, key: number) => key * 2)({ 1: 'a', 2: 'b', 3: 'c' })).toEqual({ 2: 'a', 4: 'b', 6: 'c' });
  });

  it('(non-curried) should pass the value corresponding to the current key into the iteratee', () => {
    expect(mapKeys({ a: 1, b: 2, c: 3 }, value => value)).toEqual({ 1: 1, 2: 2, 3: 3 });
  });

  it('(curried) should pass the value corresponding to the current key into the iteratee', () => {
    expect(mapKeys((value: number) => value)({ a: 1, b: 2, c: 3 })).toEqual({ 1: 1, 2: 2, 3: 3 });
  });
});
