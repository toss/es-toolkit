import { describe, expect, it } from 'vitest';
import { takeRight } from './takeRight.ts';
import { pipe } from '../pipe.ts';

describe('takeRight', () => {
  it('works in a pipe', () => {
    expect(pipe([1, 2, 3, 4], takeRight(2))).toEqual([3, 4]);
  });
});
