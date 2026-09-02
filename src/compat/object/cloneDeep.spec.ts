import { describe, expect, it } from 'vitest';
import { cloneDeep } from './cloneDeep';
import { range } from '../../math/range';
import { args } from '../_internal/args';
import { LARGE_ARRAY_SIZE } from '../_internal/LARGE_ARRAY_SIZE';
import { stubTrue } from '../util/stubTrue';

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

    // Arguments objects equality doesn't work properly in Vitest 2, so we need to check the properties manually
    expect(actual).toHaveProperty('0', 1);
    expect(actual).toHaveProperty('1', 2);
    expect(actual).toHaveProperty('2', 3);
    expect(actual).toHaveProperty('length', 3);
    expect(actual[Symbol.iterator]).toBe(args[Symbol.iterator]);

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

  it('should match lodash for a class instance with a custom `Symbol.toStringTag`', () => {
    class Tagged {
      items: string[] = [];
    }
    (Tagged.prototype as any)[Symbol.toStringTag] = 'Tagged';

    const source = { box: new Tagged() };
    const cloned = cloneDeep(source);

    expect(cloned.box).not.toBe(source.box);
    expect(cloned.box).toBeInstanceOf(Tagged);
  });

  it('should preserve an own __proto__ data property on a tagged class instance', () => {
    class Tagged {}
    (Tagged.prototype as any)[Symbol.toStringTag] = 'Tagged';

    const instance = new Tagged() as Tagged & { __proto__: { nested: { value: number } } };
    Object.defineProperty(instance, '__proto__', {
      configurable: true,
      enumerable: true,
      value: { nested: { value: 1 } },
      writable: true,
    });

    const cloned = cloneDeep(instance);

    expect(cloned).toBeInstanceOf(Tagged);
    expect(Object.hasOwn(cloned, '__proto__')).toBe(true);
    expect(cloned.__proto__).not.toBe(instance.__proto__);
    expect(cloned.__proto__).toEqual(instance.__proto__);
  });

  it('should ignore a deeper string tag shadowed by an own non-string tag', () => {
    class Tagged {
      nested = { value: 1 };
    }
    (Tagged.prototype as any)[Symbol.toStringTag] = 'Tagged';

    const instance = new Tagged() as Tagged & { [Symbol.toStringTag]: number };
    instance[Symbol.toStringTag] = 123;
    const cloned = cloneDeep(instance);

    expect(cloned).not.toBe(instance);
    expect(cloned.nested).not.toBe(instance.nested);
  });

  describe('custom `Symbol.toStringTag` placement', () => {
    class InheritedTag {
      nested = { value: 1 };
    }
    (InheritedTag.prototype as any)[Symbol.toStringTag] = 'InheritedTag';

    class OwnTag {
      nested = { value: 1 };

      constructor() {
        (this as any)[Symbol.toStringTag] = 'OwnTag';
      }
    }

    const restrictions: ReadonlyArray<
      readonly [name: string, restrict: (value: any) => any, cloneInherited: boolean, cloneOwn: boolean]
    > = [
      ['extensible', value => value, true, true],
      ['preventExtensions', value => Object.preventExtensions(value), false, true],
      ['sealed', value => Object.seal(value), false, true],
      ['frozen', value => Object.freeze(value), false, false],
    ];

    it.each(restrictions)(
      'should match lodash for inherited and own tags on a %s receiver',
      (_name, restrict, cloneInherited, cloneOwn) => {
        for (const [instance, shouldClone] of [
          [restrict(new InheritedTag()), cloneInherited],
          [restrict(new OwnTag()), cloneOwn],
        ] as const) {
          const rootClone = cloneDeep(instance);
          const nestedClone = cloneDeep({ instance }).instance;

          if (shouldClone) {
            expect(rootClone).not.toBe(instance);
            expect(rootClone).toBeInstanceOf(instance.constructor);
            expect(nestedClone).not.toBe(instance);
            expect(nestedClone).toBeInstanceOf(instance.constructor);
          } else {
            expect(rootClone).toEqual({});
            expect(Object.getPrototypeOf(rootClone)).toBe(Object.prototype);
            expect(nestedClone).toBe(instance);
          }
        }
      }
    );
  });

  it.each(['Tagged', 'Object', 'Map'])('should match lodash for a URL with an own writable %s tag', customTag => {
    const url = new URL('https://example.com/path');
    Object.defineProperty(url, Symbol.toStringTag, {
      configurable: true,
      enumerable: true,
      value: customTag,
      writable: true,
    });

    for (const cloned of [cloneDeep(url), cloneDeep({ url }).url]) {
      expect(cloned === url).toBe(false);
      expect(Object.getPrototypeOf(cloned)).toBe(URL.prototype);
      expect(Object.hasOwn(cloned, Symbol.toStringTag)).toBe(false);
      expect(() => cloned.href).toThrow(TypeError);
    }
  });

  it('should match lodash for an extensible URL subclass with an inherited writable tag', () => {
    class TaggedURL extends URL {}
    Object.defineProperty(TaggedURL.prototype, Symbol.toStringTag, {
      configurable: true,
      value: 'TaggedURL',
      writable: true,
    });

    const url = new TaggedURL('https://example.com/path');
    const clonedValues = [cloneDeep(url), cloneDeep({ url }).url];

    expect(clonedValues.map(cloned => cloned === url)).toEqual([false, false]);

    for (const cloned of clonedValues) {
      expect(Object.getPrototypeOf(cloned)).toBe(TaggedURL.prototype);
      expect(Object.hasOwn(cloned, Symbol.toStringTag)).toBe(false);
      expect(() => cloned.href).toThrow(TypeError);
    }
  });

  it('should preserve Lodash known-tag cloning when a writable tag cannot be masked', () => {
    class InheritedObjectTag {
      nested = { value: 1 };
    }
    Object.defineProperty(InheritedObjectTag.prototype, Symbol.toStringTag, {
      configurable: true,
      value: 'Object',
      writable: true,
    });

    class OwnObjectTag {
      nested = { value: 1 };

      constructor() {
        (this as any)[Symbol.toStringTag] = 'Object';
      }
    }

    const values = [Object.preventExtensions(new InheritedObjectTag()), Object.freeze(new OwnObjectTag())];

    for (const value of values) {
      const clonedValues = [cloneDeep(value), cloneDeep({ value }).value];

      expect(clonedValues.map(cloned => cloned === value)).toEqual([false, false]);
      for (const cloned of clonedValues) {
        expect(Object.getPrototypeOf(cloned)).toBe(Object.getPrototypeOf(value));
        expect(cloned.nested).not.toBe(value.nested);
      }
    }
  });

  it('should clone a constructor-less tagged value as a regular object like Lodash', () => {
    const value = Object.create(null);
    value[Symbol.toStringTag] = 'Tagged';
    value.nested = { value: 1 };
    value.self = value;

    for (const cloned of [cloneDeep(value), cloneDeep({ value }).value]) {
      expect(Object.getPrototypeOf(cloned)).toBe(Object.prototype);
      expect(Object.prototype.toString.call(cloned)).toBe('[object Tagged]');
      expect(cloned.nested).not.toBe(value.nested);
      expect(cloned.self).toBe(cloned);
    }
  });

  it('should keep an own __proto__ property on a constructor-less tagged value', () => {
    const value = Object.create(null);
    value[Symbol.toStringTag] = 'Tagged';
    Object.defineProperty(value, '__proto__', {
      configurable: true,
      enumerable: true,
      value: { polluted: true },
      writable: true,
    });

    for (const cloned of [cloneDeep(value), cloneDeep({ value }).value]) {
      expect(Object.getPrototypeOf(cloned)).toBe(Object.prototype);
      expect(Object.hasOwn(cloned, '__proto__')).toBe(true);
      expect(cloned.__proto__).not.toBe(value.__proto__);
      expect(cloned.__proto__).toEqual({ polluted: true });
    }
  });

  it('should use Object.prototype for a constructor-less tagged value with a custom prototype', () => {
    const prototype = { constructor: null };
    const value = Object.create(prototype);
    value[Symbol.toStringTag] = 'Tagged';
    value.nested = { value: 1 };

    for (const cloned of [cloneDeep(value), cloneDeep({ value }).value]) {
      expect(Object.getPrototypeOf(cloned)).toBe(Object.prototype);
      expect(cloned.nested).not.toBe(value.nested);
    }
  });

  it('should preserve the root fallback for an untagged value without a constructor', () => {
    const prototype = { constructor: null };
    const value = Object.create(prototype);
    value.nested = { value: 1 };

    const cloned = cloneDeep(value);

    expect(Object.getPrototypeOf(cloned)).toBe(Object.prototype);
    expect(cloned.nested).not.toBe(value.nested);
  });

  it('should preserve the prototype for a constructor-less value with a read-only known tag', () => {
    const prototype = { constructor: null };
    const value = Object.create(prototype);
    Object.defineProperty(value, Symbol.toStringTag, { value: 'Map' });

    for (const cloned of [cloneDeep(value), cloneDeep({ value }).value]) {
      expect(Object.getPrototypeOf(cloned)).toBe(prototype);
    }
  });

  it('should preserve specialized cloning when a built-in has no constructor', () => {
    const values = [
      [1, 2],
      new Date(0),
      /a/g,
      new Map([['key', { value: 1 }]]),
      new Set([{ value: 1 }]),
      new DataView(new Uint8Array([7, 8]).buffer),
      new Uint8Array([1, 2]),
      new Boolean(true),
      new Number(1),
      new String('a'),
    ];

    for (const [index, value] of values.entries()) {
      Object.defineProperty(value, 'constructor', { configurable: true, value: null, writable: true });

      const clonedValues = [cloneDeep({ value }).value];
      if (index < 7) {
        clonedValues.push(cloneDeep(value));
      }

      for (const cloned of clonedValues) {
        expect(cloned).not.toBe(value);
        expect(Object.getPrototypeOf(cloned)).toBe(Object.getPrototypeOf(value));
      }
    }
  });

  it('should match lodash for an unmodified URL at the root and when nested', () => {
    const url = new URL('https://example.com/path');

    expect(cloneDeep(url)).toEqual({});
    expect(cloneDeep({ url }).url).toBe(url);
  });

  it('should clone a tagged DataView while skipping its locked tag assignment', () => {
    const view = new DataView(new Uint8Array([7, 8]).buffer) as DataView & { nested: { value: number } };
    view.nested = { value: 1 };
    Object.defineProperty(view, Symbol.toStringTag, {
      configurable: true,
      enumerable: true,
      value: 'TaggedView',
      writable: true,
    });

    const cloned = cloneDeep(view);

    expect(cloned).not.toBe(view);
    expect(cloned).toBeInstanceOf(DataView);
    expect(cloned.getUint8(0)).toBe(7);
    expect(cloned.nested).not.toBe(view.nested);
    expect(Object.hasOwn(cloned, Symbol.toStringTag)).toBe(false);
    expect(Object.prototype.toString.call(cloned)).toBe('[object DataView]');
  });

  it.each(['accessor', 'read-only'] as const)(
    'should match lodash for a DataView with an %s custom tag',
    descriptorType => {
      const view = new DataView(new Uint8Array([7, 8]).buffer);
      const descriptor =
        descriptorType === 'accessor'
          ? { configurable: true, enumerable: true, get: () => 'TaggedView' }
          : { configurable: true, enumerable: true, value: 'TaggedView' };
      Object.defineProperty(view, Symbol.toStringTag, descriptor);

      expect(cloneDeep(view)).toEqual({});
      expect(cloneDeep({ view }).view).toBe(view);
    }
  );

  it('should propagate the compat policy through object, array, map, and set children', () => {
    class Tagged {
      nested = { value: 1 };
    }
    (Tagged.prototype as any)[Symbol.toStringTag] = 'Tagged';

    const tagged = Object.preventExtensions(new Tagged());
    const source = {
      object: { tagged },
      array: [tagged],
      map: new Map([['tagged', tagged]]),
      set: new Set([tagged]),
    };
    const cloned = cloneDeep(source);

    expect(cloned.object.tagged).toBe(tagged);
    expect(cloned.array[0]).toBe(tagged);
    expect(cloned.map.get('tagged')).toBe(tagged);
    expect([...cloned.set][0]).toBe(tagged);
  });

  it('should preserve cycles for a cloneable tagged instance', () => {
    class Tagged {
      self: Tagged = this;
    }
    (Tagged.prototype as any)[Symbol.toStringTag] = 'Tagged';

    const source = new Tagged();
    const cloned = cloneDeep(source);

    expect(cloned).not.toBe(source);
    expect(cloned.self).toBe(cloned);
  });

  it('should use the conservative fallback when the extensibility check throws', () => {
    const prototype = { [Symbol.toStringTag]: 'Tagged' };
    const target = Object.create(prototype);
    const value = new Proxy(target, {
      isExtensible() {
        throw new Error('isExtensible trap');
      },
    });

    expect(() => cloneDeep(value)).not.toThrow();
    expect(cloneDeep(value)).toEqual({});
    expect(cloneDeep({ value }).value).toBe(value);
  });
});
