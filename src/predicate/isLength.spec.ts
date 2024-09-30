import { describe, expect, it } from 'vitest';
import { isLength } from './isLength';

describe('isLength', () => {
  it('should return `true` for lengths', () => {
    const values = [0, 3, Number.MAX_SAFE_INTEGER];
    const expected = values.map(() => true);
    const actual = values.map(isLength);

    expect(actual).toEqual(expected);
  });

  it('should return `false` for non-lengths', () => {
    const values = [-1, '1', 1.1, Number.MAX_SAFE_INTEGER + 1];
    const expected = values.map(() => false);
    const actual = values.map(isLength);

    expect(actual).toEqual(expected);
  });
});
