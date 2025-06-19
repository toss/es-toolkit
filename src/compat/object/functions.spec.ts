import { describe, expect, it, expectTypeOf } from 'vitest';
import type { functions as functionsLodash } from 'lodash';
import { functions } from './functions';
import { identity } from '../../function/identity';
import { noop } from '../../function/noop';

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
