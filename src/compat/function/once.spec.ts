import { describe, expect, expectTypeOf, it } from 'vitest';
import { once } from 'es-toolkit/compat';
import type { once as onceLodash } from 'lodash';

describe('once', () => {
  it('should invoke `func` once', () => {
    let count = 0;
    const resultFunc = once(() => ++count);

    expect(resultFunc()).toBe(1);
    expect(count).toBe(1);
  });

  it('should ignore recursive calls', () => {
    let count = 0;

    const resultFunc = once(() => {
      resultFunc();
      return ++count;
    });

    expect(resultFunc()).toBe(1);
    expect(count).toBe(1);
  });

  it('should not throw more than once', () => {
    const resultFunc = once(() => {
      throw new Error();
    });

    expect(resultFunc).toThrow();
    expect(resultFunc).not.toThrow();
  });

  it('should match the type of lodash', () => {
    expectTypeOf(once).toEqualTypeOf<typeof onceLodash>();
  });
});
