import { describe, expect, it } from 'vitest';
import { range } from './range';

describe('range', () => {
  it('counts from 0n when called with one argument', () => {
    expect(range(4n)).toEqual([0n, 1n, 2n, 3n]);
  });

  it('counts from start to end when called with two arguments', () => {
    expect(range(2n, 5n)).toEqual([2n, 3n, 4n]);
  });

  it('increments by step', () => {
    expect(range(0n, 10n, 2n)).toEqual([0n, 2n, 4n, 6n, 8n]);
    expect(range(0n, 5n, 2n)).toEqual([0n, 2n, 4n]);
  });

  it('counts down for a negative step', () => {
    expect(range(5n, 0n, -1n)).toEqual([5n, 4n, 3n, 2n, 1n]);
    expect(range(5n, 0n, -2n)).toEqual([5n, 3n, 1n]);
  });

  it('returns an empty array when the step points away from end', () => {
    expect(range(0n, 5n, -1n)).toEqual([]);
    expect(range(5n, 0n, 1n)).toEqual([]);
  });

  it('returns an empty array when start equals end', () => {
    expect(range(3n, 3n)).toEqual([]);
  });

  it('handles negative ranges', () => {
    expect(range(-3n, 0n)).toEqual([-3n, -2n, -1n]);
  });

  it('stays exact beyond Number.MAX_SAFE_INTEGER', () => {
    expect(range(9007199254740993n, 9007199254740996n)).toEqual([
      9007199254740993n,
      9007199254740994n,
      9007199254740995n,
    ]);
  });

  it('throws when the step is 0n', () => {
    expect(() => range(0n, 5n, 0n)).toThrowError('The step value must be a non-zero bigint.');
  });
});
