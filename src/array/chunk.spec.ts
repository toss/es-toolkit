import { describe, expect, it } from 'vitest';
import { chunk } from './chunk';

describe('chunk', () => {
  it('if tuple with size 1, it should be divided according to the size.', () => {
    type Response = ReturnType<typeof chunk<[1, 2, 3, 4, 5, 6], 1>>;
    const response: Response = [[1], [2], [3], [4], [5], [6]];

    expect(response).toBeDefined();
  });

  it('if tuple with size 2, it should be divided according to the size.', () => {
    type Response = ReturnType<typeof chunk<[1, 2, 3, 4, 5, 6], 2>>;
    const response: Response = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];

    expect(response).toBeDefined();
  });

  it('if tuple with size 3, it should be divided according to the size.', () => {
    type Response = ReturnType<typeof chunk<[1, 2, 3, 4, 5, 6], 3>>;
    const response: Response = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    expect(response).toBeDefined();
  });

  it('if tuple with size 4, it should be divided according to the size.', () => {
    type Response = ReturnType<typeof chunk<[1, 2, 3, 4, 5, 6], 4>>;
    const response: Response = [
      [1, 2, 3, 4],
      [5, 6],
    ];

    expect(response).toBeDefined();
  });

  it('if tuple with size 5, it should be divided according to the size.', () => {
    type Response = ReturnType<typeof chunk<[1, 2, 3, 4, 5, 6], 5>>;
    const response: Response = [[1, 2, 3, 4, 5], [6]];

    expect(response).toBeDefined();
  });

  it('if tuple with size 6, it should be divided according to the size.', () => {
    type Response = ReturnType<typeof chunk<[1, 2, 3, 4, 5, 6], 6>>;
    const response: Response = [[1, 2, 3, 4, 5, 6]];

    expect(response).toBeDefined();
  });

  it("if tuple with size more than tuple' length, it will be same as devided according to the tuple's length", () => {
    type Response = ReturnType<typeof chunk<[1, 2, 3, 4, 5, 6], 7>>;
    const response: Response = [[1, 2, 3, 4, 5, 6]];

    expect(response).toBeDefined();
  });

  it('should return an empty array when the input array is empty', () => {
    expect(chunk([], 3)).toEqual([]);
  });

  it('should throw if the size is not an integer of is less than 1', () => {
    expect(() => chunk([1, 2, 3], 0)).toThrowErrorMatchingInlineSnapshot(
      `[Error: Size must be an integer greater than zero.]`
    );
    expect(() => chunk([1, 2, 3], -1)).toThrowErrorMatchingInlineSnapshot(
      `[Error: Size must be an integer greater than zero.]`
    );
    expect(() => chunk([1, 2, 3], 0.5)).toThrowErrorMatchingInlineSnapshot(
      `[Error: Size must be an integer greater than zero.]`
    );
    expect(() => chunk([1, 2, 3], Math.PI)).toThrowErrorMatchingInlineSnapshot(
      `[Error: Size must be an integer greater than zero.]`
    );
  });

  it('should evenly divide all elements into chunks of the specified size when the total length is a multiple of the size', () => {
    expect(chunk([1, 2, 3, 4, 5, 6], 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
  });

  it('should place the remaining elements in the last chunk when the total length is not a multiple of the size', () => {
    expect(chunk([1, 2, 3, 4], 6)).toEqual([[1, 2, 3, 4]]);
    expect(chunk([1, 2, 3, 4, 5, 6, 7], 2)).toEqual([[1, 2], [3, 4], [5, 6], [7]]);
  });
});
