import { describe, expect, it } from 'vitest';
import { ary } from './ary';

describe('ary', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function fn(_a: unknown, _b: unknown, _c: unknown) {
    // eslint-disable-next-line prefer-rest-params
    return Array.from(arguments);
  }

  it('should cap the number of arguments provided to `func`', () => {
    const actual = ['6', '8', '10'].map(ary(parseInt, 1));
    expect(actual).toEqual([6, 8, 10]);

    const capped = ary(fn, 2);
    expect(capped('a', 'b', 'c', 'd')).toEqual(['a', 'b']);
  });

  it('should not force a minimum argument count', () => {
    const args = ['a', 'b', 'c'];
    const capped = ary(fn, 3);

    const expected = args.map((arg, index) => args.slice(0, index));
    // eslint-disable-next-line prefer-spread
    const actual = expected.map(array => capped.apply(undefined, array));

    expect(actual).toEqual(expected);
  });

  it('should use `this` binding of function', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const capped = ary(function (this: unknown, _a: unknown, _b: unknown) {
      return this;
    }, 1);
    const object = { capped: capped };

    expect(object.capped()).toBe(object);
  });

  it('should use the existing `ary` if smaller', () => {
    const capped = ary(ary(fn, 1), 2);
    expect(capped('a', 'b', 'c', 'd')).toEqual(['a']);
  });
});
