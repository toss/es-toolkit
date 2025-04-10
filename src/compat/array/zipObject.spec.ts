import { describe, expect, it } from 'vitest';
import { each } from '..';
import { zipObject } from './zipObject';

describe('zipObject', () => {
  const object = { barney: 36, fred: 40 };
  it(`\`zipObject\` should zip together key/value arrays into an object`, () => {
    const actual = zipObject(['barney', 'fred'], [36, 40]);
    expect(actual).toEqual(object);
  });

  it(`\`zipObject\` should ignore extra \`values\``, () => {
    expect(zipObject(['a'], [1, 2])).toEqual({ a: 1 });
  });

  it(`\`zipObject\` should assign \`undefined\` values for extra \`keys\``, () => {
    expect(zipObject(['a', 'b'], [1])).toEqual({ a: 1, b: undefined });
  });

  it(`\`zipObject\` should not support deep paths`, () => {
    each(['a.b.c', ['a', 'b', 'c']], (path, index) => {
      const expected = index ? { 'a,b,c': 1 } : { 'a.b.c': 1 };
      // @ts-expect-error - invalid argument
      expect(zipObject([path], [1])).toEqual(expected);
    });
  });
});
