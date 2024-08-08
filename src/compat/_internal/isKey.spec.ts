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

  it('should return `true` for property paths that are in the object', () => {
    const object = { 'a.b': 1, 'a[0]': 2, "a['b']": 3, 'a[0].b': 4, "a[0]['b']": 5 };
    const properties = Object.keys(object);
    const actual = properties.map(value => isKey(value, object));
    const expected = properties.map(() => true);

    expect(actual).toEqual(expected);
  });

  it('should return `false` for arrays', () => {
    const properties = [[], [1], [1, 2], [1, 2, 3]];
    const actual = properties.map(value => isKey(value));
    const expected = properties.map(() => false);

    expect(actual).toEqual(expected);
  });

  it('should return true for empty string', () => {
    const actual = isKey('');
    const expected = true;

    expect(actual).toEqual(expected);
  });

  it('should return true for non-word characters', () => {
    const properties = ['^', '!', '@'];
    const actual = properties.map(value => isKey(value));
    const expected = properties.map(() => true);

    expect(actual).toEqual(expected);
  });
});
