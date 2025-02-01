import { describe, expect, it } from 'vitest';
import * as lodashStable from 'es-toolkit/compat';
import { values } from './values';
import { args } from '../_internal/args';
import { strictArgs } from '../_internal/strictArgs';

describe('values', () => {
  it(`should get string keyed values of \`object\``, () => {
    const object = { a: 1, b: 2 };
    const actual = values(object).sort();

    expect(actual).toEqual([1, 2]);
  });

  it(`should work with an object that has a \`length\` property`, () => {
    const object = { 0: 'a', 1: 'b', length: 2 };
    const actual = values(object).sort();

    expect(actual).toEqual([2, 'a', 'b']);
  });

  it(`should not include inherited string keyed property values`, () => {
    function Foo(this: any) {
      this.a = 1;
    }
    Foo.prototype.b = 2;

    const expected = [1];
    // eslint-disable-next-line
      // @ts-ignore
    const actual = values(new Foo()).sort();

    expect(actual).toEqual(expected);
  });

  it(`should work with \`arguments\` objects`, () => {
    const vals = [args, strictArgs];
    const expected = lodashStable.map(vals, lodashStable.constant([1, 2, 3]));

    const actual = lodashStable.map(vals, value => values(value).sort());

    expect(actual).toEqual(expected);
  });
});
