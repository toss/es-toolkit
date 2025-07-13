import { describe, expect, expectTypeOf, it } from 'vitest';
import { noop } from 'es-toolkit/compat';
import type { noop as noopLodash } from 'lodash';

describe('noop', () => {
  it('should be a function', () => {
    expect(typeof noop).toBe('function');
  });

  it('should return undefined', () => {
    expect(noop()).toBeUndefined();
  });

  it('should match the type of lodash', () => {
    expectTypeOf(noop).toEqualTypeOf<typeof noopLodash>();
  });
});
