import { describe, expect, it } from 'vitest';
import { zip } from './zip.ts';
import { pipe } from '../pipe.ts';

describe('zip', () => {
  it('works in a pipe', () => {
    expect(pipe([1, 2], zip(['a', 'b']))).toEqual([
      [1, 'a'],
      [2, 'b'],
    ]);
  });
});
