import { describe, it, expect } from 'vitest';
import { bindKey } from './bindKey';

describe('bindKey', () => {
  it('should work when the target function is overwritten', () => {
    const object = {
      user: 'fred',
      greet: function (greeting: string) {
        return `${this.user} says: ${greeting}`;
      },
    };

    const bound = bindKey(object, 'greet', 'hi');
    expect(bound()).toBe('fred says: hi');

    object.greet = function (greeting) {
      return `${this.user} says: ${greeting}!`;
    };

    expect(bound()).toBe('fred says: hi!');
  });

  it('should support placeholders', () => {
    const object = {
      fn: function () {
        // eslint-disable-next-line prefer-rest-params
        return Array.from(arguments);
      },
    };

    const ph = bindKey.placeholder,
      bound = bindKey(object, 'fn', ph, 'b', ph);

    expect(bound('a', 'c')).toEqual(['a', 'b', 'c']);
    expect(bound('a')).toEqual(['a', 'b', undefined]);
    expect(bound('a', 'c', 'd')).toEqual(['a', 'b', 'c', 'd']);
    expect(bound()).toEqual([undefined, 'b', undefined]);
  });

  it('should ensure `new bound` is an instance of `object[key]`', () => {
    function Foo(value: any) {
      return value && object;
    }

    const object = { Foo: Foo };
    const bound = bindKey(object, 'Foo');

    // @ts-expect-error - bound is a constructor
    expect(new bound() instanceof Foo).toBe(true);
    // @ts-expect-error - bound is a constructor
    expect(new bound(true)).toBe(object as any);
  });
});
