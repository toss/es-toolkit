import { describe, expect, it } from 'vitest';
import { rangeRight } from './rangeRight';

describe('rangeRight', () => {
  it('counts down from end when called with one argument', () => {
    expect(rangeRight(4n)).toEqual([3n, 2n, 1n, 0n]);
  });

  it('counts down from end to start when called with two arguments', () => {
    expect(rangeRight(2n, 5n)).toEqual([4n, 3n, 2n]);
  });

  it('increments by step', () => {
    expect(rangeRight(0n, 10n, 2n)).toEqual([8n, 6n, 4n, 2n, 0n]);
  });

  it('handles a negative step', () => {
    expect(rangeRight(5n, 0n, -1n)).toEqual([1n, 2n, 3n, 4n, 5n]);
  });

  it('returns an empty array when the step points away from end', () => {
    expect(rangeRight(0n, 5n, -1n)).toEqual([]);
  });

  it('returns the reverse of range', () => {
    expect(rangeRight(0n, 10n, 3n)).toEqual(range(0n, 10n, 3n).reverse());
  });

  it('throws when the step is 0n', () => {
    expect(() => rangeRight(0n, 5n, 0n)).toThrowError('The step value must be a non-zero bigint.');
  });
});

function range(start: bigint, end: bigint, step: bigint): bigint[] {
  const result: bigint[] = [];

  for (let value = start; value < end; value += step) {
    result.push(value);
  }

  return result;
}
