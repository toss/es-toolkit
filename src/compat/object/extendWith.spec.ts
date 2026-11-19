import { describe, expect, it } from 'vitest';
import { assignInWith } from './assignInWith';
import { extendWith } from './extendWith';

describe('extendWith', () => {
  it('should be an alias of assignInWith', () => {
    expect(extendWith).toBe(assignInWith);
  });

  it('should assign a customizer result of `null`', () => {
    expect(extendWith({ a: 1 }, { b: 2 }, () => null)).toEqual({ a: 1, b: null });
  });
});
