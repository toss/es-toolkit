import { describe, expect, it, expectTypeOf } from 'vitest';
import type { capitalize as capitalizeLodash } from 'lodash';
import { capitalize } from '../../string/capitalize';

describe('capitalize', () => {
  it('should capitalize the first character of a string', () => {
    expect(capitalize('fred')).toBe('Fred');
    expect(capitalize('Fred')).toBe('Fred');
    expect(capitalize(' fred')).toBe(' fred');
  });

  it('should match the type of lodash', () => {
    expectTypeOf(capitalize).toEqualTypeOf<typeof capitalizeLodash>();
  });
});
