import { describe, expect, it } from 'vitest';
import { stubArray } from './stubArray';

describe('stubArray', () => {
  it('should return an empty array', () => {
    expect(stubArray()).toEqual([]);
  });
});
