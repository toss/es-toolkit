import { describe, expect, it } from 'vitest';
import { escapeRegExp } from './escapeRegExp';
import { map } from '../array/map';
import { stubString } from '../util/stubString';

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
    const values = [, null, undefined, ''];
    const expected = map(values, stubString);

    const actual = map(values, (value, index) =>
      // @ts-expect-error - invalid escapeRegExp arguments
      index ? escapeRegExp(value as any) : escapeRegExp()
    );

    expect(actual).toEqual(expected);
  });
});
