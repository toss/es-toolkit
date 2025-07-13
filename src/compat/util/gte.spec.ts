import { describe, expect, expectTypeOf, it } from 'vitest';
import { gte } from 'es-toolkit/compat';
import type { gte as gteLodash } from 'lodash';

describe('gte', () => {
  it('should return `true` if `value` >= `other`', () => {
    expect(gte(3, 1)).toBe(true);
    expect(gte(3, 3)).toBe(true);
    expect(gte('def', 'abc')).toBe(true);
    expect(gte('def', 'def')).toBe(true);
  });

  it('should return `false` if `value` is less than `other`', () => {
    expect(gte(1, 3)).toBe(false);
    expect(gte('abc', 'def')).toBe(false);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(gte).toEqualTypeOf<typeof gteLodash>();
  });
});
