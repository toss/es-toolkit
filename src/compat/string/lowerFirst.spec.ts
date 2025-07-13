import { describe, expect, expectTypeOf, it } from 'vitest';
import { lowerFirst } from 'es-toolkit/compat';
import { map } from 'es-toolkit/compat';
import { stubString } from 'es-toolkit/compat';
import type { lowerFirst as lowerFirstLodash } from 'lodash';

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
