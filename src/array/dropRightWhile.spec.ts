import { describe, expect, it } from 'vitest';
import { dropRightWhile } from './dropRightWhile';

describe('dropRightWhile', () => {
  it('should drop elements from an array until `canContinueDropping` returns false, from the end', () => {
    expect(dropRightWhile([1.2, 2.3, 3.4], x => x < 2)).toEqual([1.2, 2.3, 3.4]);

    const items = [{ id: 1, enabled: false }, { id: 2, enabled: true }, { id: 3, enabled: false }];

    expect(dropRightWhile(items, x => !x.enabled)).toEqual([{
      id: 1, enabled: false
    }, {
      id: 2, enabled: true
    }]);
  });
});
