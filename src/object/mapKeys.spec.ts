import { describe, expect, it } from 'vitest';
import { mapKey } from './mapKey';

describe('mapKey', () => {
  it('should iterate over and map the object using its own string keys', () => {
    expect(mapKey({ a: 1, b: 2, c: 3 }, (_, key) => `${key}a`)).toEqual({ aa: 1, ba: 2, ca: 3 });
  });

  it('should iterate over and map the object using its own number keys', () => {
    expect(mapKey({ 1: 'a', 2: 'b', 3: 'c' }, (_, key) => key * 2)).toEqual({ 2: 'a', 4: 'b', 6: 'c' });
  });

  it('should pass the value corresponding to the current key into the iteratee', () => {
    expect(mapKey({ a: 1, b: 2, c: 3 }, value => value)).toEqual({ 1: 1, 2: 2, 3: 3 });
  });

  it('should pass the cloned object into the iteratee', () => {
    const object: Record<string, number> = { a: 1, b: 2, c: 3 };
    expect(
      mapKey(object, (_, key, object) => {
        object[`${key}${key}`] = 4;
        return `${key}${key}`;
      })
    ).toEqual({ aa: 1, bb: 2, cc: 3 });

    expect(object).toEqual({ a: 1, b: 2, c: 3 });
  });
});
