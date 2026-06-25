import { describe, expect, it } from 'vitest';
import { isSubset } from './isSubset.ts';
import { pipe } from '../pipe.ts';

describe('isSubset', () => {
  it('works in a pipe', () => {
    expect(pipe([1, 2], isSubset([1, 2, 3]))).toEqual(true);
  });
});
