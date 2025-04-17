import { describe, expect, it } from 'vitest';
import { wrap } from './wrap';
import { noop } from '../../function';
import { slice } from '../_internal/slice';
import { stubA } from '../_internal/stubA';
import { escape } from '../string/escape';

describe('wrap', () => {
  it('should create a wrapped function', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const p = wrap(escape, (func, text) => `<p>${func(text)}</p>`);

    expect(`<p>${escape('fred, barney & pebbles')}</p>`).toBe('<p>fred, barney &amp; pebbles</p>');
  });

  it('should provide correct `wrapper` arguments', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    let args;

    const wrapped = wrap(noop, function () {
      args || (args = slice.call(arguments));
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    wrapped(1, 2, 3);
    expect(args).toEqual([noop, 1, 2, 3]);
  });

  it('should use `_.identity` when `wrapper` is nullish', () => {
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
});
