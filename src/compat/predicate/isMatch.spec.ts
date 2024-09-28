import { describe, expect, it } from 'vitest';
import { noop } from '../../function/noop';
import { empties } from '../_internal/empties';
import { stubTrue } from '../_internal/stubTrue';
import { isArrayMatch, isMapMatch, isMatch, isSetMatch } from './isMatch';

describe('isMatch', () => {
  it(`should perform a deep comparison between \`source\` and \`object\``, () => {
    const object: any = { a: 1, b: 2, c: 3 };

    expect(isMatch(object, { a: 1 })).toBe(true);
    expect(isMatch(object, { b: 2 })).toBe(true);
    expect(isMatch(object, { a: 1, c: 3 })).toBe(true);
    expect(isMatch(object, { c: 3, d: 4 })).toBe(false);
    expect(isMatch({ a: { b: { c: 1, d: 2 }, e: 3 }, f: 4 }, { a: { b: { c: 1 } } })).toBe(true);
  });

  it(`should match inherited string keyed \`object\` properties`, () => {
    interface Foo {
      a: number;
      b: number;
    }

    interface FooConstructor {
      new (): Foo;
    }

    const Foo = function Foo(this: Foo) {
      this.a = 1;
    } as any as FooConstructor;

    Foo.prototype.b = 2;

    const object = { a: new Foo() };
    expect(isMatch(object, { a: { b: 2 } })).toBe(true);
  });

  it(`should not match by inherited \`source\` properties`, () => {
    interface Foo {
      a: number;
      b: number;
    }

    interface FooConstructor {
      new (): Foo;
    }

    const Foo = function Foo(this: Foo) {
      this.a = 1;
    } as any as FooConstructor;

    Foo.prototype.b = 2;

    const objects = [{ a: 1 }, { a: 1, b: 2 }];
    const source = new Foo();
    const actual = objects.map(object => isMatch(object, source));
    const expected = objects.map(stubTrue);

    expect(actual).toEqual(expected);
  });

  it(`should compare a variety of \`source\` property values`, () => {
    const object1 = { a: false, b: true, c: '3', d: 4, e: [5], f: { g: 6 } };
    const object2 = { a: 0, b: 1, c: 3, d: '4', e: ['5'], f: { g: '6' } };

    expect(isMatch(object1, object1)).toBe(true);
    expect(isMatch(object2, object1)).toBe(false);
  });

  it(`should match \`-0\` as \`0\``, () => {
    const object1 = { a: -0 };
    const object2 = { a: 0 };

    expect(isMatch(object2, object1)).toBe(true);
    expect(isMatch(object1, object2)).toBe(true);
  });

  it(`should compare functions by reference`, () => {
    const object1 = { a: noop };
    const object2 = { a: () => {} };
    const object3 = { a: {} };

    expect(isMatch(object1, object1)).toBe(true);
    expect(isMatch(object2, object1)).toBe(false);
    expect(isMatch(object3, object1)).toBe(false);
  });

  it(`should work with a function for \`object\``, () => {
    function Foo() {}
    Foo.a = { b: 2, c: 3 };

    expect(isMatch(Foo, { a: { b: 2 } })).toBe(true);
  });

  it(`should work with a function for \`source\``, () => {
    function Foo() {}
    Foo.a = 1;
    Foo.b = function () {};
    Foo.c = 3;

    const objects = [{ a: 1 }, { a: 1, b: Foo.b, c: 3 }];
    const actual = objects.map(object => isMatch(object, Foo));

    expect(actual).toEqual([false, true]);
  });

  it(`should work with a non-plain \`object\``, () => {
    interface Foo {
      a: number;
      b: number;
      c: number;
    }

    interface FooConstructor {
      new (arg: Partial<Foo>): Foo;
    }

    const Foo = function Foo(this: Foo, object: Partial<Foo>) {
      Object.assign(this, object);
    } as any as FooConstructor;

    // eslint-disable-next-line
    // @ts-ignore
    const object = new Foo({ a: new Foo({ b: 2, c: 3 }) });

    expect(isMatch(object, { a: { b: 2 } })).toBe(true);
  });

  it(`should partial match arrays`, () => {
    const objects = [{ a: ['b'] }, { a: ['c', 'd'] }];
    let actual = objects.filter(x => isMatch(x, { a: ['d'] }));

    expect(actual).toEqual([objects[1]]);

    actual = objects.filter(x => isMatch(x, { a: ['b', 'd'] }));
    expect(actual).toEqual([]);

    actual = objects.filter(x => isMatch(x, { a: ['d', 'b'] }));
    expect(actual).toEqual([]);
  });

  it(`should partial match arrays with duplicate values`, () => {
    const objects = [{ a: [1, 2] }, { a: [2, 2] }];
    const actual = objects.filter(x => isMatch(x, { a: [2, 2] }));

    expect(actual).toEqual([objects[1]]);
  });

  it('should partial match arrays of objects', () => {
    const objects = [
      {
        a: [
          { b: 1, c: 2 },
          { b: 4, c: 5, d: 6 },
        ],
      },
      {
        a: [
          { b: 1, c: 2 },
          { b: 4, c: 6, d: 7 },
        ],
      },
    ];

    const actual = objects.filter(x => isMatch(x, { a: [{ b: 1 }, { b: 4, c: 5 }] }));
    expect(actual).toEqual([objects[0]]);
  });

  it(`should partial match maps`, () => {
    const objects = [{ a: new Map() }, { a: new Map() }];
    objects[0].a.set('a', 1);
    objects[1].a.set('a', 1);
    objects[1].a.set('b', 2);

    const map = new Map();
    map.set('b', 2);
    let actual = objects.filter(x => isMatch(x, { a: map }));

    expect(actual).toEqual([objects[1]]);

    map.delete('b');
    actual = objects.filter(x => isMatch(x, { a: map }));

    expect(actual).toEqual(objects);

    map.set('c', 3);
    actual = objects.filter(x => isMatch(x, { a: map }));

    expect(actual).toEqual([]);
  });

  it(`should partial match sets`, () => {
    const objects = [{ a: new Set() }, { a: new Set() }];
    objects[0].a.add(1);
    objects[1].a.add(1);
    objects[1].a.add(2);

    const set = new Set();
    set.add(2);
    let actual = objects.filter(x => isMatch(x, { a: set }));

    expect(actual).toEqual([objects[1]]);

    set.delete(2);
    actual = objects.filter(x => isMatch(x, { a: set }));

    expect(actual).toEqual(objects);

    set.add(3);
    actual = objects.filter(x => isMatch(x, { a: set }));

    expect(actual).toEqual([]);
  });

  it(`should match \`undefined\` values`, () => {
    const objects1 = [{ a: 1 }, { a: 1, b: 1 }, { a: 1, b: undefined }];
    const actual1 = objects1.map(x => isMatch(x, { b: undefined }));
    const expected1 = [false, false, true];

    expect(actual1).toEqual(expected1);

    const objects2 = [{ a: 1 }, { a: 1, b: 1 }, { a: 1, b: undefined }];
    const actual2 = objects2.map(x => isMatch(x, { a: 1, b: undefined }));
    const expected2 = [false, false, true];

    expect(actual2).toEqual(expected2);

    const objects3 = [
      { a: { b: 2 } },
      { a: { b: 2, c: 3 } },
      {
        a: { b: 2, c: undefined },
      },
    ];
    const actual3 = objects3.map(x => isMatch(x, { a: { c: undefined } }));
    const expected3 = [false, false, true];

    expect(actual3).toEqual(expected3);
  });

  it(`should match \`undefined\` values on primitives`, () => {
    const numberProto = Number.prototype;

    // eslint-disable-next-line
    // @ts-ignore
    numberProto.a = 1;
    // eslint-disable-next-line
    // @ts-ignore
    numberProto.b = undefined;

    try {
      expect(isMatch(1, { b: undefined })).toBe(true);
    } catch (e: any) {
      expect(false, e.message);
    }

    try {
      expect(isMatch(1, { a: 1, b: undefined })).toBe(true);
    } catch (e: any) {
      expect(false, e.message);
    }

    // eslint-disable-next-line
    // @ts-ignore
    numberProto.a = { b: 1, c: undefined };
    try {
      expect(isMatch(1, { a: { c: undefined } })).toBe(true);
    } catch (e: any) {
      expect(false, e.message);
    }

    // eslint-disable-next-line
    // @ts-ignore
    delete numberProto.a;
    // eslint-disable-next-line
    // @ts-ignore
    delete numberProto.b;
  });

  it(`should return \`false\` when \`object\` is nullish`, () => {
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined];
    const expected = values.map(() => false);

    const actual = values.map((value, index) => {
      try {
        return index ? isMatch(value, { a: 1 }) : isMatch(undefined, { a: 1 });
      } catch (e: unknown) {
        /* empty */
      }
    });

    expect(actual).toEqual(expected);
  });

  it(`should return \`true\` when comparing an empty \`source\``, () => {
    const object = { a: 1 };
    const expected = empties.map(stubTrue);

    const actual = empties.map(value => {
      return isMatch(object, value);
    });

    expect(actual).toEqual(expected);
  });

  it(`should return \`true\` when comparing an empty \`source\` to a nullish \`object\``, () => {
    // eslint-disable-next-line no-sparse-arrays
    const values = [, null, undefined];
    const expected = values.map(stubTrue);

    const actual = values.map((value, index) => {
      try {
        return index ? isMatch(value, {}) : isMatch(undefined, {});
      } catch (e: unknown) {
        /* empty */
      }
    });

    expect(actual).toEqual(expected);
  });

  it(`should return \`true\` when comparing a \`source\` of empty arrays and objects`, () => {
    const objects = [
      { a: [1], b: { c: 1 } },
      { a: [2, 3], b: { d: 2 } },
    ];
    const actual = objects.filter(x => isMatch(x, { a: [], b: {} }));

    expect(actual).toEqual(objects);
  });
});

