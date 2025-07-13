import { describe, expect, expectTypeOf, it } from 'vitest';
import { functions } from 'es-toolkit/compat';
import { identity } from 'es-toolkit/compat';
import { noop } from 'es-toolkit/compat';
import type { functions as functionsLodash } from 'lodash';

describe('functions', () => {
  it('should return the function names of an object', () => {
    const object = { a: 'a', b: identity, c: /x/, d: noop };
    const actual = functions(object).sort();

    expect(actual).toEqual(['b', 'd']);
  });

  it('should not include inherited functions', () => {
    function Foo(this: { a: typeof identity; b: string }) {
      this.a = identity;
      this.b = 'b';
    }
    Foo.prototype.c = noop;
    // @ts-expect-error - Foo is a constructor
    expect(functions(new Foo())).toEqual(['a']);
  });

  it('should return an empty array for null', () => {
    expect(functions(null)).toEqual([]);
  });

  it('should return an empty array for undefined', () => {
    expect(functions(undefined)).toEqual([]);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(functions).toEqualTypeOf<typeof functionsLodash>();
  });
});
