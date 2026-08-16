import { describe, expect, it } from 'vitest';
import { isLength } from '../index';

/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/isLength.spec.js#L1
 */
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
