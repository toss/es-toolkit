import { describe, expect, expectTypeOf, it } from 'vitest';
import type { functionsIn as functionsInLodash } from 'lodash';
import { functionsIn } from './functionsIn';
import { identity } from '../../function/identity';
import { noop } from '../../function/noop';

describe('functionsIn', () => {
  function Foo(this: any) {
    this.a = function () {
      return 'a';
    };
    this.b = function () {
      return 'b';
    };
  }

  Foo.prototype.c = function () {
    return 'c';
  };

  it('should return the function property names of an object', () => {
    // eslint-disable-next-line
    // @ts-ignore
    expect(functionsIn(new Foo())).toEqual(['a', 'b', 'c']);
  });

  it('should return an empty array for non objects', () => {
    const values = [null, undefined, 1, 'abc', true, Symbol('test')];
    const expected = values.map(() => []);

    const actual = values.map(value => functionsIn(value));

    expect(actual).toEqual(expected);
  });

  it('should include inherited functions', () => {
    function Bar(this: any) {
      this.a = function () {
        return 'a';
      };
    }

    Bar.prototype.b = function () {
      return 'b';
    };

    // eslint-disable-next-line
    // @ts-ignore
    const bar = new Bar();

    expect(functionsIn(bar)).toEqual(['a', 'b']);
  });

  it('should work with plain objects', () => {
    const object = {
      a: function () {
        return 'a';
      },
      b: function () {
        return 'b';
      },
    };

    expect(functionsIn(object)).toEqual(['a', 'b']);
  });

  it('should return the function names of an object', () => {
    const object = { a: 'a', b: identity, c: /x/, d: noop };
    const actual = functionsIn(object).sort();

    expect(actual).toEqual(['b', 'd']);
  });

  it('should not include inherited functions', () => {
    function Foo() {
      // eslint-disable-next-line
      // @ts-ignore
      this.a = identity;
      // eslint-disable-next-line
      // @ts-ignore
      this.b = 'b';
    }
    Foo.prototype.c = noop;

    // eslint-disable-next-line
    // @ts-ignore
    expect(functionsIn(new Foo())).toEqual(['a', 'c']);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(functionsIn).toEqualTypeOf<typeof functionsInLodash>();
  });
});
