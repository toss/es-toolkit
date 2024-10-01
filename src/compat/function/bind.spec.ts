import { describe, expect, it } from 'vitest';
import { bind } from './bind';
import { isEqual } from '../../predicate/isEqual';

// eslint-disable-next-line
function fn(this: any, ..._: any[]) {
  const result = [this];
  // eslint-disable-next-line prefer-rest-params
  return result.concat(Array.from(arguments));
}

describe('bind', () => {
  it('should bind a function to an object', () => {
    const object = {},
      bound = bind(fn, object);

    expect(bound('a')).toEqual([object, 'a']);
  });

  it('should accept a falsey `thisArg`', () => {
    const values = [false, 0, '', NaN, null, undefined];
    const expected = values.map(value => [value]);

    const actual = values.map(value => {
      const bound = bind(fn, value);
      return bound();
    });

    expect(
      actual.every((value, index) => {
        return isEqual(value, expected[index]);
      })
    ).toBe(true);
  });

  it('should bind a function to nullish values', () => {
    const bound = bind(fn, null);
    const actual = bound('a');

    expect(actual[0] === null);
    expect(actual[1]).toBe('a');

    const bound2 = bind(fn, undefined);
    const actual2 = bound2('b');

    expect(actual2[0] === undefined);
    expect(actual2[1]).toBe('b');

    const bound3 = bind(fn);
    const actual3 = bound3('b');

    expect(actual3[0] === undefined);
    expect(actual3[1]).toBe('b');
  });

  it('should partially apply arguments ', () => {
    const object = {};
    let bound = bind(fn, object, 'a');

    expect(bound()).toEqual([object, 'a']);

    bound = bind(fn, object, 'a');
    expect(bound('b')).toEqual([object, 'a', 'b']);

    bound = bind(fn, object, 'a', 'b');
    expect(bound()).toEqual([object, 'a', 'b']);
    expect(bound('c', 'd')).toEqual([object, 'a', 'b', 'c', 'd']);
  });

  it('should support placeholders', () => {
    const object = {};
    const ph = bind.placeholder;
    const bound = bind(fn, object, ph, 'b', ph);

    expect(bound('a', 'c')).toEqual([object, 'a', 'b', 'c']);
    expect(bound('a')).toEqual([object, 'a', 'b', undefined]);
    expect(bound('a', 'c', 'd')).toEqual([object, 'a', 'b', 'c', 'd']);
    expect(bound()).toEqual([object, undefined, 'b', undefined]);
  });

  it('should create a function with a `length` of `0`', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fn = function (_a: unknown, _b: unknown, _c: unknown) {};
    let bound = bind(fn, {});

    expect(bound.length).toBe(0);

    bound = bind(fn, {}, 1);
    expect(bound.length).toBe(0);
  });

  it('should ignore binding when called with the `new` operator', () => {
    function Foo(this: any) {
      return this;
    }

    const bound = bind(Foo, { a: 1 });
    // @ts-expect-error - bound is a constructor
    const newBound = new bound();

    expect(bound().a).toBe(1);
    expect(newBound.a).toBe(undefined);
    expect(newBound instanceof Foo);
  });

  it('should handle a number of arguments when called with the `new` operator', () => {
    function Foo(this: any) {
      return this;
    }

    function Bar() {}

    const thisArg = { a: 1 };
    const boundFoo = bind(Foo, thisArg) as any;
    const boundBar = bind(Bar, thisArg) as any;
    expect([new boundFoo().a, new boundBar().a]).toEqual([undefined, undefined]);
    expect([new boundFoo(1).a, new boundBar(1).a]).toEqual([undefined, undefined]);
    expect([new boundFoo(1, 2).a, new boundBar(1, 2).a]).toEqual([undefined, undefined]);
    expect([new boundFoo(1, 2, 3).a, new boundBar(1, 2, 3).a]).toEqual([undefined, undefined]);
    expect([new boundFoo(1, 2, 3, 4).a, new boundBar(1, 2, 3, 4).a]).toEqual([undefined, undefined]);
    expect([new boundFoo(1, 2, 3, 4, 5).a, new boundBar(1, 2, 3, 4, 5).a]).toEqual([undefined, undefined]);
    expect([new boundFoo(1, 2, 3, 4, 5, 6).a, new boundBar(1, 2, 3, 4, 5, 6).a]).toEqual([undefined, undefined]);
    expect([new boundFoo(1, 2, 3, 4, 5, 6, 7).a, new boundBar(1, 2, 3, 4, 5, 6, 7).a]).toEqual([undefined, undefined]);
    expect([new boundFoo(1, 2, 3, 4, 5, 6, 7, 8).a, new boundBar(1, 2, 3, 4, 5, 6, 7, 8).a]).toEqual([
      undefined,
      undefined,
    ]);
  });

  it('should ensure `new bound` is an instance of `func`', () => {
    function Foo(value: any) {
      return value && object;
    }

    const bound = bind(Foo) as any;
    const object = {};

    expect(new bound() instanceof Foo);
    expect(new bound(true)).toBe(object);
  });

  it('should append array arguments to partially applied arguments', () => {
    const object = {},
      bound = bind(fn, object, 'a');

    expect(bound(['b'], 'c')).toEqual([object, 'a', ['b'], 'c']);
  });

  it('should not rebind functions', () => {
    const object1 = {},
      object2 = {},
      object3 = {};

    const bound1 = bind(fn, object1),
      bound2 = bind(bound1, object2, 'a'),
      bound3 = bind(bound1, object3, 'b');

    expect(bound1()).toEqual([object1]);
    expect(bound2()).toEqual([object1, 'a']);
    expect(bound3()).toEqual([object1, 'b']);
  });

  it('should not error when instantiating bound built-ins', () => {
    let Ctor = bind(Date, null) as any;

    const expected = new Date(2012, 4, 23, 0, 0, 0, 0);
    let actual = new Ctor(2012, 4, 23, 0, 0, 0, 0);
    expect(actual).toEqual(expected);

    Ctor = bind(Date, null, 2012, 4, 23);
    actual = new Ctor(0, 0, 0, 0);
    expect(actual).toEqual(expected);
  });

  it('should not error when calling bound class constructors with the `new` operator', () => {
    const createCtor: any = function () {
      return class A {};
    };

    const bound = bind(createCtor()) as any;
    expect(Boolean(new bound())).toBe(true);
    expect(Boolean(new bound(1))).toBe(true);
    expect(Boolean(new bound(1, 2))).toBe(true);
    expect(Boolean(new bound(1, 2, 3))).toBe(true);
    expect(Boolean(new bound(1, 2, 3, 4))).toBe(true);
    expect(Boolean(new bound(1, 2, 3, 4, 5))).toBe(true);
    expect(Boolean(new bound(1, 2, 3, 4, 5, 6))).toBe(true);
    expect(Boolean(new bound(1, 2, 3, 4, 5, 6, 7))).toBe(true);
  });
});
