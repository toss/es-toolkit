import { describe, expect, it } from 'vitest';
import { ary } from './ary';
import { flow } from './flow';
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

describe('flow', () => {
  it(`\`flow\` should supply each function with the return value of the previous`, () => {
    const fixed = function (n: number) {
      return n.toFixed(1);
    };
    const combined = flow(add, square, fixed);

    expect(combined(1, 2)).toBe('9.0');
  });

  it(`\`flow\` should return a new function`, () => {
    const noop = () => {};
    const combined = flow(noop);
    expect(combined).not.toBe(noop);
  });

  it(`\`flow\` should work with a curried function and \`_.head\``, () => {
    const curried = curry((i: any) => i);

    const combined = flow(head, curried);

    expect(combined([1])).toBe(1);
  });

  it(`\`flow\` should work with curried functions with placeholders`, () => {
    const curried = curry(ary(map, 2), 2);
    const getProp = curried(curried.placeholder, (value: { a: any }) => value.a);
    const objects = [{ a: 1 }, { a: 2 }, { a: 1 }];

    const combined = flow(getProp, uniq);

    expect(combined(objects)).toEqual([1, 2]);
  });

  it(`\`flow\` should throw an error if a function is not passed`, () => {
    expect(() => {
      flow(null as any);
    }).toThrow();
  });

  it(`\`flow\` should flatten funcs`, () => {
    const fixed = function (n: number) {
      return n.toFixed(1);
    };
    const combined = flow([add, square], fixed);

    expect(combined(1, 2)).toBe('9.0');
  });
});
