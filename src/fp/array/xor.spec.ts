import { describe, expect, it } from 'vitest';
import { xor } from './xor.ts';
import { pipe } from '../pipe.ts';

describe('xor', () => {
  it('works in a pipe', () => {
    expect(pipe([1, 2], xor([2, 3]))).toEqual([1, 3]);
  });
});
