import { describe, expect, it } from 'vitest';
import { toNumber } from './toNumber';
import { flatMap } from '../../array/flatMap';
import { falsey } from '../_internal/falsey';
import { identity } from '../_internal/identity';
import { MAX_INTEGER } from '../_internal/MAX_INTEGER';
import { MAX_SAFE_INTEGER } from '../_internal/MAX_SAFE_INTEGER';
import { symbol } from '../_internal/symbol';
import { whitespace } from '../_internal/whitespace';

describe('toNumber', () => {
  it(`should preserve the sign of \`0\``, () => {
    const values = [0, '0', -0, '-0'];
    const expected = [
      [0, Infinity],
      [0, Infinity],
      [-0, -Infinity],
      [-0, -Infinity],
    ];

    [0, 1].forEach(index => {
      const others = values.map(index ? Object : identity);

      const actual = others.map(value => {
        const result = toNumber(value);
        return [result, 1 / result];
      });

      expect(actual).toEqual(expected);
    });
  });

  function negative(string: string) {
    return `-${string}`;
  }

  function pad(string: string) {
    return whitespace + string + whitespace;
  }

  function positive(string: string) {
    return `+${string}`;
  }

  it(`should pass thru primitive number values`, () => {
    const values = [0, 1, NaN];

    const actual = values.map(toNumber);

    expect(actual).toEqual(values);
  });

  it(`should convert number primitives and objects to numbers`, () => {
    const values = [2, 1.2, MAX_SAFE_INTEGER, MAX_INTEGER, Infinity, NaN];

    const expected = values.map(value => {
      const neg = -value;
      return [value, value, neg, neg];
    });

    const actual = values.map(value => [
      toNumber(value),
      toNumber(Object(value)),
      toNumber(-value),
      toNumber(Object(-value)),
    ]);

    expect(actual).toEqual(expected);
  });

  it(`should convert string primitives and objects to numbers`, () => {
    const transforms = [identity, pad, positive, negative];

    const values = [
      '10',
      '1.234567890',
      `${MAX_SAFE_INTEGER}`,
      '1e+308',
      '1e308',
      '1E+308',
      '1E308',
      '5e-324',
      '5E-324',
      'Infinity',
      'NaN',
    ];

    const expected = values.map(value => {
      const n = Number(value);
      const neg = -n;
      return [n, n, n, n, n, n, neg, neg];
    });

    const actual = values.map(value =>
      flatMap(transforms, mod => [toNumber(mod(value)), toNumber(Object(mod(value)))])
    );

    expect(actual).toEqual(expected);
  });

  it(`should convert binary/octal strings to numbers`, () => {
    const numbers = [42, 5349, 1715004];
    const transforms = [identity, pad];
    const values = ['0b101010', '0o12345', '0x1a2b3c'];

    const expected = numbers.map(n => [n, n, n, n, n, n, n, n]);

    const actual = values.map(value => {
      const upper = value.toUpperCase();
      return flatMap(transforms, mod => [
        toNumber(mod(value)),
        toNumber(Object(mod(value))),
        toNumber(mod(upper)),
        toNumber(Object(mod(upper))),
      ]);
    });

    expect(actual).toEqual(expected);
  });

  it(`should convert invalid binary/octal strings to 'NaN'`, () => {
    const transforms = [identity, pad, positive, negative];
    const values = ['0b', '0o', '0x', '0b1010102', '0o123458', '0x1a2b3x'];

    const expected = values.map(() => [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN]);

    const actual = values.map(value =>
      flatMap(transforms, mod => [toNumber(mod(value)), toNumber(Object(mod(value)))])
    );

    expect(actual).toEqual(expected);
  });

  it(`should convert symbols to  'NaN'`, () => {
    const object1 = Object(symbol);
    const object2 = Object(symbol);
    const values = [symbol, object1, object2];
    const expected = values.map(() => NaN);

    object2.valueOf = undefined;
    const actual = values.map(toNumber);

    expect(actual).toEqual(expected);
  });

  it(`should convert empty values to \`0\` or \`NaN\``, () => {
    const values = falsey.concat(whitespace);

    const expected = values.map(value => (value !== whitespace ? Number(value) : 0));

    const actual = values.map((value, index) => (index ? toNumber(value) : toNumber()));

    expect(actual).toEqual(expected);
  });

  it(`should coerce objects to numbers`, () => {
    const values: any = [
      {},
      [],
      [1],
      [1, 2],
      { valueOf: '1.1' },
      { valueOf: '1.1', toString: () => '2.2' },
      { valueOf: () => '1.1', toString: '2.2' },
      {
        valueOf: () => '1.1',
        toString: () => '2.2',
      },
      { valueOf: () => '-0x1a2b3c' },
      { toString: () => '-0x1a2b3c' },
      { valueOf: () => '0o12345' },
      { toString: () => '0o12345' },
      { valueOf: () => '0b101010' },
      { toString: () => '0b101010' },
    ];

    const expected = [NaN, 0, 1, NaN, NaN, 2.2, 1.1, 1.1, NaN, NaN, 5349, 5349, 42, 42];

    const actual = values.map(toNumber);

    expect(actual).toEqual(expected);
  });
});
