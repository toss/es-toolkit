import { describe, expect, expectTypeOf, it } from 'vitest';
import { flip } from 'es-toolkit/compat';
import type { flip as flipLodash } from 'lodash';

describe('flip', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function fn(a: any, b: any, c: any, d: any) {
    // eslint-disable-next-line prefer-rest-params
    return Array.from(arguments);
  }

  it('should flip arguments provided to `func`', () => {
    const flipped = flip(fn);
    expect(flipped('a', 'b', 'c', 'd')).toEqual(['d', 'c', 'b', 'a']);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(flip).toEqualTypeOf<typeof flipLodash>();
  });
});
