import { describe, expect, it, expectTypeOf } from 'vitest';
import type { unionBy as unionByLodash } from 'lodash';
import { unionBy } from './unionBy';
import { args } from '../_internal/args';

/**
 * @see https://github.com/lodash/lodash/blob/v5-wip/test/union-methods.spec.js
 * @see https://github.com/lodash/lodash/blob/v5-wip/test/unionBy.spec.js
 */
describe('unionBy', () => {
  it('should return the union of two arrays', () => {
    const actual = unionBy([2], [1, 2]);
    expect(actual).toEqual([2, 1]);
  });

  it('should return the union of multiple arrays', () => {
    const actual = unionBy([2], [1, 2], [2, 3]);
    expect(actual).toEqual([2, 1, 3]);
  });

  it('should not flatten nested arrays', () => {
    const actual = unionBy([1, 3, 2], [1, [5]], [2, [4]]);
    expect(actual).toEqual([1, 3, 2, [5], [4]]);
  });

  it('should ignore values that are not arrays or arguments objects', () => {
    const array = [0];
    // eslint-disable-next-line
    // @ts-ignore
    expect(unionBy(array, 3, { '0': 1 }, null)).toEqual(array);
    expect(unionBy(null, array, null, [2, 1])).toEqual([0, 2, 1]);
    expect(unionBy(array, null, args, null)).toEqual([0, 1, 2, 3]);
  });

  it('should accept an `iteratee`', () => {
    const actual1 = unionBy([2.1], [1.2, 2.3], Math.floor);
    expect(actual1).toEqual([2.1, 1.2]);

    const actual2 = unionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x');
    expect(actual2).toEqual([{ x: 1 }, { x: 2 }]);
  });

  it('should provide correct `iteratee` arguments', () => {
    let args: any;

    unionBy([2.1], [1.2, 2.3], function (...params) {
      if (args === undefined) {
        args = params;
      }
    });

    expect(args).toEqual([2.1]);
  });

  it('should output values from the first possible array', () => {
    const actual = unionBy([{ x: 1, y: 1 }], [{ x: 1, y: 2 }], 'x');
    expect(actual).toEqual([{ x: 1, y: 1 }]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(unionBy).toEqualTypeOf<typeof unionByLodash>();
  });
});