describe('isMapMatch', () => {
  it('can match maps', () => {
    expect(
      isMapMatch(
        new Map([
          ['a', 1],
          ['b', 2],
        ]),
        new Map([
          ['a', 1],
          ['b', 2],
        ])
      )
    ).toBe(true);

    expect(
      isMapMatch(
        new Map([
          ['a', 1],
          ['b', 2],
          ['c', 3],
        ]),
        new Map([
          ['a', 1],
          ['b', 2],
        ])
      )
    ).toBe(true);

    expect(
      isMapMatch(
        new Map([['b', 2]]),
        new Map([
          ['a', 1],
          ['b', 2],
        ])
      )
    ).toBe(false);

    expect(
      isMapMatch(
        new Map([
          ['a', 2],
          ['b', 2],
        ]),
        new Map([
          ['a', 1],
          ['b', 2],
        ])
      )
    ).toBe(false);
  });

  it('returns true if source is empty', () => {
    const map = new Map();

    expect(
      isMapMatch(
        new Map([
          ['a', 2],
          ['b', 2],
        ]),
        map
      )
    ).toBe(true);
    expect(isMapMatch(1, map)).toBe(true);
    expect(isMapMatch('a', map)).toBe(true);
    expect(isMapMatch(new Set(), map)).toBe(true);
    expect(isMapMatch([1, 2, 3], map)).toBe(true);
    expect(isMapMatch({ a: 1, b: 2 }, map)).toBe(true);
  });

  it('returns false if source is not empty and targets that are not maps', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);

    expect(isMapMatch(1, map)).toBe(false);
    expect(isMapMatch('a', map)).toBe(false);
    expect(isMapMatch(new Set(), map)).toBe(false);
    expect(isMapMatch([1, 2, 3], map)).toBe(false);
    expect(isMapMatch({ a: 1, b: 2 }, map)).toBe(false);
  });
});

