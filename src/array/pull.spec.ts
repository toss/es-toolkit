import { pull } from './pull';
import { expect } from '@jest/globals';

describe('pull', () => {
  it('should remove specified values from the array', () => {
    const array = [1, 2, 3, 4];
    pull(array, 2, 4);
    expect(array).toEqual([1, 3]);
  });

  it('should return the modified array', () => {
    const array = [5, 6, 7];
    const result = pull(array, 6);
    expect(result).toEqual([5, 7]);
  });
});
