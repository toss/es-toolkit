import { describe, expect, it } from 'vitest';
import { flip } from './flip';

describe('flip', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function fn(a: any, b: any, c: any, d: any) {
    // eslint-disable-next-line prefer-rest-params
    return Array.from(arguments);
  }

  it('should flip arguments provided to `func`', () => {
    const flipped = flip(fn);
    expect(flipped('a', 'b', 'c', 'd')).toEqual(['d', 'c', 'b', 'a']);
  });
});
