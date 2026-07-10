import { describe, expect, it } from 'vitest';
import { keys } from './keys';
import { args } from '../_internal/args';
import { arrayProto } from '../_internal/arrayProto';
import { numberProto } from '../_internal/numberProto';
import { objectProto } from '../_internal/objectProto';
import { primitives } from '../_internal/primitives';
import { strictArgs } from '../_internal/strictArgs';
import { stringProto } from '../_internal/stringProto';
import { constant } from '../util/constant';
import { stubArray } from '../util/stubArray';

/**
 * @see https://github.com/lodash/lodash/blob/afcd5bc1e8801867c31a17566e0e0edebb083d0e/test/keys-methods.spec.js#L1
 */
describe('keys', () => {
  it('should return the string keyed property names of `object`', () => {
    const actual = keys({ a: 1, b: 1 }).sort();

    expect(actual).toEqual(['a', 'b']);
  });

  it('should not include inherited string keyed properties', () => {
    function Foo(this: any) {
      this.a = 1;
    }
    Foo.prototype.b = 2;

    const expected = ['a'];
    // @ts-expect-error - Foo is a constructor
    const actual = keys(new Foo()).sort();

    expect(actual).toEqual(expected);
  });

  it('should treat sparse arrays as dense', () => {
    const array = [1];
    array[2] = 3;

    const actual = keys(array).sort();

    expect(actual).toEqual(['0', '1', '2']);
  });

  it('should return keys for custom properties on arrays', () => {
    const array: any = [1];
    array.a = 1;

    const actual = keys(array).sort();

    expect(actual).toEqual(['0', 'a']);
  });

  it('should not include inherited string keyed properties of arrays', () => {
    arrayProto.a = 1;

    const actual = keys([1]).sort();
    const expected = ['0'];
    expect(actual).toEqual(expected);

    delete arrayProto.a;
  });

  it('should work with `arguments` objects', () => {
    const values = [args, strictArgs];
    const expected = values.map(constant(['0', '1', '2']));

    const actual = values.map(value => keys(value).sort());

    expect(actual).toEqual(expected);
  });

  it('should return keys for custom properties on `arguments` objects', () => {
    const values = [args, strictArgs];
    const expected = values.map(constant(['0', '1', '2', 'a']));

    const actual = values.map((value: any) => {
      value.a = 1;
      const result = keys(value).sort();
      delete value.a;
      return result;
    });

    expect(actual).toEqual(expected);
  });

  it(`should not include inherited string keyed properties of \`arguments\` objects`, () => {
    const values = [args, strictArgs];
    const expected = values.map(constant(['0', '1', '2']));

    const actual = values.map(value => {
      objectProto.a = 1;
      const result = keys(value).sort();
      delete objectProto.a;
      return result;
    });

    expect(actual).toEqual(expected);
  });

  it('should work with string objects', () => {
    const actual = keys(Object('abc')).sort();

    expect(actual).toEqual(['0', '1', '2']);
  });

  it('should return keys for custom properties on string objects', () => {
    const object = Object('a');
    object.a = 1;

    const actual = keys(object).sort();

    expect(actual).toEqual(['0', 'a']);
  });

  it(`should not include inherited string keyed properties of string objects`, () => {
    stringProto.a = 1;

    const expected = ['0'];
    const actual = keys(Object('a')).sort();

    expect(actual).toEqual(expected);

    delete stringProto.a;
  });

  it('should work with array-like objects', () => {
    const object = { 0: 'a', length: 1 };
    const actual = keys(object).sort();

    expect(actual).toEqual(['0', 'length']);
  });

  it('should coerce primitives to objects (test in IE 9)', () => {
    const expected = primitives.map(value => (typeof value === 'string' ? ['0'] : []));

    const actual = primitives.map(keys);
    expect(actual).toEqual(expected);

    // IE 9 doesn't box numbers in for-in loops.
    numberProto.a = 1;
    expect(keys(0)).toEqual([]);
    delete numberProto.a;
  });

  it('skips the `constructor` property on prototype objects', () => {
    function Foo() {}
    Foo.prototype.a = 1;

    const expected = ['a'];
    expect(keys(Foo.prototype)).toEqual(expected);

    Foo.prototype = { constructor: Foo, a: 1 };
    expect(keys(Foo.prototype)).toEqual(expected);

    const Fake = { prototype: {} as any };
    Fake.prototype.constructor = Fake;
    expect(keys(Fake.prototype)).toEqual(['constructor']);
  });

  it('should return an empty array when `object` is nullish', () => {
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined];
    const expected = values.map(stubArray);

    const actual = values.map((value, index) => {
      objectProto.a = 1;
      const result = index ? keys(value) : keys();
      delete objectProto.a;
      return result;
    });

    expect(actual).toEqual(expected);
  });

  it('buffers should not have offset or parent keys', () => {
    const buffer = Buffer.from('test');
    const actual = keys(buffer);
    expect(actual).toEqual(['0', '1', '2', '3']);
  });

  it('typedArray should not have buffer, byteLength, or byteOffset keys', () => {
    const typedArray = new Uint8Array(1);
    const actual = keys(typedArray);
    expect(actual).toEqual(['0']);
  });
});
