import { describe, expect, expectTypeOf, it } from 'vitest';
import type { pullAllBy as pullAllByLodash } from 'lodash';
import { pullAllBy } from './pullAllBy';

describe('pullAllBy', () => {
  it('should accept an `iteratee`', () => {
    const array = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];

    const actual = pullAllBy(array, [{ x: 1 }, { x: 3 }], object => object.x);

    expect(actual).toEqual([{ x: 2 }]);
  });

  it('should provide correct `iteratee` arguments', () => {
    let args: any;
    const array = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];

    pullAllBy(array, [{ x: 1 }, { x: 3 }], function () {
      // eslint-disable-next-line
      args || (args = Array.prototype.slice.call(arguments));
    });

    expect(args).toEqual([{ x: 1 }]);
  });

  it('should handle sparse arrays correctly', () => {
    // eslint-disable-next-line no-sparse-arrays
    const array = [{ x: 1 }, { x: 2 }, , { x: 3 }, { x: 1 }];

    const actual = pullAllBy(array, [{ x: 1 }, { x: 3 }], object => object?.x);

    expect(Object.hasOwn(actual, '0')).toEqual(true);
    expect(Object.hasOwn(actual, '1')).toEqual(false);
  });

  it('should match the type of lodash', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expectTypeOf(pullAllBy).toEqualTypeOf<typeof pullAllByLodash>();
  });
});
