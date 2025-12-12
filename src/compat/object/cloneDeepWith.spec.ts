import { describe, expect, expectTypeOf, it } from 'vitest';
import type { cloneDeepWith as cloneDeepWithLodash } from 'lodash';
import { cloneDeepWith } from './cloneDeepWith';
import { noop } from '../../function/noop';
import { args } from '../_internal/args';
import { last } from '../array/last';
import { isPlainObject } from '../predicate/isPlainObject';

describe('cloneDeepWith', function () {
  function Foo(this: any) {
    this.a = 1;
  }
  Foo.prototype.b = 1;
  Foo.c = function () {};

  const map = new Map();
  map.set('a', 1);
  map.set('b', 2);

  const set = new Set();
  set.add(1);
  set.add(2);

  const objects = {
    '`arguments` objects': args,
    arrays: ['a', ''],
    'array-like objects': { 0: 'a', length: 1 },
    booleans: false,
    'boolean objects': Object(false),
    'date objects': new Date(),
    // eslint-disable-next-line
    // @ts-ignore
    'Foo instances': new Foo(),
    objects: { a: 0, b: 1, c: 2 },
    'objects with object values': { a: /a/, b: ['B'], c: { C: 1 } },
    maps: map,
    'null values': null,
    numbers: 0,
    'number objects': Object(0),
    regexes: /a/gim,
    sets: set,
    strings: 'a',
    'string objects': Object('a'),
    'undefined values': undefined,
  };

  objects.arrays.length = 3;

  const uncloneable: any = {
    functions: Foo,
    'async functions': async function () {},
    'generator functions': function* () {},
    'the `Proxy` constructor': Proxy,
  };

  const errors = [
    new Error(),
    new EvalError(),
    new RangeError(),
    new ReferenceError(),
    new SyntaxError(),
    new TypeError(),
    new URIError(),
  ];

  errors.forEach(error => {
    uncloneable[`${error.name}s`] = error;
  });

  it('`_.cloneDeepWith` should provide `stack` to `customizer`', () => {
    let actual: any;

    cloneDeepWith({ a: 1 }, function () {
      // eslint-disable-next-line prefer-rest-params
      actual = last(arguments);
    });

    expect(actual instanceof Map).toBe(true);
  });

  const methodName = 'cloneDeepWith';
  const func = cloneDeepWith;

  it(`\`_.${methodName}\` should provide correct \`customizer\` arguments`, () => {
    const argsList: any[] = [];
    // eslint-disable-next-line
    // @ts-ignore
    const object: any = new Foo();

    func(object, function () {
      const length = arguments.length;
      // eslint-disable-next-line prefer-rest-params
      const args = Array.prototype.slice.call(arguments, 0, length - (length > 1 ? 1 : 0));

      argsList.push(args);
    });

    expect(argsList).toEqual([
      [object, undefined, object],
      [1, 'a', object],
    ]);
  });

  it(`\`_.${methodName}\` should handle cloning when \`customizer\` returns \`undefined\``, () => {
    const actual = func({ a: { b: 'c' } }, noop);
    expect(actual).toEqual({ a: { b: 'c' } });
  });

  it(`\`_.${methodName}\` should handle cloning when \`customizer\` returns \`null\``, () => {
    const actual = func({ a: 1, b: 2 }, (_value, key) => (key === 'b' ? null : undefined));
    expect(actual).toEqual({ a: 1, b: null });
  });

  Object.entries(uncloneable).forEach(([value, key]) => {
    it(`\`_.${methodName}\` should work with a \`customizer\` callback and ${key}`, () => {
      const customizer = function (value: any) {
        return isPlainObject(value) ? undefined : value;
      };

      let actual: any = func(value, customizer);
      expect(actual).toBe(value);

      const object = { a: value, b: { c: value } };
      actual = func(object, customizer);

      expect(actual).toEqual(object);
      expect(actual).not.toBe(object);
    });
  });

  it('should match the type of lodash', () => {
    expectTypeOf(cloneDeepWith).toEqualTypeOf<typeof cloneDeepWithLodash>();
  });

  it('should clone objects with null prototype to have Object prototype (lodash compat)', () => {
    const objWithNullProto = Object.create(null);
    objWithNullProto.a = 1;
    objWithNullProto.b = 2;

    const cloned = cloneDeepWith(objWithNullProto);

    // The cloned object should have Object.prototype, not null prototype
    expect(Object.getPrototypeOf(cloned)).toBe(Object.prototype);
    expect(cloned.a).toBe(1);
    expect(cloned.b).toBe(2);
    expect(typeof cloned.toString).toBe('function');
  });

  it('should clone nested objects with null prototype to have Object prototype', () => {
    const obj = Object.create(null);
    obj.nested = Object.create(null);
    obj.nested.value = 42;

    const cloned = cloneDeepWith(obj);

    expect(Object.getPrototypeOf(cloned)).toBe(Object.prototype);
    expect(Object.getPrototypeOf(cloned.nested)).toBe(Object.prototype);
    expect(cloned.nested.value).toBe(42);
  });

  it('should clone objects with null prototype using customizer', () => {
    const objWithNullProto = Object.create(null);
    objWithNullProto.a = 1;
    objWithNullProto.b = 2;

    const cloned = cloneDeepWith(objWithNullProto, value => {
      if (typeof value === 'number') {
        return value * 2;
      }
      return undefined;
    });

    expect(Object.getPrototypeOf(cloned)).toBe(Object.prototype);
    expect(cloned.a).toBe(2);
    expect(cloned.b).toBe(4);
  });

  it('should handle circular references in objects with null prototype', () => {
    const obj: any = Object.create(null);
    obj.a = 1;
    obj.self = obj; // circular reference

    const cloned = cloneDeepWith(obj);

    expect(Object.getPrototypeOf(cloned)).toBe(Object.prototype);
    expect(cloned.self).toBe(cloned);
    expect(cloned.a).toBe(1);
  });
});
