import { describe, expect, it } from 'vitest';
import { flattenObject } from './flattenObject';

describe('flattenObject', function () {
  it('flattens primitive values correctly', () => {
    const result1 = flattenObject({
      a: {
        b: 'yay',
      },
    });

    expect(result1).toEqual({
      'a.b': 'yay',
    });

    const date = new Date();

    const result2 = flattenObject({
      a: {
        b: {
          string: 'hello world',
          number: 1234.5678,
          boolean: true,
          null: null,
          undefined: undefined,
          date: date,
        },
      },
    });

    expect(result2).toEqual({
      'a.b.string': 'hello world',
      'a.b.number': 1234.5678,
      'a.b.boolean': true,
      'a.b.null': null,
      'a.b.undefined': undefined,
      'a.b.date': date,
    });
  });

  it('flattens multiple keys', () => {
    const date = new Date();

    const result = flattenObject({
      a: {
        b: {
          c: 1,
        },
        d: {
          e: {
            f: {
              g: date,
            },
          },
        },
      },
      h: {
        i: 'hi',
      },
    });

    expect(result).toEqual({
      'a.b.c': 1,
      'a.d.e.f.g': date,
      'h.i': 'hi',
    });
  });

  it('handles empty objects correctly', () => {
    const result = flattenObject({
      a: {
        b: {},
      },
    });

    expect(result).toEqual({
      'a.b': {},
    });
  });

  it('handles `Buffer`s correctly', () => {
    const result = flattenObject({
      a: {
        b: Buffer.from('test'),
      },
    });

    expect(result).toEqual({
      'a.b': Buffer.from('test'),
    });
  });

  it('handles `TypedArray`s correctly', () => {
    const result = flattenObject({
      a: {
        b: new Uint8Array([1, 2, 3, 4]),
      },
    });

    expect(result).toEqual({
      'a.b': new Uint8Array([1, 2, 3, 4]),
    });
  });

  it('handles numeric keys', () => {
    const result = flattenObject({
      '01': {
        '02': {
          '03': 1,
        },
      },
    });

    expect(result).toEqual({
      '01.02.03': 1,
    });
  });

  it('handles mixed keys', () => {
    const result = flattenObject({
      a1: {
        b2: {
          c3: 1,
        },
      },
    });

    expect(result).toEqual({
      'a1.b2.c3': 1,
    });
  });

  it('handles arrays', () => {
    const result = flattenObject({
      a: [1, 2, 3],
    });

    expect(result).toEqual({
      'a.0': 1,
      'a.1': 2,
      'a.2': 3,
    });
  });

  it('handles object arrays', () => {
    const result = flattenObject({
      a: [1, { b: 2 }, 3, [{ c: 4 }]],
    });

    expect(result).toEqual({
      'a.0': 1,
      'a.1.b': 2,
      'a.2': 3,
      'a.3.0.c': 4,
    });
  });
});
