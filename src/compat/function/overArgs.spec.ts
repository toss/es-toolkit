import { describe, expect, it } from 'vitest';
import { overArgs } from './overArgs';
import { doubled } from '../_internal/doubled';
import { slice } from '../_internal/slice';
import { square } from '../_internal/square';
import { identity, noop } from '../compat';

describe('overArgs', () => {
  function fn() {
    return slice.call(arguments);
  }

  it('should transform each argument', () => {
    const over = overArgs(fn, doubled, square);
    expect(over(5, 10)).toEqual([10, 100]);
  });

  it('should use `_.identity` when a predicate is nullish', () => {
    const over = overArgs(fn, undefined, null);
    expect(over('a', 'b')).toEqual(['a', 'b']);
  });

  it('should work with `_.property` shorthands', () => {
    const over = overArgs(fn, 'b', 'a');
    expect(over({ b: 2 }, { a: 1 })).toEqual([2, 1]);
  });

  it('should work with `_.matches` shorthands', () => {
    const over = overArgs(fn, { b: 1 }, { a: 1 });
    expect(over({ b: 2 }, { a: 1 })).toEqual([false, true]);
  });

  it('should work with `_.matchesProperty` shorthands', () => {
    const over = overArgs(fn, [
      ['b', 1],
      ['a', 1],
    ]);
    expect(over({ b: 2 }, { a: 1 })).toEqual([false, true]);
  });

  it('should differentiate between `_.property` and `_.matchesProperty` shorthands', () => {
    let over = overArgs(fn, ['a', 1]);
    expect(over({ a: 1 }, { 1: 2 })).toEqual([1, 2]);

    over = overArgs(fn, [['a', 1]]);
    expect(over({ a: 1 })).toEqual([true]);
  });

  it('should flatten `transforms`', () => {
    const over = overArgs(fn, [doubled, square], String);
    expect(over(5, 10, 15)).toEqual([10, 100, '15']);
  });

  it('should not transform any argument greater than the number of transforms', () => {
    const over = overArgs(fn, doubled, square);
    expect(over(5, 10, 18)).toEqual([10, 100, 18]);
  });

  it('should not transform any arguments if no transforms are given', () => {
    const over = overArgs(fn);
    expect(over(5, 10, 18)).toEqual([5, 10, 18]);
  });

  it('should not pass `undefined` if there are more transforms than arguments', () => {
    const over = overArgs(fn, doubled, identity);
    expect(over(5)).toEqual([10]);
  });

  it('should provide the correct argument to each transform', () => {
    const argsList: any[] = [];
    const transform = function () {
      argsList.push(slice.call(arguments));
    };
    const over = overArgs(noop, transform, transform, transform);

    over('a', 'b');
    expect(argsList).toEqual([['a'], ['b']]);
  });

  it('should use `this` binding of function for `transforms`', () => {
    type TestContext = { over: any; true: number };

    const over = overArgs(
      function (this: TestContext, x: keyof TestContext) {
        return this[x];
      },
      function (this: TestContext, x: TestContext) {
        return this === x;
      }
    );

    const object = { over: over, true: 1 };
    expect(object.over(object)).toBe(1);
  });
});
