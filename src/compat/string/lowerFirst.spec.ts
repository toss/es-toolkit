import { describe, expect, expectTypeOf, it } from 'vitest';
import type { lowerFirst as lowerFirstLodash } from 'lodash';
import { lowerFirst } from './lowerFirst';
import { map } from '../array/map';
import { stubString } from '../util/stubString';

describe('lowerFirst', () => {
  it('should lowercase only the first character', () => {
    expect(lowerFirst('fred')).toBe('fred');
    expect(lowerFirst('Fred')).toBe('fred');
    expect(lowerFirst('FRED')).toBe('fRED');
  });

  it('should return an empty string for empty values', () => {
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined, ''];
    const expected = map(values, stubString);

    const actual = map(values, (value, index) => (index ? lowerFirst(value as any) : lowerFirst()));

    expect(actual).toEqual(expected);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(lowerFirst).toEqualTypeOf<typeof lowerFirstLodash>();
  });
});
