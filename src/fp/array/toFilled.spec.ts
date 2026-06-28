import { describe, expect, it } from 'vitest';
import { toFilled } from './toFilled.ts';
import { pipe } from '../pipe.ts';

describe('toFilled', () => {
  it('works in a pipe', () => {
    expect(pipe([1, 2, 3], toFilled(0, 1, 3))).toEqual([1, 0, 0]);
  });
});
