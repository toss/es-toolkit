import { describe, expect, it } from 'vitest';
import {countBy} from "./countBy.ts";

describe('countBy', () => {
  it('should count the occurrences of each item in an array', () => {
    const arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
    const result = countBy(arr, String);

    expect(result).toEqual({
      '1': 2,
      '2': 2,
      '3': 2,
      '4': 2,
      '5': 2,
    });
  });
  it('should count the occurrences of each item in an array that applied transformer', () => {
    const arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
    const result = countBy(arr, (item) => item % 2 === 0 ? 'even' : 'odd');

    expect(result).toEqual({
      'odd': 6,
      'even': 4,
    });
  })
});
