import { describe, expect, it } from 'vitest';
import { scan } from './scan.ts';

describe('scan', () => {
  it('emits the initial value then each running accumulator', () => {
    expect(scan([1, 2, 3].values(), (acc, x) => acc + x, 0).toArray()).toEqual([0, 1, 3, 6]);
  });

  it('emits only the initial value for an empty source', () => {
    expect(scan([].values(), (acc: number, x: number) => acc + x, 10).toArray()).toEqual([10]);
  });

  it('passes the index to the callback', () => {
    const indices: number[] = [];
    scan(
      [10, 20, 30].values(),
      (acc, value, index) => {
        indices.push(index);
        return acc + value;
      },
      0
    ).toArray();
    expect(indices).toEqual([0, 1, 2]);
  });

  it('can change the accumulator type', () => {
    expect(scan(['a', 'b'].values(), (acc, x) => acc + x, '').toArray()).toEqual(['', 'a', 'ab']);
  });

  it('is single-shot once consumed', () => {
    const it = scan([1, 2].values(), (acc, x) => acc + x, 0);
    expect(it.toArray()).toEqual([0, 1, 3]);
    expect(it.toArray()).toEqual([]);
  });
});
