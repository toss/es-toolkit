import { describe, expect, it } from 'vitest';
import { at } from './at.ts';
import { pipe } from '../pipe.ts';

describe('at', () => {
  it('works in a pipe', () => {
    expect(pipe(['a', 'b', 'c'], at([0, -1]))).toEqual(['a', 'c']);
  });
});
