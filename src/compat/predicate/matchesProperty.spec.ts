import { describe, expect, it } from 'vitest';
import { matchesProperty } from './matchesProperty';
import { noop } from '../../function/noop';
import { range } from '../../math/range';
import { numberProto } from '../_internal/numberProto';
import { stubFalse } from '../_internal/stubFalse';
import { stubTrue } from '../_internal/stubTrue';
import { cloneDeep } from '../object/cloneDeep';

describe('matchesProperty', () => {
  it('should create a function that performs a deep comparison between a property value and `srcValue`', () => {
    let object: any = { a: 1, b: 2, c: 3 };
    let matches = matchesProperty('a', 1);

    expect(matches.length).toBe(1);
    expect(matches(object)).toBe(true);

    matches = matchesProperty('b', 3);
    expect(matches(object)).toBe(false);

    matches = matchesProperty('a', { a: 1, c: 3 });
    expect(matches({ a: object })).toBe(true);

    matches = matchesProperty('a', { c: 3, d: 4 });
    expect(matches(object)).toBe(false);

    object = { a: { b: { c: 1, d: 2 }, e: 3 }, f: 4 };
    matches = matchesProperty('a', { b: { c: 1 } });

    expect(matches(object)).toBe(true);
  });

  it('should support deep paths', () => {
    const object = { a: { b: 2 } };

    ['a.b', ['a', 'b']].forEach(path => {
      const matches = matchesProperty(path, 2);
      expect(matches(object)).toBe(true);
    });
  });

  it('should work with a non-string `path`', () => {
    const array = [1, 2, 3];

    [1, [1]].forEach(path => {
      const matches = matchesProperty(path, 2);
      expect(matches(array)).toBe(true);
    });
  });

  it('should preserve the sign of `0`', () => {
    const object1 = { '-0': 'a' };
    const object2 = { 0: 'b' };
    const pairs = [
      [object1, object2],
      [object1, object2],
      [object2, object1],
      [object2, object1],
    ];
    const props = [-0, Object(-0), 0, Object(0)];
    const values = ['a', 'a', 'b', 'b'];
    const expected = props.map(() => [true, false]);

    const actual = props.map((key, index) => {
      const matches = matchesProperty(key, values[index]);
      const pair = pairs[index];

      return [matches(pair[0]), matches(pair[1])];
    });

    expect(actual).toEqual(expected);
  });

  it('should coerce `path` to a string', () => {
    function fn() {}
    fn.toString = () => 'fn';

    const object: any = { null: 1, undefined: 2, fn: 3, '[object Object]': 4 };
    const paths: any[] = [null, undefined, fn, {}];
    const expected = paths.map(stubTrue);

    range(2).forEach(index => {
      const actual = paths.map(path => {
        const matches = matchesProperty(index ? [path] : path, object[path]);
        return matches(object);
      });

      expect(actual).toEqual(expected);
    });
  });

  it('should match a key over a path', () => {
    const object = { 'a.b': 1, a: { b: 2 } };

    ['a.b', ['a.b']].forEach(path => {
      const matches = matchesProperty(path, 1);
      expect(matches(object)).toBe(true);
    });
  });

  it('should return `false` when `object` is nullish', () => {
    // eslint-disable-next-line
    const values = [, null, undefined];
    const expected = values.map(stubFalse);

    ['constructor', ['constructor']].forEach(path => {
      const matches = matchesProperty(path, 1);

      const actual = values.map((value, index) => {
        try {
          return index ? matches(value) : matches();
          // eslint-disable-next-line
        } catch (e) {}
      });

      expect(actual).toEqual(expected);
    });
  });

  it('should return `false` for deep paths when `object` is nullish', () => {
    // eslint-disable-next-line
    const values = [, null, undefined];
    const expected = values.map(stubFalse);

    ['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']].forEach(path => {
      const matches = matchesProperty(path, 1);

      const actual = values.map((value, index) => {
        try {
          return index ? matches(value) : matches();
          // eslint-disable-next-line
        } catch (e) {}
      });

      expect(actual).toEqual(expected);
    });
  });

  it('should return `false` if parts of `path` are missing', () => {
    const object = {};

    ['a', 'a[1].b.c', ['a'], ['a', '1', 'b', 'c']].forEach(path => {
      const matches = matchesProperty(path, 1);
      expect(matches(object)).toBe(false);
    });
  });

  it('should match inherited string keyed `srcValue` properties', () => {
    function Foo() {}
    Foo.prototype.b = 2;

    // eslint-disable-next-line
    // @ts-ignore
    const object = { a: new Foo() };

    ['a', ['a']].forEach(path => {
      const matches = matchesProperty(path, { b: 2 });
      expect(matches(object)).toBe(true);
    });
  });

  it('should not match by inherited `srcValue` properties', () => {
    function Foo() {
      // eslint-disable-next-line
      // @ts-ignore
      this.a = 1;
    }
    Foo.prototype.b = 2;

    const objects = [{ a: { a: 1 } }, { a: { a: 1, b: 2 } }];
    const expected = objects.map(stubTrue);

    ['a', ['a']].forEach(path => {
      expect(
        objects.map(
          matchesProperty(
            path,
            // eslint-disable-next-line
            // @ts-ignore
            new Foo()
          )
        )
      ).toEqual(expected);
    });
  });

  it('should compare a variety of values', () => {
    const object1 = { a: false, b: true, c: '3', d: 4, e: [5], f: { g: 6 } };
    const object2 = { a: 0, b: 1, c: 3, d: '4', e: ['5'], f: { g: '6' } };
    const matches = matchesProperty('a', object1);

    expect(matches({ a: object1 })).toBe(true);
    expect(matches({ a: object2 })).toBe(false);
  });

  it('should match `-0` as `0`', () => {
    let matches = matchesProperty('a', -0);
    expect(matches({ a: 0 })).toBe(true);

    matches = matchesProperty('a', 0);
    expect(matches({ a: -0 })).toBe(true);
  });

  it('should compare functions by reference', () => {
    const object1 = { a: noop };
    const object2 = { a: () => {} };
    const object3 = { a: {} };
    const matches = matchesProperty('a', object1);

    expect(matches({ a: object1 })).toBe(true);
    expect(matches({ a: object2 })).toBe(false);
    expect(matches({ a: object3 })).toBe(false);
  });

  it('should work with a function for `srcValue`', () => {
    function Foo() {}
    Foo.a = 1;
    Foo.b = function () {};
    Foo.c = 3;

    const objects = [{ a: { a: 1 } }, { a: { a: 1, b: Foo.b, c: 3 } }];
    const actual = objects.map(matchesProperty('a', Foo));

    expect(actual).toEqual([false, true]);
  });

  it('should work with a non-plain `srcValue`', () => {
    // eslint-disable-next-line
    // @ts-ignore
    function Foo(object) {
      // eslint-disable-next-line
      // @ts-ignore
      Object.assign(this, object);
    }

    // eslint-disable-next-line
    // @ts-ignore
    const object = new Foo({ a: new Foo({ b: 1, c: 2 }) });
    const matches = matchesProperty('a', { b: 1 });

    expect(matches(object)).toBe(true);
  });

  it('should partial match arrays', () => {
    const objects = [{ a: ['b'] }, { a: ['c', 'd'] }];
    let actual = objects.filter(matchesProperty('a', ['d']));

    expect(actual).toEqual([objects[1]]);

    actual = objects.filter(matchesProperty('a', ['b', 'd']));
    expect(actual).toEqual([]);

    actual = objects.filter(matchesProperty('a', ['d', 'b']));
    expect(actual).toEqual([]);
  });

  it('should partial match arrays with duplicate values', () => {
    const objects = [{ a: [1, 2] }, { a: [2, 2] }];
    const actual = objects.filter(matchesProperty('a', [2, 2]));

    expect(actual).toEqual([objects[1]]);
  });

  it('should partial match arrays of objects', () => {
    const objects = [
      {
        a: [
          { a: 1, b: 2 },
          { a: 4, b: 5, c: 6 },
        ],
      },
      {
        a: [
          { a: 1, b: 2 },
          { a: 4, b: 6, c: 7 },
        ],
      },
    ];

    const actual = objects.filter(matchesProperty('a', [{ a: 1 }, { a: 4, b: 5 }]));
    expect(actual).toEqual([objects[0]]);
  });
  it('should partial match maps', () => {
    if (Map) {
      const objects = [{ a: new Map() }, { a: new Map() }];
      objects[0].a.set('a', 1);
      objects[1].a.set('a', 1);
      objects[1].a.set('b', 2);

      const map = new Map();
      map.set('b', 2);
      let actual = objects.filter(matchesProperty('a', map));

      expect(actual).toEqual([objects[1]]);

      map.delete('b');
      actual = objects.filter(matchesProperty('a', map));

      expect(actual).toEqual(objects);

      map.set('c', 3);
      actual = objects.filter(matchesProperty('a', map));

      expect(actual).toEqual([]);
    }
  });

  it('should partial match sets', () => {
    if (Set) {
      const objects = [{ a: new Set() }, { a: new Set() }];
      objects[0].a.add(1);
      objects[1].a.add(1);
      objects[1].a.add(2);

      const set = new Set();
      set.add(2);
      let actual = objects.filter(matchesProperty('a', set));

      expect(actual).toEqual([objects[1]]);

      set.delete(2);
      actual = objects.filter(matchesProperty('a', set));

      expect(actual).toEqual(objects);

      set.add(3);
      actual = objects.filter(matchesProperty('a', set));

      expect(actual).toEqual([]);
    }
  });

  it('should match `undefined` values', () => {
    let objects: any[] = [{ a: 1 }, { a: 1, b: 1 }, { a: 1, b: undefined }];
    let actual = objects.map(matchesProperty('b', undefined));
    const expected = [false, false, true];

    expect(actual).toEqual(expected);

    objects = [{ a: { a: 1 } }, { a: { a: 1, b: 1 } }, { a: { a: 1, b: undefined } }];
    actual = objects.map(matchesProperty('a', { b: undefined }));

    expect(actual).toEqual(expected);
  });

  it('should match `undefined` values of nested objects', () => {
    const object = { a: { b: undefined } };

    ['a.b', ['a', 'b']].forEach(path => {
      const matches = matchesProperty(path, undefined);
      expect(matches(object)).toBe(true);
    });

    ['a.a', ['a', 'a']].forEach(path => {
      const matches = matchesProperty(path, undefined);
      expect(matches(object)).toBe(false);
    });
  });

  it('should match `undefined` values on primitives', () => {
    numberProto.a = 1;
    numberProto.b = undefined;

    try {
      // eslint-disable-next-line
      var matches = matchesProperty('b', undefined);
      expect(matches(1)).toBe(true);
    } catch (e: any) {
      expect(false, e.message);
    }
    numberProto.a = { b: 1, c: undefined };
    try {
      matches = matchesProperty('a', { c: undefined });
      expect(matches(1)).toBe(true);
    } catch (e: any) {
      expect(false, e.message);
    }
    delete numberProto.a;
    delete numberProto.b;
  });

  it('should return `true` when comparing a `srcValue` of empty arrays and objects', () => {
    const objects = [
      { a: [1], b: { c: 1 } },
      { a: [2, 3], b: { d: 2 } },
    ];
    const matches = matchesProperty('a', { a: [], b: {} });

    const actual = objects.filter(object => matches({ a: object }));

    expect(actual).toEqual(objects);
  });

  it('should not change behavior if `srcValue` is modified', () => {
    [{ a: { b: 2, c: 3 } }, { a: 1, b: 2 }, { a: 1 }].forEach((source: any, index) => {
      const object = cloneDeep(source);
      const matches = matchesProperty('a', source);

      expect(matches({ a: object })).toBe(true);

      if (index) {
        source.a = 2;
        source.b = 1;
        source.c = 3;
      } else {
        source.a.b = 1;
        source.a.c = 2;
        source.a.d = 3;
      }
      expect(matches({ a: object })).toBe(true);
      expect(matches({ a: source })).toBe(false);
    });
  });

  it('should correctly match the boolean property value', () => {
    const truthy = { a: true };
    const falsey = { a: false };
    const matches = matchesProperty('a', false);

    expect(matches(truthy)).toBe(false);
    expect(matches(falsey)).toBe(true);
  });
});
