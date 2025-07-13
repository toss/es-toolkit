import { describe, expect, expectTypeOf, it } from 'vitest';
import { transform } from 'es-toolkit/compat';
import { every } from 'es-toolkit/compat';
import { forEach } from 'es-toolkit/compat';
import { map } from 'es-toolkit/compat';
import { isArray } from 'es-toolkit/compat';
import { isPlainObject } from 'es-toolkit/compat';
import { constant } from 'es-toolkit/compat';
import { stubFalse } from 'es-toolkit/compat';
import { stubObject } from 'es-toolkit/compat';
import { stubTrue } from 'es-toolkit/compat';
import { toPlainObject } from 'es-toolkit/compat';
import type { transform as transformLodash } from 'lodash';
import { noop } from '../../function';
import { falsey } from '../_internal/falsey';
import { typedArrays } from '../_internal/typedArrays';

const freeGlobal = typeof global === 'object' && global && global.Object === Object && global;
const freeSelf = typeof self === 'object' && self && self.Object === Object && self;
const root = freeGlobal || freeSelf || Function('return this')();

function square(n: number): number {
  return n * n;
}

describe('transform', () => {
  function Foo(this: any) {
    this.a = 1;
    this.b = 2;
    this.c = 3;
  }

  it('should create an object with the same `[[Prototype]]` as `object` when `accumulator` is nullish', () => {
    // eslint-disable-next-line no-sparse-arrays
    const accumulators = [, null, undefined];
    // @ts-expect-error - This is a test
    let object = new Foo();
    let expected: any = map(accumulators, stubTrue);

    const iteratee = function (result: any, value: any, key: any) {
      result[key] = square(value);
    };

    const mapper = function (accumulator: any, index: number) {
      return index ? transform(object, iteratee, accumulator) : transform(object, iteratee);
    };

    const results = map(accumulators, mapper);

    let actual: any = map(results, result => result instanceof Foo);

    expect(actual).toEqual(expected);

    expected = map(accumulators, constant({ a: 1, b: 4, c: 9 }));
    actual = map(results, toPlainObject);

    expect(actual).toEqual(expected);

    object = { a: 1, b: 2, c: 3 };
    actual = map(accumulators, mapper);

    expect(actual).toEqual(expected);

    object = [1, 2, 3];
    expected = map(accumulators, constant([1, 4, 9]));
    actual = map(accumulators, mapper);

    expect(actual).toEqual(expected);
  });

  it('should create regular arrays from typed arrays', () => {
    const expected = map(typedArrays, stubTrue);

    const actual = map(typedArrays, type => {
      const Ctor = root[type];
      const array = Ctor ? new Ctor(new ArrayBuffer(24)) : [];

      return isArray(transform(array, noop));
    });

    expect(actual).toEqual(expected);
  });

  it('should support an `accumulator` value', () => {
    // @ts-expect-error - Just for testing
    const values = [new Foo(), [1, 2, 3], { a: 1, b: 2, c: 3 }];
    let expected: any = map(values, constant([1, 4, 9]));

    let actual: any = map(values, value =>
      transform(
        value,
        (result: any, value: any) => {
          result.push(square(value));
        },
        []
      )
    );

    expect(actual).toEqual(expected);

    const object = { a: 1, b: 4, c: 9 };
    expected = [object, { 0: 1, 1: 4, 2: 9 }, object];

    actual = map(values, value =>
      transform(
        value,
        (result: any, value: any, key: any) => {
          result[key] = square(value);
        },
        {}
      )
    );

    expect(actual).toEqual(expected);

    forEach([[], {}], accumulator => {
      const actual = map(values, value => transform(value, noop, accumulator));

      expect(every(actual, result => result === accumulator));

      // @ts-expect-error - Just for testing
      expect(transform(null, null, accumulator)).toBe(accumulator);
    });
  });

  it('should treat sparse arrays as dense', () => {
    const actual = transform(Array(1), (result: any, value: any, index: any) => {
      result[index] = String(value);
    });

    expect(actual).toEqual(['undefined']);
  });

  it('should work without an `iteratee`', () => {
    // @ts-expect-error - Just for testing
    expect(transform(new Foo()) instanceof Foo);
  });

  it('should ensure `object` is an object before using its `[[Prototype]]`', () => {
    const Ctors = [Boolean, Boolean, Number, Number, Number, String, String];
    const values = [false, true, 0, 1, NaN, '', 'a'];
    let expected: any = map(values, stubObject);

    // @ts-expect-error - Just for testing
    const results = map(values, value => transform(value));

    expect(results).toEqual(expected);

    expected = map(values, stubFalse);

    const actual = map(results, (value, index) => value instanceof Ctors[index]);

    expect(actual).toEqual(expected);
  });

  it('should ensure `object` constructor is a function before using its `[[Prototype]]`', () => {
    Foo.prototype.constructor = null;
    // @ts-expect-error - Just for testing
    expect(transform(new Foo()) instanceof Foo).toBe(false);
    Foo.prototype.constructor = Foo;
  });

  it('should create an empty object when given a falsey `object`', () => {
    const expected = map(falsey, stubObject);

    // @ts-expect-error - Just for testing
    const actual = map(falsey, (object, index) => (index ? transform(object) : transform()));

    expect(actual).toEqual(expected);
  });

  forEach(
    {
      array: [1, 2, 3],
      object: { a: 1, b: 2, c: 3 },
    },
    (object, key) => {
      it(`should provide correct \`iteratee\` arguments when transforming an ${key}`, () => {
        let args: any = null;
        transform(object, function (..._args) {
          if (args == null) {
            args = _args;
          }
        });
        const first = args[0];
        if (key === 'array') {
          expect(first !== object).toBe(true);
          expect(isArray(first)).toBe(true);
          expect(args).toEqual([first, 1, 0, object]);
        } else {
          expect(first !== object).toBe(true);
          expect(isPlainObject(first)).toBe(true);
          expect(args).toEqual([first, 1, 'a', object]);
        }
      });
    }
  );

  it(`can exit early when iterating arrays`, () => {
    const array = [1, 2, 3];
    const values: any[] = [];

    transform(array, (value, other) => {
      values.push(isArray(value) ? other : value);
      return false;
    });

    expect(values).toEqual([1]);
  });

  it(`can exit early when iterating objects`, () => {
    const object = { a: 1, b: 2, c: 3 };
    const values: any[] = [];

    transform(object, (value, other) => {
      values.push(isArray(value) ? other : value);
      return false;
    });

    expect(values.length).toBe(1);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(transform).toEqualTypeOf<typeof transformLodash>();
  });
});
