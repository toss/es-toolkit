import { describe, expect, it } from 'vitest';
import { stubObject } from './stubObject';

describe('stubObject', () => {
  it('should return an empty object', () => {
    expect(stubObject()).toEqual({});
  });
});
