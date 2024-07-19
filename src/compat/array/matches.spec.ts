import { describe, expect, it } from 'vitest';
import { matches } from './matches';
import { stubTrue } from '../_internal/stubTrue';
import { noop } from '../../function/noop';
import { empties } from '../_internal/empties';
import { numberProto } from '../_internal/numberProto';

describe('matches', () => {
  // it(`should perform a deep comparison between \`source\` and \`object\``, () => {
  //   let object: any = { a: 1, b: 2, c: 3 };
  //   let par = matches({ a: 1 });

  //   expect(par(object)).toBe(true);

  //   par = matches({ b: 1 });
  //   expect(par(object)).toBe(false);

  //   par = matches({ a: 1, c: 3 });
  //   expect(par(object)).toBe(true);

  //   par = matches({ c: 3, d: 4 });
  //   expect(par(object)).toBe(false);

  //   object = { a: { b: { c: 1, d: 2 }, e: 3 }, f: 4 };
  //   par = matches({ a: { b: { c: 1 } } });

  //   expect(par(object)).toBe(true);
  // });

  // it(`should match inherited string keyed \`object\` properties`, () => {
  //   interface Foo {
  //     a: number;
  //     b: number;
  //   }

  //   interface FooConstructor {
  //     new(): Foo;
  //   }

  //   const Foo = function Foo(this: Foo) {
  //     this.a = 1;
  //   } as any as FooConstructor;

  //   Foo.prototype.b = 2;

  //   const object = { a: new Foo() };
  //   const par = matches({ a: { b: 2 } });

  //   expect(par(object)).toBe(true);
  // });

  // it(`should not match by inherited \`source\` properties`, () => {
  //   interface Foo {
  //     a: number;
  //     b: number;
  //   }

  //   interface FooConstructor {
  //     new(): Foo;
  //   }

  //   const Foo = function Foo(this: Foo) {
  //     this.a = 1;
  //   } as any as FooConstructor;

  //   Foo.prototype.b = 2;

  //   const objects = [{ a: 1 }, { a: 1, b: 2 }];
  //   const source = new Foo();
  //   const actual = objects.map(matches(source));
  //   const expected = objects.map(stubTrue);

  //   expect(actual).toEqual(expected);
  // });

  // it(`should compare a variety of \`source\` property values`, () => {
  //   const object1 = { a: false, b: true, c: '3', d: 4, e: [5], f: { g: 6 } };
  //   const object2 = { a: 0, b: 1, c: 3, d: '4', e: ['5'], f: { g: '6' } };
  //   const par = matches(object1);

  //   expect(par(object1)).toBe(true);
  //   expect(par(object2)).toBe(false);
  // });

  // it(`should match \`-0\` as \`0\``, () => {
  //   const object1 = { a: -0 };
  //   const object2 = { a: 0 };
  //   let par = matches(object1);

  //   expect(par(object2)).toBe(true);

  //   par = matches(object2);
  //   expect(par(object1)).toBe(true);
  // });

  // it(`should compare functions by reference`, () => {
  //   const object1 = { a: noop };
  //   const object2 = { a: noop };
  //   const object3 = { a: {} };
  //   const par = matches(object1);

  //   expect(par(object1)).toBe(true);
  //   expect(par(object2)).toBe(false);
  //   expect(par(object3)).toBe(false);
  // });

  // it(`should work with a function for \`object\``, () => {
  //   function Foo() { }
  //   Foo.a = { b: 2, c: 3 };

  //   const par = matches({ a: { b: 2 } });
  //   expect(par(Foo)).toBe(true);
  // });

  // it(`should work with a function for \`source\``, () => {
  //   function Foo() { }
  //   Foo.a = 1;
  //   Foo.b = function () { };
  //   Foo.c = 3;

  //   const objects = [{ a: 1 }, { a: 1, b: Foo.b, c: 3 }];
  //   const actual = objects.map(matches(Foo));

  //   expect(actual).toEqual([false, true]);
  // });

  // it(`should work with a non-plain \`object\``, () => {
  //   interface Foo {
  //     a: number;
  //     b: number;
  //     c: number;
  //   }

  //   interface FooConstructor {
  //     new(arg: Partial<Foo>): Foo;
  //   }

  //   const Foo = function Foo(this: Foo, object: Partial<Foo>) {
  //     Object.assign(this, object);
  //   } as any as FooConstructor;

  //   const object = new Foo({ a: new Foo({ b: 2, c: 3 }) });
  //   const par = matches({ a: { b: 2 } });

  //   expect(par(object)).toBe(true);
  // });

  // it(`should partial match arrays`, () => {
  //   const objects = [{ a: ['b'] }, { a: ['c', 'd'] }];
  //   let actual = objects.filter(matches({ a: ['d'] }));

  //   expect(actual).toEqual([objects[1]]);

  //   actual = objects.filter(matches({ a: ['b', 'd'] }));
  //   expect(actual).toEqual([]);

  //   actual = objects.filter(matches({ a: ['d', 'b'] }));
  //   expect(actual).toEqual([]);
  // });

  // it(`should partial match arrays with duplicate values`, () => {
  //   const objects = [{ a: [1, 2] }, { a: [2, 2] }];
  //   const actual = objects.filter(matches({ a: [2, 2] }));

  //   expect(actual).toEqual([objects[1]]);
  // });

  // it('should partial match arrays of objects', () => {
  //   const objects = [
  //     {
  //       a: [
  //         { b: 1, c: 2 },
  //         { b: 4, c: 5, d: 6 },
  //       ],
  //     },
  //     {
  //       a: [
  //         { b: 1, c: 2 },
  //         { b: 4, c: 6, d: 7 },
  //       ],
  //     },
  //   ];

  //   const actual = objects.filter(matches({ a: [{ b: 1 }, { b: 4, c: 5 }] }));
  //   expect(actual).toEqual([objects[0]]);
  // });

  // it(`should partial match maps`, () => {
  //   if (Map) {
  //     const objects = [{ a: new Map() }, { a: new Map() }];
  //     objects[0].a.set('a', 1);
  //     objects[1].a.set('a', 1);
  //     objects[1].a.set('b', 2);

  //     const map = new Map();
  //     map.set('b', 2);
  //     let actual = objects.filter(matches({ a: map }));

  //     expect(actual).toEqual([objects[1]]);

  //     map.delete('b');
  //     actual = objects.filter(matches({ a: map }));

  //     expect(actual).toEqual(objects);

  //     map.set('c', 3);
  //     actual = objects.filter(matches({ a: map }));

  //     expect(actual).toEqual([]);
  //   }
  // });

  // it(`should partial match sets`, () => {
  //   if (Set) {
  //     const objects = [{ a: new Set() }, { a: new Set() }];
  //     objects[0].a.add(1);
  //     objects[1].a.add(1);
  //     objects[1].a.add(2);

  //     const set = new Set();
  //     set.add(2);
  //     let actual = objects.filter(matches({ a: set }));

  //     expect(actual).toEqual([objects[1]]);

  //     set.delete(2);
  //     actual = objects.filter(matches({ a: set }));

  //     expect(actual).toEqual(objects);

  //     set.add(3);
  //     actual = objects.filter(matches({ a: set }));

  //     expect(actual).toEqual([]);
  //   }
  // });

  // it(`should match \`undefined\` values`, () => {
  //   let objects = [{ a: 1 }, { a: 1, b: 1 }, { a: 1, b: undefined }];
  //   let actual = objects.map(matches({ b: undefined }));
  //   const expected = [false, false, true];

  //   expect(actual).toEqual(expected);

  //   actual = objects.map(matches({ a: 1, b: undefined }));

  //   expect(actual).toEqual(expected);

  //   objects = [{ a: { b: 2 } }, { a: { b: 2, c: 3 } }, { a: { b: 2, c: undefined } }];
  //   actual = objects.map(matches({ a: { c: undefined } }));

  //   expect(actual).toEqual(expected);
  // });

  // it(`should match \`undefined\` values on primitives`, () => {
  //   numberProto.a = 1;
  //   numberProto.b = undefined;

  //   try {
  //     var par = matches({ b: undefined });
  //     expect(par(1)).toBe(true);
  //   } catch (e: any) {
  //     expect(false, e.message)
  //   }
  //   try {
  //     par = matches({ a: 1, b: undefined });
  //     expect(par(1)).toBe(true);
  //   } catch (e: any) {
  //     expect(false, e.message)
  //   }
  //   numberProto.a = { b: 1, c: undefined };
  //   try {
  //     par = matches({ a: { c: undefined } });
  //     expect(par(1)).toBe(true);
  //   } catch (e: any) {
  //     expect(false, e.message)
  //   }
  //   delete numberProto.a;
  //   delete numberProto.b;
  // });

  // it(`should return \`false\` when \`object\` is nullish`, () => {
  //   const values = [, null, undefined];
  //   const expected = values.map(stubFalse);
  //   const par = matches({ a: 1 });

  //   const actual = values.map((value, index) => {
  //     try {
  //       return index ? par(value) : par();
  //     } catch (e: any) { }
  //   });

  //   expect(actual).toEqual(expected);
  // });

  // it(`should return \`true\` when comparing an empty \`source\``, () => {
  //   const object = { a: 1 };
  //   const expected = empties.map(stubTrue);

  //   const actual = empties.map((value) => {
  //     const par = matches(value);
  //     return par(object);
  //   });

  //   expect(actual).toEqual(expected);
  // });

  // it(`should return \`true\` when comparing an empty \`source\` to a nullish \`object\``, () => {
  //   const values = [, null, undefined];
  //   const expected = values.map(stubTrue);
  //   const par = matches({});

  //   const actual = values.map((value, index) => {
  //     try {
  //       return index ? par(value) : par();
  //     } catch (e: any) { }
  //   });

  //   expect(actual).toEqual(expected);
  // });

  // it(`should return \`true\` when comparing a \`source\` of empty arrays and objects`, () => {
  //   const objects = [
  //     { a: [1], b: { c: 1 } },
  //     { a: [2, 3], b: { d: 2 } },
  //   ];
  //   const actual = objects.filter(matches({ a: [], b: {} }));

  //   expect(actual).toEqual(objects);
  // });

  // it('should not change behavior if `source` is modified', () => {
  //   const sources = [{ a: { b: 2, c: 3 } }, { a: 1, b: 2 }, { a: 1 }];

  //   sources.forEach((source, index) => {
  //     const object = structuredClone(source);
  //     const par = matches(source);

  //     expect(par(object)).toBe(true);

  //     if (index) {
  //       source.a = 2;
  //       source.b = 1;
  //       source.c = 3;
  //     } else {
  //       source.a.b = 1;
  //       source.a.c = 2;
  //       source.a.d = 3;
  //     }
  //     expect(par(object)).toBe(true);
  //     expect(par(source)).toBe(false);
  //   });
  // });
});
