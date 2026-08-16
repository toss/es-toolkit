import { describe, expect, it } from 'vitest';
import { union } from './union.ts';
import { pipe } from '../pipe.ts';

describe('union', () => {
  it('works in a pipe', () => {
    expect(pipe([1, 2], union([2, 3]))).toEqual([1, 2, 3]);
  });
});
