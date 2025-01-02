import { describe, expect, it } from 'vitest';
import { keysIn } from './keysIn';
import { args } from '../_internal/args';
import { primitives } from '../_internal/primitives';
import { strictArgs } from '../_internal/strictArgs';
import { stubArray } from '../util/stubArray';

describe('keys methods', () => {
  const func = keysIn;
  const isKeys = false;

  it(`\`keysIn\` should return the string keyed property names of \`object\``, () => {
    const actual = func({ a: 1, b: 1 }).sort();

    expect(actual).toEqual(['a', 'b']);
  });

  it(`\`keysIn\` should include inherited string keyed properties`, () => {
    function Foo(this: any) {
      this.a = 1;
    }
    Foo.prototype.b = 2;

    const expected = isKeys ? ['a'] : ['a', 'b'];

    const actual = func(
      // eslint-disable-next-line
      // @ts-ignore
      new Foo()
    ).sort();

    expect(actual).toEqual(expected);
  });

  it(`\`keysIn\` should treat sparse arrays as dense`, () => {
    const array = [1];
    array[2] = 3;

    const actual = func(array).sort();

    expect(actual).toEqual(['0', '1', '2']);
  });

  it(`\`keysIn\` should return keys for custom properties on arrays`, () => {
    const array = [1];
    // eslint-disable-next-line
    // @ts-ignore
    array.a = 1;

    const actual = func(array).sort();

    expect(actual).toEqual(['0', 'a']);
  });

  it(`\`keysIn\` should include inherited string keyed properties of arrays`, () => {
    // eslint-disable-next-line
    // @ts-ignore
    Array.prototype.a = 1;

    const expected = isKeys ? ['0'] : ['0', 'a'];
    const actual = func([1]).sort();

    expect(actual).toEqual(expected);

    // eslint-disable-next-line
    // @ts-ignore
    delete Array.prototype.a;
  });

  it(`\`keysIn\` should work with \`arguments\` objects`, () => {
    const values = [args, strictArgs];
    const expected = values.map(() => ['0', '1', '2']);

    const actual = values.map(value => func(value).sort());

    expect(actual).toEqual(expected);
  });

  it(`\`keysIn\` should return keys for custom properties on \`arguments\` objects`, () => {
    const values = [args, strictArgs];
    const expected = values.map(() => ['0', '1', '2', 'a']);

    const actual = values.map((value: any) => {
      value.a = 1;
      const result = func(value).sort();
      delete value.a;
      return result;
    });

    expect(actual).toEqual(expected);
  });

  it(`\`keysIn\` should include inherited string keyed properties of \`arguments\` objects`, () => {
    const values = [args, strictArgs];
    const expected = values.map(() => ['0', '1', '2', 'a']);

    const actual = values.map(value => {
      // eslint-disable-next-line
      // @ts-ignore
      Object.prototype.a = 1;
      const result = func(value).sort();
      // eslint-disable-next-line
      // @ts-ignore
      delete Object.prototype.a;
      return result;
    });

    expect(actual).toEqual(expected);
  });

  it(`\`keysIn\` should work with string objects`, () => {
    const actual = func(Object('abc')).sort();

    expect(actual).toEqual(['0', '1', '2']);
  });

  it(`\`keysIn\` should return keys for custom properties on string objects`, () => {
    const object = Object('a');
    object.a = 1;

    const actual = func(object).sort();

    expect(actual).toEqual(['0', 'a']);
  });

  it(`\`keysIn\` should include inherited string keyed properties of string objects`, () => {
    // eslint-disable-next-line
    // @ts-ignore
    String.prototype.a = 1;

    const expected = isKeys ? ['0'] : ['0', 'a'];
    const actual = func(Object('a')).sort();

    expect(actual).toEqual(expected);

    // eslint-disable-next-line
    // @ts-ignore
    delete String.prototype.a;
  });

  it(`\`keysIn\` should work with array-like objects`, () => {
    const object = { 0: 'a', length: 1 };
    const actual = func(object).sort();

    expect(actual).toEqual(['0', 'length']);
  });

  it(`\`keysIn\` should coerce primitives to objects (test in IE 9)`, () => {
    const expected = primitives.map(value => (typeof value === 'string' ? ['0'] : []));

    // eslint-disable-next-line
    // @ts-ignore
    const actual = primitives.map(func);
    expect(actual).toEqual(expected);

    // IE 9 doesn't box numbers in for-in loops.
    // eslint-disable-next-line
    // @ts-ignore
    Number.prototype.a = 1;
    // eslint-disable-next-line
    // @ts-ignore
    expect(func(0)).toEqual(isKeys ? [] : ['a']);
    // eslint-disable-next-line
    // @ts-ignore
    delete Number.prototype.a;
  });

  it(`\`keysIn\` skips the \`constructor\` property on prototype objects`, () => {
    function Foo() {}
    Foo.prototype.a = 1;

    const expected = ['a'];
    expect(func(Foo.prototype)).toEqual(expected);

    Foo.prototype = { constructor: Foo, a: 1 };
    expect(func(Foo.prototype)).toEqual(expected);

    const Fake = { prototype: {} };
    // eslint-disable-next-line
    // @ts-ignore
    Fake.prototype.constructor = Fake;
    expect(func(Fake.prototype)).toEqual(['constructor']);
  });

  it(`\`keysIn\` should return an empty array when \`object\` is nullish`, () => {
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined];
    const expected = values.map(stubArray);

    const actual = values.map((value, index) => {
      // eslint-disable-next-line
      // @ts-ignore
      Object.prototype.a = 1;
      const result = index ? func(value) : func();
      // eslint-disable-next-line
      // @ts-ignore
      delete Object.prototype.a;
      return result;
    });

    expect(actual).toEqual(expected);
  });

  it('buffers should not have offset or parent keys', () => {
    const buffer = Buffer.from('test');
    const actual = keysIn(buffer);
    expect(actual).not.toContain('offset');
    expect(actual).not.toContain('parent');
  });

  it('typedArray should not have buffer, byteLength, or byteOffset keys', () => {
    const typedArray = new Uint8Array(1);
    const actual = keysIn(typedArray);
    expect(actual).not.toContain('buffer');
    expect(actual).not.toContain('byteLength');
    expect(actual).not.toContain('byteOffset');
  });
});
