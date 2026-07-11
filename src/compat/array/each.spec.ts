import { describe, expect, it } from 'vitest';
import { each } from './each';
import { forEach } from './forEach';

describe('each', () => {
  it('should be an alias of forEach', () => {
    expect(each).toBe(forEach);
  });
});
