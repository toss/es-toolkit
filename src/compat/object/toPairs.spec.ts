import { describe, expect, it } from 'vitest';
import * as lodashStable from 'es-toolkit/compat';
import { toPairs } from './toPairs';

describe('toPairs', () => {
  it('should create an array of string keyed-value pairs', () => {
    const object = { a: 1, b: 2 };
    const actual = lodashStable.sortBy(toPairs(object), 0);

    expect(actual).toEqual([
      ['a', 1],
      ['b', 2],
    ]);
  });

  it('should not include inherited string keyed property values', () => {
    function Foo() {
      // eslint-disable-next-line
      // @ts-ignore
      this.a = 1;
    }
    Foo.prototype.b = 2;

    const expected = [['a', 1]];
    // eslint-disable-next-line
    // @ts-ignore
    const actual = lodashStable.sortBy(toPairs(new Foo()), 0);

    expect(actual).toEqual(expected);
  });

  it('should convert objects with a `length` property', () => {
    const object = { '0': 'a', '1': 'b', length: 2 };
    const actual = lodashStable.sortBy(toPairs(object), 0);

    expect(actual).toEqual([
      ['0', 'a'],
      ['1', 'b'],
      ['length', 2],
    ]);
  });

  it('should convert maps', () => {
    const map = new Map();
    map.set('a', 1);
    map.set('b', 2);
    expect(toPairs(map)).toEqual([
      ['a', 1],
      ['b', 2],
    ]);
  });

  it('should convert sets', () => {
    const set = new Set();
    set.add(1);
    set.add(2);
    expect(toPairs(set)).toEqual([
      [1, 1],
      [2, 2],
    ]);
  });

  it('should convert strings', () => {
    lodashStable.each(['xo', Object('xo')], string => {
      const actual = lodashStable.sortBy(toPairs(string), 0);
      expect(actual).toEqual([
        ['0', 'x'],
        ['1', 'o'],
      ]);
    });
  });
});
