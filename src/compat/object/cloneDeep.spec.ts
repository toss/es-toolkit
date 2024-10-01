import { describe, expect, it } from 'vitest';
import { cloneDeep } from './cloneDeep';
import { range } from '../../math/range';
import { args } from '../_internal/args';
import { LARGE_ARRAY_SIZE } from '../_internal/LARGE_ARRAY_SIZE';
import { stubTrue } from '../_internal/stubTrue';

describe('cloneDeep', () => {
  it('should deep clone objects with circular references', () => {
    const object: any = {
      foo: { b: { c: { d: {} } } },
      bar: {},
    };

    object.foo.b.c.d = object;
    object.bar.b = object.foo.b;

    const actual = cloneDeep(object);

    expect(actual.bar.b).toBe(actual.foo.b);
    expect(actual).toBe(actual.foo.b.c.d);
    expect(actual).not.toBe(object);
  });

  it('should deep clone objects with lots of circular references', () => {
    const cyclical: any = {};

    range(LARGE_ARRAY_SIZE + 1).forEach(index => {
      cyclical[`v${index}`] = [index ? cyclical[`v${index - 1}`] : cyclical];
    });

    const clone = cloneDeep(cyclical);

    const actual = clone[`v${LARGE_ARRAY_SIZE}`][0];

    expect(actual).toBe(clone[`v${LARGE_ARRAY_SIZE - 1}`]);
    expect(actual).not.toBe(cyclical[`v${LARGE_ARRAY_SIZE - 1}`]);
  });

  class Foo {
    a = 1;
    b = 1;

    static c = function () {};
  }
  Foo.prototype.b = 1;

  const map = new Map([
    ['a', 1],
    ['b', 2],
  ]);

  const set = new Set([1, 2]);

  it(`should clone arguments objects`, () => {
    const actual = cloneDeep(args);

    expect(actual).toEqual(args);
    expect(actual).not.toBe(args);
  });

  it(`should clone arrays`, () => {
    const object = ['a', ''];

    const actual = cloneDeep(['a', '']);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it(`should clone array-like objects`, () => {
    const object = { 0: 'a', length: 1 };

    const actual = cloneDeep(object);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it('should clone booleans', () => {
    const object = false;

    const actual = cloneDeep(object);

    expect(actual).toEqual(object);
    expect(actual).toBe(object);
  });

  it('should clone boolean objects', () => {
    const object = Object(false);

    const actual = cloneDeep(object);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it('should clone date objects', () => {
    const object = new Date();
    const actual = cloneDeep(object);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it('should clone Foo instances', () => {
    const object = new Foo();
    const actual = cloneDeep(object);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it('should clone objects', () => {
    const object = { a: 0, b: 1, c: 2 };

    const actual = cloneDeep(object);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it('should clone objects with object values', () => {
    const object = { a: /a/, b: ['B'], c: { C: 1 } };

    const actual = cloneDeep(object);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it('should clone maps', () => {
    const object = map;

    const actual = cloneDeep(object);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it('should clone null values', () => {
    const object = null;
    const actual = cloneDeep(object);

    expect(actual).toEqual(object);
    expect(actual).toBe(object);
  });

  it('should clone numbers', () => {
    const object = 0;

    const actual = cloneDeep(object);

    expect(actual).toEqual(object);
    expect(actual).toBe(object);
  });

  it('should clone number objects', () => {
    const object = Object(0);
    const actual = cloneDeep(object);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it('should clone regexes', () => {
    const object = /a/gim;

    const actual = cloneDeep(object);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it('should clone sets', () => {
    const object = set;
    const actual = cloneDeep(object);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it('should clone strings', () => {
    const object = 'a';

    const actual = cloneDeep(object);

    expect(actual).toEqual(object);
    expect(actual).toBe(object);
  });

  it('should clone string objects', () => {
    const object = Object('a');

    const actual = cloneDeep(object);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it('should clone undefined values', () => {
    const object = undefined;

    const actual = cloneDeep(object);

    expect(actual).toEqual(object);
    expect(actual).toBe(object);
  });

  it(`should clone array buffers`, () => {
    const arrayBuffer = new ArrayBuffer(2);
    const actual = cloneDeep(arrayBuffer);
    expect(actual.byteLength).toBe(arrayBuffer.byteLength);
    expect(actual).not.toBe(arrayBuffer);
  });

  it(`should clone buffers`, () => {
    const buffer = Buffer.from([1, 2]);
    const actual = cloneDeep(buffer);

    expect(actual.byteLength).toBe(buffer.byteLength);
    // eslint-disable-next-line
    // @ts-ignore
    expect(actual.inspect()).toBe(buffer.inspect());
    expect(actual).not.toBe(buffer);

    buffer[0] = 2;
    expect(actual[0]).toBe(2);
  });

  it(`should clone \`index\` and \`input\` array properties`, () => {
    const array = /c/.exec('abcde');
    const actual = cloneDeep(array);

    expect(actual?.index).toBe(2);
    expect(actual?.input).toBe('abcde');
  });

  it(`should clone \`lastIndex\` regexp property`, () => {
    const regexp = /c/g;
    regexp.exec('abcde');

    expect(cloneDeep(regexp).lastIndex).toBe(3);
  });

  it(`should clone expando properties`, () => {
    const values = [false, true, 1, 'a'].map(value => {
      const object = Object(value);
      object.a = 1;
      return object;
    });

    const expected = values.map(stubTrue);

    const actual = values.map(value => {
      return cloneDeep(value).a === 1;
    });

    expect(actual).toEqual(expected);
  });
});
