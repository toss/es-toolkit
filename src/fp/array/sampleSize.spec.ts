import { describe, expect, it } from 'vitest';
import { sampleSize } from './sampleSize.ts';
import { pipe } from '../pipe.ts';

describe('sampleSize', () => {
  it('returns random values from the array', () => {
    const input = [1, 2, 3, 4];
    const result = pipe(input, sampleSize(2));

    expect(result).toHaveLength(2);
    expect(result.every(value => input.includes(value))).toBe(true);
  });
});
