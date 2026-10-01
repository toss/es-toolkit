import { describe, expect, it } from 'vitest';
import { mapValues } from './mapValues';

describe('mapValues', () => {
  it('should iterate over and map the object using its own values', () => {
    expect(mapValues({ a: 1, b: 2, c: 3 }, value => ++value)).toEqual({ a: 2, b: 3, c: 4 });
  });

  it('should pass the key corresponding to the current value into the iteratee', () => {
    expect(mapValues({ a: 1, b: 2, c: 3 }, (_, key) => key)).toEqual({ a: 'a', b: 'b', c: 'c' });
  });

  it('should pass the cloned object into the iteratee', () => {
    expect(
      mapValues({ a: 1, b: 2, c: 3 }, (value, key, object) => {
        object[key] = value * 11;
        return value * 11;
      })
    ).toEqual({ a: 11, b: 22, c: 33 });
  });

  it('should preserve own __proto__ property and not set as prototype', () => {
    const parsed = JSON.parse('{"__proto__": {"isAdmin": true}, "x": 1}');
    const result = mapValues(parsed, v => v);

    expect(Object.hasOwn(result, '__proto__')).toBe(true);
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect((result as any).isAdmin).toBeUndefined();
  });
});
