import { describe, expect, expectTypeOf, it } from 'vitest';
import type { upperFirst as upperFirstLodash } from 'lodash';
import { upperFirst } from './upperFirst';
import { map } from '../array/map';
import { stubString } from '../util/stubString';

describe('upperFirst', () => {
  it('should uppercase only the first character', () => {
    expect(upperFirst('fred')).toBe('Fred');
    expect(upperFirst('Fred')).toBe('Fred');
    expect(upperFirst('FRED')).toBe('FRED');
  });

  it('should return an empty string for empty values', () => {
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined, ''];
    const expected = map(values, stubString);

    const actual = map(values, (value, index) => (index ? upperFirst(value as any) : upperFirst()));

    expect(actual).toEqual(expected);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(upperFirst).toEqualTypeOf<typeof upperFirstLodash>();
  });
});
