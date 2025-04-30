import { describe, expect, it } from 'vitest';
import * as lodashStable from 'es-toolkit/compat';
import { stubObject } from 'es-toolkit/compat';
import { transform } from './transform';
import { falsey } from '../_internal/falsey';
import { typedArrays } from '../_internal/typedArrays';

describe('transform', () => {
  class Foo {
    a: number;
    b: number;
    c: number;

    constructor() {
      this.a = 1;
      this.b = 2;
      this.c = 3;
    }
  }

  it('should create an object with the same `[[Prototype]]` as `object` when `accumulator` is nullish', () => {
    // eslint-disable-next-line no-sparse-arrays
    const accumulators = [, undefined, null];

    const iteratee = function (result: Record<string | number, number>, value: number, key: string | number) {
      result[key] = value * value;
    };

    const mapper = (object: object | any[]) => {
      return function (accumulator: undefined | null, index: number) {
        return index ? transform(object, iteratee, accumulator) : transform(object, iteratee);
      };
    };

    {
      const object = new Foo();
      const expected = lodashStable.map(accumulators, lodashStable.stubTrue);

      const results = lodashStable.map(accumulators, mapper(object));
      const actual = lodashStable.map(results, result => result instanceof Foo);

      expect(actual).toEqual(expected);
    }

    {
      const object = new Foo();
      const expected = lodashStable.map(accumulators, () => ({ a: 1, b: 4, c: 9 }));

      const results = lodashStable.map(accumulators, mapper(object));
      const actual = lodashStable.map(results, lodashStable.toPlainObject);

      expect(actual).toEqual(expected);
    }

    {
      const object = { a: 1, b: 2, c: 3 };
      const expected = lodashStable.map(accumulators, () => ({ a: 1, b: 4, c: 9 }));
      const actual = lodashStable.map(accumulators, mapper(object));

      expect(actual).toEqual(expected);
    }

    {
      const object = [1, 2, 3];
      const expected = lodashStable.map(accumulators, () => [1, 4, 9]);
      const actual = lodashStable.map(accumulators, mapper(object));

      expect(actual).toEqual(expected);
    }
  });

  it('should create regular arrays from typed arrays', () => {
    const expected = lodashStable.map(typedArrays, lodashStable.stubTrue);

    const actual = lodashStable.map(typedArrays, type => {
      const Ctor = (globalThis as Record<string, any>)[type];
      const array = Ctor ? new Ctor(new ArrayBuffer(24)) : [];

      return lodashStable.isArray(transform(array, lodashStable.noop));
    });

    expect(actual).toEqual(expected);
  });

  it('should support an `accumulator` value', () => {
    const values = [new Foo(), [1, 2, 3], { a: 1, b: 2, c: 3 }];
    const expectedArr = lodashStable.map(values, lodashStable.constant([1, 4, 9]));

    const actualArr = lodashStable.map(values, value =>
      transform(
        value,
        (result: number[], value: number) => {
          result.push(value * value);
        },
        []
      )
    );

    expect(actualArr).toEqual(expectedArr);

    const object = { a: 1, b: 4, c: 9 };
    const expectedObj = [object, { 0: 1, 1: 4, 2: 9 }, object];

    const actualObj = lodashStable.map(values, value =>
      transform(
        value,
        (result: Record<PropertyKey, number>, value: number, key: PropertyKey) => {
          result[key] = value * value;
        },
        {}
      )
    );

    expect(actualObj).toEqual(expectedObj);

    lodashStable.each([[], {}], accumulator => {
      const actual = lodashStable.map(values, value => transform(value, lodashStable.noop, accumulator));

      expect(actual.every(result => result === accumulator)).toBe(true);

      expect(transform([], lodashStable.noop, accumulator)).toBe(accumulator);
    });
  });

  it('should treat sparse arrays as dense', () => {
    const actual = transform(Array(1), (result: string[], value: undefined, index: number) => {
      result[index] = String(value);
    });

    expect(actual).toEqual(['undefined']);
  });

  it('should work without an `iteratee`', () => {
    expect(transform(new Foo()) instanceof Foo).toBe(true);
  });

  it('should ensure `object` is an object before using its `[[Prototype]]`', () => {
    const Ctors = [Boolean, Boolean, Number, Number, Number, String, String];
    const values = [false, true, 0, 1, NaN, '', 'a'];
    const expected = lodashStable.map(values, lodashStable.stubObject);

    const actual = lodashStable.map(values, value => transform(value as unknown as object));
    expect(actual).toEqual(expected);

    const expectedInstanceCheck = lodashStable.map(values, lodashStable.stubFalse);
    const actualInstanceCheck = lodashStable.map(
      values,
      (value, index) => (value as unknown as object) instanceof Ctors[index]
    );
    expect(actualInstanceCheck).toEqual(expectedInstanceCheck);
  });

  it('should ensure `object` constructor is a function before using its `[[Prototype]]`', () => {
    // eslint-disable-next-line
    // @ts-ignore
    Foo.prototype.constructor = null;
    expect(transform(new Foo()) instanceof Foo).toBe(false);
    Foo.prototype.constructor = Foo;
  });

  it('should create an empty object when given a falsey `object`', () => {
    const expected = lodashStable.map(falsey, stubObject);

    const actual = lodashStable.map(falsey, (object, index) => (index ? transform(object as any) : transform()));

    expect(actual).toEqual(expected);
  });

  lodashStable.each(
    {
      array: [1, 2, 3],
      object: { a: 1, b: 2, c: 3 },
    },
    (object, key) => {
      it(`should provide correct \`iteratee\` arguments when transforming an ${key}`, () => {
        let args: any;
        transform(object, function (..._args) {
          args = args || lodashStable.clone(_args);
        });

        const first = args[0];
        if (key === 'array') {
          expect(first !== object && lodashStable.isArray(first)).toBe(true);
          expect(args).toEqual([first, 1, 0, object]);
        } else {
          expect(first !== object && lodashStable.isPlainObject(first)).toBe(true);
          expect(args).toEqual([first, 1, 'a', object]);
        }
      });
    }
  );

  it('should exit early when iteratee returns false', () => {
    const object = [1, 2, 3, 4, 5];
    const expected = [1, 2, 3];
    const actual = transform(
      object,
      (accumulator: number[], value: number) => {
        accumulator.push(value);
        return value < 3;
      },
      []
    );

    expect(actual).toEqual(expected);
  });
});
