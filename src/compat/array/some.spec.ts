import { describe, expect, it } from 'vitest';
import { some } from './some';

describe('some', () => {
  it('should return `true` if `predicate` returns truthy for any element', () => {
    expect(some([1, false, 'string'], () => true)).toBe(true);
  });

  it('should return `false` for empty collections', () => {
    const emptyArr: never[] = [];
    expect(some(emptyArr, () => true)).toBe(false);
  });

  it('should return `true` as soon as `predicate` returns truthy', () => {
    let count = 0;

    expect(
      some([null, true, null, true], value => {
        count++;
        return value;
      })
    ).toBe(true);

    expect(count).toBe(2);
  });

  it('should return `false` if `predicate` returns falsey for all elements', () => {
    const falsyArr = [false, false, false];
    expect(some(falsyArr, value => value)).toBe(false);
  });

  it('should work with `_.property` shorthands', () => {
    const objects = [
      { a: 0, b: 0 },
      { a: 0, b: 1 },
    ];
    expect(some(objects, 'a')).toBe(false);
    expect(some(objects, 'b')).toBe(true);
  });
});
