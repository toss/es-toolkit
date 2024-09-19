import { describe, it, expect } from 'vitest';
import { partial } from './partial';
import { curry } from '../compat/function/curry';

function identity(arg?: any): any {
  return arg;
}

describe('partial', () => {
  const { placeholder } = partial;
  it('partial partially applies arguments', () => {
    const par = partial(identity, 'a');
    expect(par()).toBe('a');
  });

  it('partial creates a function that can be invoked with additional arguments', () => {
    const fn = function (a?: string, b?: string) {
      return [a, b];
    };
    const par = partial(fn, 'a');
    expect(par('b')).toEqual(['a', 'b']);
  });

  it('partial works when there are no partially applied arguments and the created function is invoked without additional arguments', () => {
    const fn = function () {
      return arguments.length;
    };
    const par = partial(fn);
    expect(par()).toBe(0);
  });

  it('partial works when there are no partially applied arguments and the created function is invoked with additional arguments', () => {
    const par = partial(identity);
    expect(par('a')).toBe('a');
  });

  it('partial supports placeholders', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fn = function (..._: any[]) {
      // eslint-disable-next-line prefer-rest-params
      return Array.from(arguments);
    };
    const par = partial(fn, placeholder, 'b', placeholder);
    expect(par('a', 'c')).toEqual(['a', 'b', 'c']);
    expect(par('a')).toEqual(['a', 'b', undefined]);
    expect(par()).toEqual([undefined, 'b', undefined]);

    expect(par('a', 'c', 'd')).toEqual(['a', 'b', 'c', 'd']);
  });

  it('partial creates a function with a length of 0', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fn = function (_a: string, _b: string, _c: string) {};
    const par = partial(fn, 'a');
    expect(par.length).toBe(0);
  });

  it('partial ensures new par is an instance of func', () => {
    function Foo(value: unknown) {
      return value && object;
    }

    const object = {};
    const par = partial(Foo);

    // @ts-expect-error - par is a constructor
    expect(new par() instanceof Foo);
    // @ts-expect-error - par is a constructor
    expect(new par(true)).toBe(object);
  });

  it('partial clones metadata for created functions', () => {
    function greet(greeting?: string, name?: string) {
      return `${greeting} ${name}`;
    }

    const par1 = partial(greet, 'hi');
    const par2 = partial(par1, 'barney');
    const par3 = partial(par1, 'pebbles');

    expect(par1('fred')).toBe('hi fred');
    expect(par2()).toBe('hi barney');
    expect(par3()).toBe('hi pebbles');
  });

  it(`partial should work with curried functions`, () => {
    const fn = function (a: any, b: any, c: any) {
        return a + b + c;
      },
      curried = curry(partial(fn, 1), 2);

    expect(curried(2, 3)).toBe(6);
    expect(curried(2)(3)).toBe(6);
  });

  it('partial should work with placeholders and curried functions', () => {
    const fn = function () {
        // eslint-disable-next-line prefer-rest-params
        return Array.from(arguments);
      },
      curried = curry(fn),
      par = partial(curried, partial.placeholder, 'b', partial.placeholder, 'd');

    expect(par('a', 'c')).toEqual(['a', 'b', 'c', 'd']);
  });
});