describe('isArrayMatch', () => {
  it('can match arrays', () => {
    expect(isArrayMatch([1, 2, 3], [2, 3])).toBe(true);
    expect(isArrayMatch([1, 2, 3, 4, 5], [1, 3, 5])).toBe(true);
    expect(isArrayMatch([1, 2, 3, 4, 5], [0, 1])).toBe(false);
  });

  it('can match arrays with duplicated values', () => {
    expect(isArrayMatch([2, 2], [2, 2])).toEqual(true);
    expect(isArrayMatch([1, 2], [2, 2])).toEqual(false);
  });

  it('returns true if source is empty', () => {
    expect(isArrayMatch([1, 2, 3], [])).toBe(true);
    expect(isArrayMatch(1, [])).toBe(true);
    expect(isArrayMatch(new Map(), [])).toBe(true);
    expect(isArrayMatch(new Set(), [])).toBe(true);
  });

  it('can match non-arrays', () => {
    expect(isArrayMatch(1, [2, 3])).toBe(false);
    expect(isArrayMatch(new Map(), [2, 3])).toBe(false);
    expect(isArrayMatch(new Set(), [2, 3])).toBe(false);
  });
});

describe('isSetMatch', () => {
  it('can match sets', () => {
    expect(isSetMatch(new Set([1, 2, 3]), new Set([1, 2, 3]))).toBe(true);
    expect(isSetMatch(new Set([1, 2, 3]), new Set([1, 2]))).toBe(true);
    expect(isSetMatch(new Set([1, 2]), new Set([1, 2, 3]))).toBe(false);
  });

  it('returns true if source is empty', () => {
    const set = new Set();

    expect(isSetMatch(new Set([1, 2, 3]), set)).toBe(true);
    expect(isSetMatch(1, set)).toBe(true);
    expect(isSetMatch('a', set)).toBe(true);
    expect(isSetMatch(new Set(), set)).toBe(true);
    expect(isSetMatch([1, 2, 3], set)).toBe(true);
    expect(isSetMatch({ a: 1, b: 2 }, set)).toBe(true);
  });

  it('returns false if source is not empty and target is not a map', () => {
    const set = new Set([1, 2, 3]);

    expect(isSetMatch(1, set)).toBe(false);
    expect(isSetMatch('a', set)).toBe(false);
    expect(isSetMatch(new Set(), set)).toBe(false);
    expect(isSetMatch([1, 2, 3], set)).toBe(false);
    expect(isSetMatch({ a: 1, b: 2 }, set)).toBe(false);
  });
});
