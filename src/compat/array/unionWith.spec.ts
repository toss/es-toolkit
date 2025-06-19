import { describe, expect, expectTypeOf, it } from 'vitest';
import type { unionWith as unionWithLodash } from 'lodash';
import { unionWith } from './unionWith';
import { isEqual } from '../../predicate';
import { args } from '../_internal/args';

/**
 * @see https://github.com/lodash/lodash/blob/v5-wip/test/union-methods.spec.js
 * @see https://github.com/lodash/lodash/blob/v5-wip/test/unionWith.spec.js
 */
describe('unionWith', () => {
  it('should return the union of two arrays', () => {
    const actual = unionWith([2], [1, 2]);
    expect(actual).toEqual([2, 1]);
  });

  it('should return the union of multiple arrays', () => {
    const actual = unionWith([2], [1, 2], [2, 3]);
    expect(actual).toEqual([2, 1, 3]);
  });

  it('should not flatten nested arrays', () => {
    const actual = unionWith([1, 3, 2], [1, [5]], [2, [4]]);
    expect(actual).toEqual([1, 3, 2, [5], [4]]);
  });

  it('should ignore values that are not arrays or arguments objects', () => {
    const array = [0];
    // eslint-disable-next-line
    // @ts-ignore
    expect(unionWith(array, 3, { '0': 1 }, null)).toEqual(array);
    expect(unionWith(null, array, null, [2, 1])).toEqual([0, 2, 1]);
    expect(unionWith(array, null, args, null)).toEqual([0, 1, 2, 3]);
  });

  it('should work with a `comparator`', () => {
    const objects = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ];
    const others = [
      { x: 1, y: 1 },
      { x: 1, y: 2 },
    ];
    const actual = unionWith(objects, others, isEqual);

    expect(actual).toEqual([objects[0], objects[1], others[0]]);
  });

  it('should output values from the first possible array', () => {
    const objects = [{ x: 1, y: 1 }];
    const others = [{ x: 1, y: 2 }];

    const actual = unionWith(objects, others, (a, b) => a.x === b.x);

    expect(actual).toEqual([{ x: 1, y: 1 }]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(unionWith).toEqualTypeOf<typeof unionWithLodash>();
  });
});
