import { describe, expect, it } from 'vitest';
import { reverse } from './reverse.ts';
import { pipe } from '../pipe.ts';

describe('reverse', () => {
  it('works in a pipe', () => {
    expect(pipe([1, 2, 3], reverse())).toEqual([3, 2, 1]);
  });
});
