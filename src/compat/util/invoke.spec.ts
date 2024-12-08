import { describe, expect, it } from 'vitest';
import { constant } from './constant';
import { invoke } from './invoke';
import { noop } from '../../function/noop';
import { stubA } from '../_internal/stubA';
import { stubB } from '../_internal/stubB';
import { forEach } from '../array/forEach';
import { map } from '../array/map';

describe('invoke', () => {
  it('should invoke a method on `object`', () => {
    const object = { a: constant('A') };
    const actual = invoke(object, 'a');

    expect(actual).toBe('A');
  });

  it('should support invoking with arguments', () => {
    const object = {
      a: function (a: any, b: any) {
        return [a, b];
      },
    };
    const actual = invoke(object, 'a', [1, 2]);

    expect(actual).toEqual([1, 2]);
  });

  it('should not error on nullish elements', () => {
    const values = [null, undefined];
    const expected = map(values, noop);

    const actual = map(values, value => {
      return invoke(value, 'a.b', [1, 2]);
    });

    expect(actual).toEqual(expected);
  });

  it('should preserve the sign of `0`', () => {
    const object = { '-0': stubA, 0: stubB };
    const props = [-0, Object(-0), 0, Object(0)];

    const actual = map(props, key => invoke(object, key));

    expect(actual).toEqual(['a', 'a', 'b', 'b']);
  });

  it('should support deep paths', () => {
    const object = {
      a: {
        b: function (a: any, b: any) {
          return [a, b];
        },
      },
    };

    forEach(['a.b', ['a', 'b']], path => {
      const actual = invoke(object, path, [1, 2]);
      expect(actual).toEqual([1, 2]);
    });
  });

  it('should invoke deep property methods with the correct `this` binding', () => {
    const object = {
      a: {
        b: function () {
          return this.c;
        },
        c: 1,
      },
    };

    forEach(['a.b', ['a', 'b']], path => {
      expect(invoke(object, path)).toEqual(1);
    });
  });

  it('should return `undefined` when resolving deep paths on nullish values', () => {
    const object = { a: null };
    expect(invoke(object, 'a.b')).toBeUndefined();
  });
});
