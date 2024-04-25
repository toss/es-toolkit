import { describe, expect, it } from 'vitest';
import { dropWhile } from './dropWhile';

describe('dropWhile', () => {
  it('should drop elements from an array until `canContinueDropping` returns false, from the beginning', () => {
    expect(dropWhile([1.2, 2.3, 3.4], x => x < 2)).toEqual([2.3, 3.4]);

    const items = [{ id: 1, enabled: false }, { id: 2, enabled: true }, { id: 3, enabled: false }];

    expect(dropWhile(items, x => !x.enabled)).toEqual([{
      id: 2, enabled: true
    }, { id: 3, enabled: false }]);
  });
});
