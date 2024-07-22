import { describe, it, expect } from 'vitest';
import { isObjectLike } from './isObjectLike';
import { args } from '../compat/_internal/args';
import { falsey } from '../compat/_internal/falsey';
import { symbol } from '../compat/_internal/symbol';
import { slice } from '../compat/_internal/slice';
import { stubFalse } from '../compat/_internal/stubFalse';

describe('isObjectLike', () => {
  it('should return `true` for objects', () => {
    expect(isObjectLike(args)).toBe(true);
    expect(isObjectLike([1, 2, 3])).toBe(true);
    expect(isObjectLike(Object(false))).toBe(true);
    expect(isObjectLike(new Date())).toBe(true);
    expect(isObjectLike(new Error())).toBe(true);
    expect(isObjectLike({ a: 1 })).toBe(true);
    expect(isObjectLike(Object(0))).toBe(true);
    expect(isObjectLike(/x/)).toBe(true);
    expect(isObjectLike(Object('a'))).toBe(true);
  });

  it('should return `false` for non-objects', () => {
    const values = falsey.concat(true, slice, 1, 'a', symbol);
    const expected = values.map(stubFalse);

    const actual = values.map(isObjectLike);

    expect(actual).toEqual(expected);
  });
});
