import { describe, expect, it } from 'vitest';
import { size } from './size';
import { falsey } from '../_internal/falsey';
import { toArgs } from '../_internal/toArgs';

const args = toArgs([1, 2, 3]);
/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/size.spec.js#L1
 */
describe('size', () => {
  const array = [1, 2, 3];

  it('should return the number of own enumerable string keyed properties of an object', () => {
    expect(size({ one: 1, two: 2, three: 3 })).toBe(3);
  });

  it('should return the length of an array', () => {
    expect(size(array)).toBe(3);
  });

  it('should accept a falsey `object`', () => {
    const expected = falsey.map(() => 0);
    const actual = falsey.map((object, index) => {
      try {
        return index ? size(object as object) : size(undefined);
      } catch (e) {
        /* empty */
      }
    });

    expect(actual).toEqual(expected);
  });

  it('should work with `arguments` objects', () => {
    expect(size(args)).toBe(3);
  });

  // it('should work with jQuery/MooTools DOM query collections', () => {
  //   function Foo(elements: unknown[]) {
  //     Array.prototype.push.apply(this, elements);
  //   }
  //   Foo.prototype = { length: 0, splice: Array.prototype.splice };

  //   expect(size(new (Foo(array) as unknown as { new (elements?: unknown[] | undefined): object })())).toBe(3);
  // });

  it('should work with maps', () => {
    const map = new Map();
    map.set('a', 1);
    map.set('b', 2);
    expect(size(map)).toBe(2);
    map.clear();
  });

  it('should work with sets', () => {
    const set = new Set();
    set.add(1);
    set.add(2);
    expect(size(set)).toBe(2);
    set.clear();
  });

  it('should work with strings', () => {
    const str = 'es-toolkit';
    expect(size(str)).toBe(10);
  });

  it('should not treat objects with negative lengths as array-like', () => {
    expect(size({ length: -1 })).toBe(1);
  });

  it('should not treat objects with lengths larger than `MAX_SAFE_INTEGER` as array-like', () => {
    expect(size({ length: Number.MAX_SAFE_INTEGER + 1 })).toBe(1);
  });

  it('should not treat objects with non-number lengths as array-like', () => {
    expect(size({ length: '0' })).toBe(1);
  });
});
