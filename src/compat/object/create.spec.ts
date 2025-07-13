import { describe, expect, expectTypeOf, it } from 'vitest';
import { create } from 'es-toolkit/compat';
import { keys } from 'es-toolkit/compat';
import { map } from 'es-toolkit/compat';
import { isObject } from 'es-toolkit/compat';
import { stubTrue } from 'es-toolkit/compat';
import type { create as createLodash } from 'lodash';
import { falsey } from '../_internal/falsey';
import { primitives } from '../_internal/primitives';

describe('create', () => {
  function Shape(this: { x: number; y: number }) {
    this.x = 0;
    this.y = 0;
  }

  const Circle = function (this: any) {
    Shape.call(this);
  } as unknown as { new (): any };

  it('should create an object that inherits from the given `prototype` object', () => {
    Circle.prototype = create(Shape.prototype);
    Circle.prototype.constructor = Circle;

    const actual = new Circle();

    expect(actual instanceof Circle);
    expect(actual instanceof Shape);
    expect(Circle.prototype).not.toBe(Shape.prototype);
    // assert.notStrictEqual(Circle.prototype, Shape.prototype);
  });

  it('should assign `properties` to the created object', () => {
    const expected: any = { constructor: Circle, radius: 0 };
    const properties = Object.keys(expected);
    Circle.prototype = create(Shape.prototype, expected);

    const actual = new Circle();

    expect(actual instanceof Circle);
    expect(actual instanceof Shape);
    expect(Object.keys(Circle.prototype)).toEqual(properties);
    properties.forEach(property => {
      expect(Circle.prototype[property]).toBe(expected[property]);
    });
  });

  it('should assign own properties', () => {
    const Foo = function (this: { a: number; c: number }) {
      this.a = 1;
      this.c = 3;
    } as unknown as { new (): any };
    Foo.prototype.b = 2;

    const actual = create({}, new Foo());
    const expected: any = { a: 1, c: 3 };
    const properties = Object.keys(expected);

    expect(Object.keys(actual)).toEqual(properties);
    properties.forEach(property => {
      expect(actual[property]).toBe(expected[property]);
    });
  });

  it('should assign properties that shadow those of `prototype`', () => {
    const Foo = function (this: { a: number }) {
      this.a = 1;
    } as unknown as { new (): any };
    const object = create(new Foo(), { a: 1 });
    expect(keys(object)).toEqual(['a']);
  });

  it('should accept a falsey `prototype`', () => {
    // @ts-expect-error - should accept a falsey `prototype`
    const actual = map(falsey, (prototype, index) => (index ? create(prototype) : create()));

    actual.forEach(value => {
      expect(isObject(value));
    });
  });

  it('should accept a primitive `prototype`', () => {
    // @ts-expect-error - should accept a primitive `prototype`
    const actual = map(primitives, (value, index) => (index ? create(value) : create()));

    actual.forEach(value => {
      expect(isObject(value));
    });
  });

  it('should work as an iteratee for methods like `_.map`', () => {
    const array = [{ a: 1 }, { a: 1 }, { a: 1 }];
    const expected = map(array, stubTrue);
    const objects = map(array, create<{ a: number }, any>);

    const actual = map(objects, object => object.a === 1 && !keys(object).length);

    expect(actual).toEqual(expected);
  });

  it('should match the type of lodash', () => {
    expectTypeOf(create).toEqualTypeOf<typeof createLodash>();
  });
});
