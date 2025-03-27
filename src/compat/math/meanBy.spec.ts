import { describe, expect, it } from 'vitest';
import { meanBy } from './meanBy';
import { slice } from '../_internal/slice';

describe('meanBy', () => {
  const objects = [{ a: 2 }, { a: 3 }, { a: 1 }];

  it('should work with an `iteratee`', () => {
    const actual = meanBy(objects, object => object.a);

    expect(actual).toEqual(2);
  });

  it('should provide correct `iteratee` arguments', () => {
    let args: any;

    // @ts-expect-error - invalid args
    meanBy(objects, function () {
      args || (args = slice.call(arguments));
    });

    expect(args).toEqual([{ a: 2 }]);
  });

  it('should work with `_.property` shorthands', () => {
    const arrays = [[2], [3], [1]];
    expect(meanBy(arrays, 0)).toBe(2);
    expect(meanBy(objects, 'a')).toBe(2);
  });
});
