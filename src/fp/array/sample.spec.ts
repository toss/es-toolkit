import { describe, expect, it } from 'vitest';
import { sample } from './sample.ts';
import { pipe } from '../pipe.ts';

describe('sample', () => {
  it('returns one value from the array', () => {
    const input = [1, 2, 3];
    expect(input).toContain(pipe(input, sample()));
  });
});
