import { describe, expect, expectTypeOf, it } from 'vitest';
import { escape } from 'es-toolkit/compat';
import { unescape } from 'es-toolkit/compat';
import { map } from 'es-toolkit/compat';
import { stubString } from 'es-toolkit/compat';
import type { unescape as unescapeLodash } from 'lodash';

describe('unescape', () => {
  let escaped = '&amp;&lt;&gt;&quot;&#39;/';
  let unescaped = '&<>"\'/';

  escaped += escaped;
  unescaped += unescaped;

  it('should unescape entities in order', () => {
    expect(unescape('&amp;lt;')).toBe('&lt;');
  });

  it('should unescape the proper entities', () => {
    expect(unescape(escaped)).toBe(unescaped);
  });

  it('should handle strings with nothing to unescape', () => {
    expect(unescape('abc')).toBe('abc');
  });

  it('should unescape the same characters escaped by `_.escape`', () => {
    expect(unescape(escape(unescaped))).toBe(unescaped);
  });

  it('should handle leading zeros in html entities', () => {
    expect(unescape('&#39;')).toBe("'");
    expect(unescape('&#039;')).toBe("'");
    expect(unescape('&#000039;')).toBe("'");
  });

  ['&#96;', '&#x2F;'].forEach(entity => {
    it(`should not unescape the "${entity}" entity`, () => {
      expect(unescape(entity)).toBe(entity);
    });
  });

  it('should return an empty string for empty values', () => {
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined, ''];
    const expected = map(values, stubString);

    const actual = map(values, (value, index) => (index ? unescape(value as any) : unescape()));

    expect(actual).toEqual(expected);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(unescape).toEqualTypeOf<typeof unescapeLodash>();
  });
});
