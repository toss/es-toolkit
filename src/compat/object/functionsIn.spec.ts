import { describe, expect, it } from 'vitest';
import { functionsIn } from './functionsIn';

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
});
