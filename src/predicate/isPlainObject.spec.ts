import { describe, expect, it } from 'vitest';
import { runInNewContext } from 'node:vm';
import { isPlainObject } from './isPlainObject';

describe('isPlainObject', () => {
  it('should return true for plain objects', () => {
    const str = 'key';

    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject(Object.create(null))).toBe(true);
    expect(isPlainObject(new Object({ key: 'new_object' }))).toBe(true);
    expect(isPlainObject(new Object({ key: new Date() }))).toBe(true);
    expect(isPlainObject({ 1: 'integer_key' })).toBe(true);
    expect(isPlainObject({ name: 'string_key' })).toBe(true);
    expect(isPlainObject({ [str]: 'dynamic_string_key' })).toBe(true);
    expect(isPlainObject({ [Symbol('tag')]: 'value' })).toBe(true);
    expect(
      isPlainObject({
        children: [{ key: 'deep-children' }],
        name: 'deep-plain',
      })
    ).toBe(true);
    expect(
      isPlainObject({
        children: [{ key: new Date() }],
        name: 'deep-with-regular-object',
      })
    ).toBe(true);
    expect(isPlainObject({ constructor: { name: 'Object2' } })).toBe(true);
    expect(isPlainObject(JSON.parse('{}'))).toBe(true);
    expect(isPlainObject(new Proxy({}, {}))).toBe(true);
    expect(isPlainObject(new Proxy({ key: 'proxied_key' }, {}))).toBe(true);
    expect(isPlainObject(JSON)).toBe(true);
    expect(isPlainObject(Math)).toBe(true);
    expect(isPlainObject(Atomics)).toBe(true);
    expect(
      isPlainObject({
        [Symbol.iterator]: function* () {
          yield 1;
        },
      })
    ).toBe(true);
    expect(isPlainObject({ [Symbol.toStringTag]: 'string-tagged' })).toBe(true);
  });

  it('should return false for invalid plain objects', () => {
    function fnWithProto(x: number) {
      // @ts-expect-error for the sake of testing
      this.x = x;
    }

    function ObjectConstructor() {}

    ObjectConstructor.prototype.constructor = Object;

    expect(isPlainObject('hello')).toBe(false);
    expect(isPlainObject(false)).toBe(false);
    expect(isPlainObject(undefined)).toBe(false);
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject(10)).toBe(false);
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject(Number.NaN)).toBe(false);
    expect(isPlainObject(() => 'cool')).toBe(false);
    expect(isPlainObject(new (class Cls {})())).toBe(false);
    expect(isPlainObject(new Intl.Locale('en'))).toBe(false);
    expect(isPlainObject(new (class extends Object {})())).toBe(false);
    expect(isPlainObject(fnWithProto)).toBe(false);
    expect(isPlainObject(Symbol('cool'))).toBe(false);
    expect(isPlainObject(globalThis)).toBe(false);
    expect(isPlainObject(new Date())).toBe(false);
    expect(isPlainObject(new Map())).toBe(false);
    expect(isPlainObject(new Error())).toBe(false);
    expect(isPlainObject(new Set())).toBe(false);
    expect(isPlainObject(new Request('http://localhost'))).toBe(false);
    expect(isPlainObject(new Promise(() => {}))).toBe(false);
    expect(isPlainObject(Promise.resolve({}))).toBe(false);
    expect(isPlainObject(Buffer.from('ABC'))).toBe(false);
    expect(isPlainObject(new Uint8Array([1, 2, 3]))).toBe(false);
    expect(isPlainObject(Object.create({}))).toBe(false);
    expect(isPlainObject(/(\d+)/)).toBe(false);
    expect(isPlainObject(new RegExp('/d+/'))).toBe(false);
    expect(isPlainObject(/d+/)).toBe(false);
    expect(isPlainObject(`cool`)).toBe(false);
    expect(isPlainObject(String.raw`rawtemplate`)).toBe(false);
    // eslint-disable-next-line
    // @ts-ignore
    expect(isPlainObject(new ObjectConstructor())).toBe(false);
    expect(
      isPlainObject(
        new Proxy(new Date(), {
          get(target) {
            return target;
          },
        })
      )
    ).toBe(false);
  });

  it('should return true for cross-realm plain objects', async () => {
    expect(isPlainObject(runInNewContext('({})'))).toBe(true);
  });
});
