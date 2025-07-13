import { describe, expect, expectTypeOf, it } from 'vitest';
import { capitalize } from 'es-toolkit/compat';
import type { capitalize as capitalizeLodash } from 'lodash';

describe('capitalize', () => {
  it('should capitalize the first character of a string', () => {
    expect(capitalize('fred')).toBe('Fred');
    expect(capitalize('Fred')).toBe('Fred');
    expect(capitalize(' fred')).toBe(' fred');
  });

  it('should match the type of lodash', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expectTypeOf(capitalize).toEqualTypeOf<typeof capitalizeLodash>();
  });
});
