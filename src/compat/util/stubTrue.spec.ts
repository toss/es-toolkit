import { describe, expect, it } from 'vitest';
import { stubTrue } from './stubTrue';

describe('stubTrue', () => {
  it('should return `true`', () => {
    expect(stubTrue()).toEqual(true);
  });
});
