import { describe, expect, it } from 'vitest';
import { stubFalse } from './stubFalse';

describe('stubFalse', () => {
  it('should return `false`', () => {
    expect(stubFalse()).toEqual(false);
  });
});
