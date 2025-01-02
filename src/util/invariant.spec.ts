import { describe, expect, expectTypeOf, it } from 'vitest';
import { invariant } from './invariant';

describe('invariant', () => {
  it('should not throw an error when the condition is true', () => {
    expect(() => invariant(true, 'This should not throw')).not.toThrow();

    const value1 = 'some value';
    expect(() =>
      invariant(value1 !== null && value1 !== undefined, 'Value should not be null or undefined')
    ).not.toThrow();

    const value2 = null;
    expect(() => invariant(value2 !== null && value2 !== undefined, 'Value should not be null or undefined')).toThrow(
      'Value should not be null or undefined'
    );

    const number = 5;
    expect(() => invariant(number > 0, 'Number must be positive')).not.toThrow();
  });

  it('should throw an error when the condition is false', () => {
    expect(() => invariant(false, 'This should throw')).toThrow('This should throw');

    const value1 = undefined;
    expect(() => invariant(value1 !== null && value1 !== undefined, 'Value should not be null or undefined')).toThrow(
      'Value should not be null or undefined'
    );

    const number = -1;
    expect(() => invariant(number > 0, 'Number must be positive')).toThrow('Number must be positive');
  });

  it('should assert non-null value and treat it as string', () => {
    const value = 'es-toolkit' as string | null;

    invariant(value !== null, 'Value should not be null');

    // Narrow the type.
    expect(value.length).toBe(10);
    expectTypeOf(value).toEqualTypeOf<string>();
  });
});
