import { describe, expect, expectTypeOf, it } from 'vitest';
import type { wrap as wrapLodash } from 'lodash';
import { wrap } from './wrap';
import { noop } from '../../function';
import { slice } from '../_internal/slice';
import { stubA } from '../_internal/stubA';
import { escape } from '../string/escape';

describe('wrap', () => {
  it('should create a wrapped function', () => {
    const p = wrap(escape, (func, text: string) => `<p>${func(text)}</p>`);

    expect(p('fred, barney & pebbles')).toBe('<p>fred, barney &amp; pebbles</p>');
  });

  it('should provide correct `wrapper` arguments', () => {
    let args: unknown;

    const wrapped = wrap(noop, function () {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions, prefer-rest-params
      args || (args = slice.call(arguments));
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    wrapped(1, 2, 3);
    expect(args).toEqual([noop, 1, 2, 3]);
  });

  it('should use `_.identity` when `wrapper` is nullish', () => {
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined];
    const expected = values.map(stubA);

    const actual = values.map((value, index) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const wrapped = index ? wrap('a', value) : wrap('a');
      return wrapped('b', 'c');
    });

    expect(actual).toEqual(expected);
  });

  it('should use `this` binding of function', () => {
    const p = wrap(escape, function (func) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return `<p>${func(this.text)}</p>`;
    });

    const object = { p: p, text: 'fred, barney & pebbles' };
    expect(object.p()).toBe('<p>fred, barney &amp; pebbles</p>');
  });

  it('should work with primitive values', () => {
    const value = 'value';
    const expected = '<p>value</p>';

    const p = wrap(value, v => `<p>${v}</p>`);
    expect(p()).toBe(expected);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(wrap).toEqualTypeOf<typeof wrapLodash>();
  });
});
