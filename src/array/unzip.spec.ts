import { describe, expect, it } from 'vitest';
import { unzip } from './unzip';

describe('unzip', () => {
  it('should unzip arrays correctly', () => {
    const zipped = [
      ['a', true, 1],
      ['b', false, 2],
    ];
    const result = unzip(zipped);

    expect(result).toEqual([
      ['a', 'b'],
      [true, false],
      [1, 2],
    ]);
  });

  it('should handle empty arrays', () => {
    const zipped = [[], [], [], []];
    const result = unzip(zipped);
    expect(result).toEqual([]);
  });

  it('should handle arrays of different lengths', () => {
    const zipped = [
      ['a', 1, true, 32, 100],
      ['b', 2, false],
    ];
    const result = unzip(zipped);
    expect(result).toEqual([
      ['a', 'b'],
      [1, 2],
      [true, false],
      [32, undefined],
      [100, undefined],
    ]);

    const zipped2 = [['a', 1, true], ['b', 2, false, 32, 58], [1]];
    const result2 = unzip(zipped2);
    expect(result2).toEqual([
      ['a', 'b', 1],
      [1, 2, undefined],
      [true, false, undefined],
      [undefined, 32, undefined],
      [undefined, 58, undefined],
    ]);
  });
});
