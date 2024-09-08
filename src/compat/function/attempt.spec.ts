import { describe, it, expect } from 'vitest';
import { attempt } from './attempt';
import { isEqual } from '../../predicate/isEqual';

describe('attempt', () => {
  const errors = [
    new Error(),
    new EvalError(),
    new RangeError(),
    new ReferenceError(),
    new SyntaxError(),
    new TypeError(),
    new URIError(),
  ];

  class CustomError extends Error {
    name: string;
    message: string;

    constructor(message: string) {
      super();
      this.name = 'CustomError';
      this.message = message;
    }
  }

  it('should return the result of `func`', () => {
    expect(attempt(() => 'x')).toBe('x');
  });

  it('should provide additional arguments to `func`', () => {
    const actual = attempt(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      function (_a: unknown, _b: unknown) {
        // eslint-disable-next-line prefer-rest-params
        return Array.from(arguments);
      },
      1,
      2
    );
    expect(actual).toEqual([1, 2]);
  });

  it('should return the caught error', () => {
    const expected = errors.map(() => true);

    const actual = errors.map(
      error =>
        attempt(() => {
          throw error;
        }) === error
    );

    expect(actual).toEqual(expected);
  });

  it('should coerce errors to error objects', () => {
    const actual = attempt(() => {
      throw 'x';
    });
    expect(isEqual(actual, Error('x'))).toBeTruthy();
  });

  it('should preserve custom errors', () => {
    const actual = attempt(() => {
      throw new CustomError('x');
    });
    expect(actual instanceof CustomError);
  });
});
