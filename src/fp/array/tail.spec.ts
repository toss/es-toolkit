import { describe, expect, it } from 'vitest';
import { tail } from './tail.ts';
import { pipe } from '../pipe.ts';

describe('tail', () => {
  it('works in a pipe', () => {
    expect(pipe([1, 2, 3], tail())).toEqual([2, 3]);
  });
});
