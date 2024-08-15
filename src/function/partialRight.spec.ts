import { describe, it, expect } from 'vitest';
import { partialRight } from './partialRight';

function identity(arg?: any): any {
  return arg;
}

describe('partialRight', () => {
  const { placeholder } = partialRight;
  it('partialRight partially applies arguments', () => {
    const par = partialRight(identity, 'a');
    expect(par()).toBe('a');
  });

  it('partialRight creates a function that can be invoked with additional arguments', () => {
    const fn = function (a?: string, b?: string) {
      return [a, b];
    };
    const par = partialRight(fn, 'a');
    expect(par('b')).toEqual(['b', 'a']);
  });

  it('partialRight works when there are no partially applied arguments and the created function is invoked without additional arguments', () => {
    const fn = function () {
      return arguments.length;
    };
    const par = partialRight(fn);
    expect(par()).toBe(0);
  });

  it('partialRight works when there are no partially applied arguments and the created function is invoked with additional arguments', () => {
    const par = partialRight(identity);
    expect(par('a')).toBe('a');
  });

  it('partialRight supports placeholders', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fn = function (..._: any[]) {
      // eslint-disable-next-line prefer-rest-params
      return Array.from(arguments);
    };
    let par = partialRight(fn, placeholder, 'b', placeholder);
    expect(par('a', 'c')).toEqual(['a', 'b', 'c']);
    expect(par('a')).toEqual(['a', 'b', undefined]);
    expect(par()).toEqual([undefined, 'b', undefined]);

    par = partialRight(fn, placeholder, 'c', placeholder);
    expect(par('a', 'b', 'd')).toEqual(['a', 'b', 'c', 'd']);
  });

  it('partialRight creates a function with a length of 0', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fn = function (_a: string, _b: string, _c: string) {};
    const par = partialRight(fn, 'a');
    expect(par.length).toBe(0);
  });

  it('partialRight ensures new par is an instance of func', () => {
    function Foo(value: unknown) {
      return value && object;
    }

    const object = {};
    const par = partialRight(Foo);

    // @ts-expect-error - par is a constructor
    expect(new par() instanceof Foo);
    // @ts-expect-error - par is a constructor
    expect(new par(true)).toBe(object);
  });

  it('partialRight clones metadata for created functions', () => {
    function greet(greeting?: string, name?: string) {
      return `${greeting} ${name}`;
    }

    const par1 = partialRight(greet, 'hi');
    const par2 = partialRight(par1, 'barney');
    const par3 = partialRight(par1, 'pebbles');

    expect(par1('fred')).toBe('fred hi');
    expect(par2()).toBe('barney hi');
    expect(par3()).toBe('pebbles hi');
  });
});
