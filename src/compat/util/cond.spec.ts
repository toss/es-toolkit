import { describe, expect, expectTypeOf, it } from 'vitest';
import { cond } from 'es-toolkit/compat';
import { property } from 'es-toolkit/compat';
import { matches } from 'es-toolkit/compat';
import { matchesProperty } from 'es-toolkit/compat';
import type { cond as condLodash } from 'lodash';
import { stubFalse, stubTrue } from '../index';

// Utility functions
const stubA = () => 'a';
const stubB = () => 'b';
const stubC = () => 'c';

describe('cond', () => {
  it('should create a conditional function', () => {
    const resultFunc = cond([
      [matches({ a: 1 }), stubA],
      [matchesProperty('b', 1), stubB],
      [property('c'), stubC],
    ]);

    expect(resultFunc({ a: 1, b: 2, c: 3 })).toBe('a');
    expect(resultFunc({ a: 0, b: 1, c: 2 })).toBe('b');
    expect(resultFunc({ a: -1, b: 0, c: 1 })).toBe('c');
  });

  it('should provide arguments to functions', () => {
    let args1: unknown[] = [];
    let args2: unknown[] = [];
    const expected = ['a', 'b', 'c'];

    const resultFunc = cond([
      [
        function (...params: unknown[]) {
          if (!args1.length) {
            args1 = params;
          }
          return true;
        },
        function (...params: unknown[]) {
          if (!args2.length) {
            args2 = params;
          }
        },
      ],
    ]);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    resultFunc('a', 'b', 'c');

    expect(args1).toEqual(expected);
    expect(args2).toEqual(expected);
  });

  it('should work with predicate shorthands', () => {
    const resultFunc = (cond as any)([
      [{ a: 1 }, stubA],
      [['b', 1], stubB],
      ['c', stubC],
    ]);

    expect(resultFunc({ a: 1, b: 2, c: 3 })).toBe('a');
    expect(resultFunc({ a: 0, b: 1, c: 2 })).toBe('b');
    expect(resultFunc({ a: -1, b: 0, c: 1 })).toBe('c');
  });

  it('should return `undefined` when no condition is met', () => {
    const resultFunc = (cond as any)([[stubFalse, stubA]]);
    expect(resultFunc({ a: 1 })).toBe(undefined);
  });

  it('should throw a TypeError if `pairs` is not composed of functions', () => {
    [false, true].forEach(value => {
      expect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        cond([[stubTrue, value]])();
      }).toThrow(TypeError);
    });
  });

  it('should use `this` binding of function for `pairs`', () => {
    const resultFunc = (cond as any)([
      [
        function (this: Record<string, unknown>, a: string) {
          return this[a];
        },
        function (this: Record<string, unknown>, a: string, b: string) {
          return this[b];
        },
      ],
    ]);

    const object = { resultFunc, a: 1, b: 2 };
    expect(object.resultFunc('a', 'b')).toBe(2);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(cond).toEqualTypeOf<typeof condLodash>();
  });
});
