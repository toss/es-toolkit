import { describe, expect, it } from 'vitest';
import { mean } from './mean';

describe('mean', () => {
  it('returns the average of the function', () => {
    expect(mean([1, 2, 3, 4, 5])).toEqual(3);
  });

  it('returns NaN for empty arrays', () => {
    expect(mean([])).toEqual(NaN);
  });

  it('works with TypedArrays', () => {
    const typedArray = new Float32Array([1.5, 2.5]);
    const result = mean(typedArray);
    expect(result).toBe(2.0);
  });
});
