import { describe, expect, it } from 'vitest';
import { identity, isObject, mergeWith } from '..';
import _ from '..';
import { curry } from './curry';
import { partialRight } from './partialRight';

describe('partialRight', () => {
  const { placeholder } = partialRight;

  it('should partially apply arguments', () => {
    const par = partialRight(identity, 'a');
    expect(par()).toBe('a');
  });

  it('should create a function that can be invoked with additional arguments', () => {
    const fn = function (a: string, b: string) {
      return [a, b];
    };
    const par = partialRight(fn, 'a');
    expect(par('b')).toEqual(['b', 'a']);
  });

  it('should work when there are no partially applied arguments and the created function is invoked without additional arguments', () => {
    const fn = function () {
      return arguments.length;
    };
    const par = partialRight(fn);
    expect(par()).toBe(0);
  });

  it('should work when there are no partially applied arguments and the created function is invoked with additional arguments', () => {
    const par = partialRight(identity);
    expect(par('a')).toBe('a');
  });

  it('should support placeholders', () => {
    const fn = function () {
      // eslint-disable-next-line prefer-rest-params
      return Array.from(arguments);
    };
    const par = partialRight(fn, placeholder, 'b', placeholder) as any;
    expect(par('a', 'c')).toEqual(['a', 'b', 'c']);
    expect(par('a')).toEqual(['a', 'b', undefined]);
    expect(par()).toEqual([undefined, 'b', undefined]);

    const par2 = partialRight(fn, placeholder, 'c', placeholder) as any;
    expect(par2('a', 'b', 'd')).toEqual(['a', 'b', 'c', 'd']);
  });

  it('should create a function with a length of 0', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fn = function (_a: string, _b: string, _c: string) {};
    const par = partialRight(fn, 'a');
    expect(par.length).toBe(0);
  });

  it('should ensure `new par` is an instance of `func`', () => {
    function Foo(value: unknown) {
      return value && object;
    }

    const object = {};
    const par = partialRight(Foo);

    // @ts-expect-error - par is a constructor
    expect(new par() instanceof Foo).toBe(true);
    // @ts-expect-error - par is a constructor
    expect(new par(true)).toBe(object);
  });

  it('should clone metadata for created functions', () => {
    function greet(greeting: string, name: string) {
      return `${greeting} ${name}`;
    }

    const par1 = partialRight(greet, 'hi');
    const par2 = partialRight(par1, 'barney');
    const par3 = partialRight(par1, 'pebbles');

    expect(par1('fred')).toBe('fred hi');
    expect(par2()).toBe('barney hi');
    expect(par3()).toBe('pebbles hi');
  });

  it('should work with curried functions', () => {
    const fn = function (a: any, b: any, c: any) {
      return a + b + c;
    };
    const curried = curry(partialRight(fn, 1), 2);

    expect(curried(2, 3)).toBe(6);
    expect(curried(2)(3)).toBe(6);
  });

  it('should work with placeholders and curried functions', () => {
    const fn = function () {
      // eslint-disable-next-line prefer-rest-params
      return Array.from(arguments);
    };
    const curried = curry(fn);
    const par = partialRight(curried, placeholder, 'b', placeholder, 'd');

    expect(par('a', 'c')).toEqual(['a', 'b', 'c', 'd']);
  });

  it('should work as a deep defaults', () => {
    const object = { a: { b: 2 } };
    const source = { a: { b: 3, c: 3 } };
    const expected = { a: { b: 2, c: 3 } };

    const defaultsDeep = partialRight(mergeWith, function deep(value: any, other: any) {
      return isObject(value) ? mergeWith(value, other, deep) : value;
    }) as any;

    expect(defaultsDeep(object, source)).toEqual(expected);
  });

  it('should work with default values', () => {
    const fn = function (a: any, b: any, c: any) {
      return a + b + c;
    };
    const par = partialRight(fn, _, 'b', _);
    expect(par('a', 'c')).toBe('abc');
  });
});
