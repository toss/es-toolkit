import { describe, expect, it } from 'vitest';
import { zipObject } from './zipObject.ts';
import { pipe } from '../pipe.ts';

describe('zipObject', () => {
  it('works in a pipe', () => {
    expect(pipe(['a', 'b'] as const, zipObject([1, 2]))).toEqual({ a: 1, b: 2 });
  });
});
