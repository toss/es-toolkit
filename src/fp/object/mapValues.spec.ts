import { describe, expect, it } from 'vitest';
import { mapValues } from './mapValues';

describe('mapValues', () => {
  it(
    "(non-curried) should iterate over and map the object using its own values",
    () => {
      expect(mapValues({ a: 1, b: 2, c: 3 }, value => ++value)).toEqual({ a: 2, b: 3, c: 4 });
    }
  );

  it("(curried) should iterate over and map the object using its own values", () => {
    expect(mapValues(value => ++value)({ a: 1, b: 2, c: 3 })).toEqual({ a: 2, b: 3, c: 4 });
  });

  it(
    "(non-curried) should pass the key corresponding to the current value into the iteratee",
    () => {
      expect(mapValues({ a: 1, b: 2, c: 3 }, (_, key) => key)).toEqual({ a: 'a', b: 'b', c: 'c' });
    }
  );

  it("(curried) should pass the key corresponding to the current value into the iteratee", () => {
    expect(mapValues((_, key) => key)({ a: 1, b: 2, c: 3 })).toEqual({ a: 'a', b: 'b', c: 'c' });
  });

  it("(non-curried) should pass the cloned object into the iteratee", () => {
    expect(
      mapValues({ a: 1, b: 2, c: 3 }, (value, key, object) => {
        object[key] = value * 11;
        return value * 11;
      })
    ).toEqual({ a: 11, b: 22, c: 33 });
  });

  it("(curried) should pass the cloned object into the iteratee", () => {
    expect(
      mapValues<{ a: number; b: number; c: number }, 'a' | 'b' | 'c', number>(
        (value, key, object) => {
          object[key] = value * 11;
          return value * 11;
        }
      )({ a: 1, b: 2, c: 3 })
    ).toEqual({ a: 11, b: 22, c: 33 });
  });
});
