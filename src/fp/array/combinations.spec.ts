import { describe, expect, it } from 'vitest';
import { combinations } from './combinations.ts';
import { pipe } from '../pipe.ts';

describe('combinations', () => {
  it('works in a pipe', () => {
    expect(pipe([1, 2, 3], combinations(2))).toEqual([
      [1, 2],
      [1, 3],
      [2, 3],
    ]);
  });
});
