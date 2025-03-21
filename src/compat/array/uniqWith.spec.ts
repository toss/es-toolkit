import { describe, expect, it } from 'vitest';
import * as lodashStable from 'es-toolkit/compat';
import { uniqWith } from './uniqWith';
import { isEven } from '../_internal/isEven';
import { LARGE_ARRAY_SIZE } from '../_internal/LARGE_ARRAY_SIZE';

describe('uniqWith', () => {
  it('should work with a `comparator`', () => {
    const objects = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 1, y: 2 },
    ];
    const actual = uniqWith(objects, lodashStable.isEqual);

    expect(actual).toEqual([objects[0], objects[1]]);
  });

  it('should preserve the sign of `0`', () => {
    const largeArray = lodashStable.times(LARGE_ARRAY_SIZE, index => (isEven(index) ? -0 : 0));

    const arrays = [[-0, 0], largeArray];
    const expected = lodashStable.map(arrays, lodashStable.constant(['-0']));

    const actual = lodashStable.map(arrays, array =>
      lodashStable.map(uniqWith(array, lodashStable.eq), lodashStable.toString)
    );

    expect(actual).toEqual(expected);
  });
});
