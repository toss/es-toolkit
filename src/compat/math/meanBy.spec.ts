import { describe, expect, expectTypeOf, it } from 'vitest';
import { meanBy } from 'es-toolkit/compat';
import type { meanBy as meanByLodash } from 'lodash';
import { slice } from '../_internal/slice';

describe('meanBy', () => {
  const objects = [{ a: 2 }, { a: 3 }, { a: 1 }];

  it('should work with an `iteratee`', () => {
    const actual = meanBy(objects, object => object.a);

    expect(actual).toEqual(2);
  });

  it('should provide correct `iteratee` arguments', () => {
    let args: any;

    meanBy(objects, function () {
      // eslint-disable-next-line
      args || (args = slice.call(arguments));
    });

    expect(args).toEqual([{ a: 2 }]);
  });

  it('should work with `_.property` shorthands', () => {
    const arrays = [[2], [3], [1]];
    expect(meanBy(arrays, 0)).toBe(2);
    expect(meanBy(objects, 'a')).toBe(2);
  });

  it('should handle null and undefined values', () => {
    expect(meanBy(null)).toBe(NaN);
    expect(meanBy(undefined)).toBe(NaN);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(meanBy).toEqualTypeOf<typeof meanByLodash>();
  });
});
