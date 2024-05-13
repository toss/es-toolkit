import { describe, expect, it } from 'vitest';
import { dropRight } from './dropRight';

describe('dropRight', () => {
  it('should drop `itemsCount` elements from an array from the end', () => {
    expect(dropRight([1.2, 2.3, 3.4], 1)).toEqual([1.2, 2.3]);
    expect(dropRight(['a', 'b', 'c', 'd'], 2)).toEqual(['a', 'b']);
  });
});
