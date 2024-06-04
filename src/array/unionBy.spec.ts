import { describe, expect, it } from 'vitest';
import { unionBy } from './unionBy';

describe('unionBy', () => {
  it('should work with a `converter`', () => {
    expect(unionBy([2.1], [1.2, 2.3], Math.floor)).toEqual([2.1, 1.2]);
    expect(unionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], ({ x }) => x)).toEqual([{ x: 1 }, { x: 2 }]);
  });
});
