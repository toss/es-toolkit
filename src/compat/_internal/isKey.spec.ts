import { describe, it, expect } from 'vitest';
import { isKey } from './isKey';

describe('isKey', () => {
  it('should return `true` for property names', () => {
    const properties = ['a', false, 1, null, undefined, -1.1, Symbol.iterator];
    const actual = properties.map(value => isKey(value));
    const expected = properties.map(() => true);

    expect(actual).toEqual(expected);
  });

  it('should return `false` for property paths', () => {
    const properties = ['a.b', 'a[0]', 'a["b"]', "a['b']", 'a[0].b', 'a[0]["b"]', "a[0]['b']"];
    const actual = properties.map(value => isKey(value));
    const expected = properties.map(() => false);

    expect(actual).toEqual(expected);
  });
});
