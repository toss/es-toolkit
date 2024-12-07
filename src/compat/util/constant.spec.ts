import { describe, expect, it } from 'vitest';
import { constant } from './constant';
import { stubTrue } from './stubTrue';
import { empties } from '../_internal/empties';
import { falsey } from '../_internal/falsey';
import * as esToolkit from '../index';

describe('constant', () => {
  it('should create a function that returns `value`', () => {
    const object = { a: 1 };
    const values = Array(2).concat(empties, true, 1, 'a');
    const _constant = constant(object);

    const results = values.map((value, index) => {
      if (index < 2) {
        return index ? _constant.call({}) : _constant();
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return _constant(value);
    });

    expect(esToolkit.every(results, result => result === object));
  });

  it('should work with falsey values', () => {
    const expected = falsey.map(stubTrue);

    const actual = falsey.map((value, index) => {
      const _constant = index ? constant(value) : constant();
      const result = _constant();

      return result === value || (result !== result && value !== value);
    });

    expect(actual).toEqual(expected);
  });

  // Chaining is out of scope for es-toolkit

  // it('should return a wrapped value when chaining', () => {
  //   const wrapped = _(true).constant();
  //   expect(wrapped instanceof _);
  // });
});
