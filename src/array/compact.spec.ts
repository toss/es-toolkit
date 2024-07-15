import { describe, it, expect } from 'vitest';
import { compact } from './compact';
import fc from 'fast-check';

describe('compact', () => {
  it('removes falsey values from array', () => {
    expect(compact([0, 1, false, 2, '', 3, null, undefined, 4, NaN, 5])).toEqual([1, 2, 3, 4, 5]);
    expect(compact([false, 0, '', null, undefined, NaN])).toEqual([]);
    expect(compact([0, { name: 'John' }, false, 'hello', null, { age: 30 }, undefined, NaN])).toEqual([
      { name: 'John' },
      'hello',
      { age: 30 },
    ]);
  });
});

describe('compact property', () => {
  it('should remove falsey values from array', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string().filter(s => s.length > 0)),
        fc.array(fc.falsy()),
        fc.array(fc.falsy()),
        (arr, head, tail) => {
          const falseMixedArray = arr.flatMap(value => [...head, value, ...tail]);
          expect(compact(falseMixedArray)).toEqual(arr);
        }
      )
    );
  });
});
