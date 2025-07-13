import { describe, expect, expectTypeOf, it } from 'vitest';
import { escapeRegExp } from 'es-toolkit/compat';
import { map } from 'es-toolkit/compat';
import { stubString } from 'es-toolkit/compat';
import type { escapeRegExp as escapeRegExpLodash } from 'lodash';

describe('escapeRegExp', () => {
  const escaped = '\\^\\$\\.\\*\\+\\?\\(\\)\\[\\]\\{\\}\\|\\\\';
  const unescaped = '^$.*+?()[]{}|\\';

  it('should escape values', () => {
    expect(escapeRegExp(unescaped + unescaped)).toBe(escaped + escaped);
  });

  it('should handle strings with nothing to escape', () => {
    expect(escapeRegExp('abc')).toBe('abc');
  });

  it('should return an empty string for empty values', () => {
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined, ''];
    const expected = map(values, stubString);

    const actual = map(values, (value, index) => (index ? escapeRegExp(value as any) : escapeRegExp()));

    expect(actual).toEqual(expected);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(escapeRegExp).toEqualTypeOf<typeof escapeRegExpLodash>();
  });
});
