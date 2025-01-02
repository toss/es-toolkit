import { describe, expect, it } from 'vitest';
import { stubString } from './stubString';

describe('stubString', () => {
  it('should return an empty string', () => {
    expect(stubString()).toEqual('');
  });
});
