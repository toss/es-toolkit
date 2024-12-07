import { describe, expect, it } from 'vitest';
import { ary } from './ary';
import { flowRight } from './flowRight';
import { head } from '../../array/head';
import { uniq } from '../../array/uniq';
import { map } from '../array/map';
import { curry } from '../function/curry';

const add = function (x: number, y: number) {
  return x + y;
};

const square = function (n: number) {
  return n * n;
};

describe('flowRight', () => {
  it(`\`flowRight\` should supply each function with the return value of the previous`, () => {
    const fixed = function (n: number) {
      return n.toFixed(1);
    };
    const combined = flowRight(fixed, square, add);

    expect(combined(1, 2)).toBe('9.0');
  });

  it(`\`flowRight\` should return a new function`, () => {
    const noop = () => {};
    const combined = flowRight(noop);
    expect(combined).not.toBe(noop);
  });

  it(`\`flowRight\` should work with a curried function and \`_.head\``, () => {
    const curried = curry((i: any) => i);

    const combined = flowRight(curried, head);

    expect(combined([1])).toBe(1);
  });

  it(`\`flowRight\` should work with curried functions with placeholders`, () => {
    const curried = curry(ary(map, 2), 2);
    const getProp = curried(curried.placeholder, (value: { a: any }) => value.a);
    const objects = [{ a: 1 }, { a: 2 }, { a: 1 }];

    const combined = flowRight(uniq, getProp);

    expect(combined(objects)).toEqual([1, 2]);
  });

  it(`\`flowRight\` should throw an error if a function is not passed`, () => {
    expect(() => {
      flowRight(null as any);
    }).toThrow();
  });

  it(`\`flowRight\` should flatten funcs`, () => {
    const fixed = function (n: number) {
      return n.toFixed(1);
    };
    const combined = flowRight(fixed, [square, add]);

    expect(combined(1, 2)).toBe('9.0');
  });
});
