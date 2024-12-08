import { describe, expect, it } from 'vitest';
import { once } from '../../function';

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
});
