import { describe, expect, it } from 'vitest';
import { range } from './range';

describe('range', () => {
  it('handles positive range with default step', () => {
    expect(range(4)).toEqual([0, 1, 2, 3]);
  });

  it('handles negative range with default step', () => {
    expect(range(-4)).toEqual([0, -1, -2, -3]);
  });

  it('handles custom positive step', () => {
    expect(range(0, 20, 5)).toEqual([0, 5, 10, 15]);
  });

  it('handles custom negative step', () => {
    expect(range(0, -4, -1)).toEqual([0, -1, -2, -3]);
  });

  it('handles zero step', () => {
    expect(range(1, 4, 0)).toEqual([1, 1, 1]);
  });

  it('handles zero range', () => {
    expect(range(0)).toEqual([]);
  });
});
