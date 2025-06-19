import { describe, expect, it, expectTypeOf } from 'vitest';
import type { property as propertyLodash } from 'lodash';
import { property } from './property';
import { noop } from '../../function/noop';

describe('property', () => {
  it('should create a function that plucks a property value of a given object', () => {
    const object = { a: 1 };

    ['a', ['a']].forEach(path => {
      const prop = property(path);
      expect(prop.length).toBe(1);
      expect(prop(object)).toBe(1);
    });
  });

  it('should pluck deep property values', () => {
    const object = { a: { b: 2 } };

    ['a.b', ['a', 'b']].forEach(path => {
      const prop = property(path);
      expect(prop(object)).toBe(2);
    });
  });

  it('should pluck inherited property values', () => {
    function Foo() {}
    Foo.prototype.a = 1;

    ['a', ['a']].forEach(path => {
      const prop = property(path);
      expect(
        prop(
          // eslint-disable-next-line
          // @ts-ignore
          new Foo()
        )
      ).toBe(1);
    });
  });

  it('should work with a non-string `path`', () => {
    const array = [1, 2, 3];

    [1, [1]].forEach(path => {
      const prop = property(path);
      expect(prop(array)).toBe(2);
    });
  });

  it('should preserve the sign of `0`', () => {
    const object = { '-0': 'a', 0: 'b' };
    const props = [-0, Object(-0), 0, Object(0)];

    const actual = props.map(key => {
      const prop = property(key);
      return prop(object);
    });

    expect(actual).toEqual(['a', 'a', 'b', 'b']);
  });

  it('should pluck a key over a path', () => {
    const object = { 'a.b': 1, a: { b: 2 } };

    ['a.b', ['a.b']].forEach(path => {
      const prop = property(path);
      expect(prop(object)).toBe(1);
    });
  });

  it('should return `undefined` when `object` is nullish', () => {
    const values = [null, undefined];
    const expected = values.map(noop);

    ['constructor', ['constructor']].forEach(path => {
      const prop = property(path);

      const actual = values.map(value => prop(value));

      expect(actual).toEqual(expected);
    });
  });

  it('should return `undefined` for deep paths when `object` is nullish', () => {
    const values = [null, undefined];
    const expected = values.map(noop);

    ['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']].forEach(path => {
      const prop = property(path);

      const actual = values.map(value => prop(value));

      expect(actual).toEqual(expected);
    });
  });

  it('should return `undefined` if parts of `path` are missing', () => {
    const object = {};

    ['a', 'a[1].b.c', ['a'], ['a', '1', 'b', 'c']].forEach(path => {
      const prop = property(path);
      expect(prop(object)).toBe(undefined);
    });
  });

  it('should match the type of lodash', () => {
    expectTypeOf(property).toEqualTypeOf<typeof propertyLodash>();
  });
});
