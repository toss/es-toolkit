import { describe, expect, expectTypeOf, it } from 'vitest';
import { iteratee } from 'es-toolkit/compat';
import { stubFalse } from 'es-toolkit/compat';
import type { iteratee as iterateeLodash } from 'lodash';
import { slice } from '../_internal/slice';
import { partial, partialRight } from '../index';
import * as esToolkit from '../index';

describe('iteratee', () => {
  it('should provide arguments to `func`', () => {
    const fn = function () {
      // eslint-disable-next-line prefer-rest-params
      return slice.call(arguments);
    };
    const iterateeFn = iteratee(fn);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const actual = iterateeFn('a', 'b', 'c', 'd', 'e', 'f');

    expect(actual).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
  });

  it('should return `_.identity` when `func` is nullish', () => {
    const object = {};
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined];
    const expected = values.map(esToolkit.constant(object));

    const actual = values.map((value, index) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const identity = index ? iteratee(value) : iteratee();
      return identity(object);
    });

    expect(actual).toEqual(expected);
  });

  it('should return an iteratee created by `_.matches` when `func` is an object', () => {
    const matches = iteratee({ a: 1, b: 2 });
    expect(matches({ a: 1, b: 2, c: 3 })).toBe(true);
    expect(matches({ b: 2 })).toBe(false);
  });

  it('should not change `_.matches` behavior if `source` is modified', () => {
    const sources: any[] = [{ a: { b: 2, c: 3 } }, { a: 1, b: 2 }, { a: 1 }];

    sources.forEach((source, index) => {
      const object = esToolkit.cloneDeep(source);
      const matches = iteratee(source);

      expect(matches(object)).toBe(true);

      if (index) {
        source.a = 2;
        source.b = 1;
        source.c = 3;
      } else {
        source.a.b = 1;
        source.a.c = 2;
        source.a.d = 3;
      }
      expect(matches(object)).toBe(true);
      expect(matches(source)).toBe(false);
    });
  });

  it('should return an iteratee created by `_.matchesProperty` when `func` is an array', () => {
    const array = ['a', undefined];
    let matches = iteratee([0, 'a']);

    expect(matches(array)).toBe(true);

    matches = iteratee(['0', 'a']);
    expect(matches(array)).toBe(true);

    matches = iteratee([1, undefined]);
    expect(matches(array)).toBe(true);
  });

  it('should support deep paths for `_.matchesProperty` shorthands', () => {
    const object = { a: { b: { c: 1, d: 2 } } };
    const matches = iteratee(['a.b', { c: 1 }]);

    expect(matches(object)).toBe(true);
  });

  it('should not change `_.matchesProperty` behavior if `source` is modified', () => {
    const sources: any[] = [{ a: { b: 2, c: 3 } }, { a: 1, b: 2 }, { a: 1 }];

    sources.forEach((source, index) => {
      const object = { a: esToolkit.cloneDeep(source) };
      const matches = iteratee(['a', source]);

      expect(matches(object)).toBe(true);

      if (index) {
        source.a = 2;
        source.b = 1;
        source.c = 3;
      } else {
        source.a.b = 1;
        source.a.c = 2;
        source.a.d = 3;
      }
      expect(matches(object)).toBe(true);
      expect(matches({ a: source })).toBe(false);
    });
  });

  it('should return an iteratee created by `_.property` when `func` is a number or string', () => {
    const array = ['a'];
    let prop = iteratee(0);

    expect(prop(array)).toBe('a');

    prop = iteratee('0');
    expect(prop(array)).toBe('a');
  });

  it('should support deep paths for `_.property` shorthands', () => {
    const object = { a: { b: 2 } };
    const prop = iteratee('a.b');

    expect(prop(object)).toBe(2);
  });

  it('should work with functions created by `_.partial` and `_.partialRight`', () => {
    const fn = function (this: any) {
      const result = [this.a];
      // eslint-disable-next-line prefer-rest-params
      Array.prototype.push.apply(result, arguments as any);
      return result;
    };

    const expected = [1, 2, 3];
    const object = { a: 1, iteratee: iteratee(partial(fn, 2)) };

    // eslint-disable-next-line
    // @ts-ignore
    expect(object.iteratee(3)).toEqual(expected);

    object.iteratee = iteratee(partialRight(fn, 3));
    // eslint-disable-next-line
    // @ts-ignore
    expect(object.iteratee(2)).toEqual(expected);
  });

  // it('should use internal `iteratee` if external is unavailable', () => {
  //   const iteratee = _.iteratee;
  //   delete _.iteratee;

  //   expect(map([{ a: 1 }], 'a')).toEqual([1]);

  //   _.iteratee = iteratee;
  // });

  it('should work as an iteratee for methods like `_.map`', () => {
    const fn = function (this: any) {
      return this instanceof Number;
    };
    const array = [fn, fn, fn];
    const iteratees = array.map(iteratee);
    const expected = array.map(stubFalse);

    const actual = iteratees.map(iteratee => iteratee());

    expect(actual).toEqual(expected);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(iteratee).toEqualTypeOf<typeof iterateeLodash>();
  });
});
