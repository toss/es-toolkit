import { describe, expect, it } from 'vitest';
import { cartesianProduct } from './cartesianProduct.ts';
import { pipe } from '../pipe.ts';

describe('cartesianProduct', () => {
  it('works in a pipe', () => {
    expect(pipe([1, 2], cartesianProduct(['a', 'b']))).toEqual([
      [1, 'a'],
      [1, 'b'],
      [2, 'a'],
      [2, 'b'],
    ]);
  });
});
