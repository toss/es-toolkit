import { describe, expect, it } from 'vitest';
import { isEqual } from 'es-toolkit/compat';
import { noop } from '../../function/noop';
import { args } from '../_internal/args';
import { arrayViews } from '../_internal/arrayViews';
import { stubFalse } from '../_internal/stubFalse';

describe('isEqual', () => {
  const symbol1 = Symbol ? Symbol('a') : true;
  const symbol2 = Symbol ? Symbol('b') : false;

  it('should compare primitives', () => {
    const pairs = [
      [1, 1, true],
      [1, Object(1), true],
      [1, '1', false],
      [1, 2, false],
      [-0, -0, true],
      [0, 0, true],
      [0, Object(0), true],
      [Object(0), Object(0), true],
      [-0, 0, true],
      [0, '0', false],
      [0, null, false],
      [NaN, NaN, true],
      [NaN, Object(NaN), true],
      [Object(NaN), Object(NaN), true],
      [NaN, 'a', false],
      [NaN, Infinity, false],
      ['a', 'a', true],
      ['a', Object('a'), true],
      [Object('a'), Object('a'), true],
      ['a', 'b', false],
      ['a', ['a'], false],
      [true, true, true],
      [true, Object(true), true],
      [Object(true), Object(true), true],
      [true, 1, false],
      [true, 'a', false],
      [false, false, true],
      [false, Object(false), true],
      [Object(false), Object(false), true],
      [false, 0, false],
      [false, '', false],
      [symbol1, symbol1, true],
      [symbol1, Object(symbol1), true],
      [Object(symbol1), Object(symbol1), true],
      [symbol1, symbol2, false],
      [null, null, true],
      [null, undefined, false],
      [null, {}, false],
      [null, '', false],
      [undefined, undefined, true],
      [undefined, null, false],
      [undefined, '', false],
    ];

    const expected = pairs.map(pair => pair[2]);

    const actual = pairs.map(pair => isEqual(pair[0], pair[1]));

    expect(actual).toEqual(expected);
  });

  it('should compare arrays', () => {
    let array1: unknown[] = [true, null, 1, 'a', undefined];
    let array2: unknown[] = [true, null, 1, 'a', undefined];

    expect(isEqual(array1, array2)).toBe(true);

    array1 = [[1, 2, 3], new Date(2012, 4, 23), /x/, { e: 1 }];
    array2 = [[1, 2, 3], new Date(2012, 4, 23), /x/, { e: 1 }];

    expect(isEqual(array1, array2)).toBe(true);

    array1 = [1];
    array1[2] = 3;

    array2 = [1];
    array2[1] = undefined;
    array2[2] = 3;

    expect(isEqual(array1, array2)).toBe(true);

    array1 = [Object(1), false, Object('a'), /x/, new Date(2012, 4, 23), ['a', 'b', [Object('c')]], { a: 1 }];
    array2 = [1, Object(false), 'a', /x/, new Date(2012, 4, 23), ['a', Object('b'), ['c']], { a: 1 }];

    expect(isEqual(array1, array2)).toBe(true);

    array1 = [1, 2, 3];
    array2 = [3, 2, 1];

    expect(isEqual(array1, array2)).toBe(false);

    array1 = [1, 2];
    array2 = [1, 2, 3];

    expect(isEqual(array1, array2)).toBe(false);
  });

  it('should treat arrays with identical values but different non-index properties as equal', () => {
    let array1: any = [1, 2, 3];
    let array2: any = [1, 2, 3];

    array1.every =
      array1.filter =
      array1.forEach =
      array1.indexOf =
      array1.lastIndexOf =
      array1.map =
      array1.some =
      array1.reduce =
      array1.reduceRight =
        null;

    array2.concat =
      array2.join =
      array2.pop =
      array2.reverse =
      array2.shift =
      array2.slice =
      array2.sort =
      array2.splice =
      array2.unshift =
        null;

    expect(isEqual(array1, array2)).toBe(true);

    array1 = [1, 2, 3];
    array1.a = 1;

    array2 = [1, 2, 3];
    array2.b = 1;

    expect(isEqual(array1, array2)).toBe(true);

    array1 = /c/.exec('abcde');
    array2 = ['c'];

    expect(isEqual(array1, array2)).toBe(true);
  });

  it('should compare sparse arrays', () => {
    const array = Array(1);

    expect(isEqual(array, Array(1))).toBe(true);
    expect(isEqual(array, [undefined])).toBe(true);
    expect(isEqual(array, Array(2))).toBe(false);
  });

  it('should compare plain objects', () => {
    let object1: any = { a: true, b: null, c: 1, d: 'a', e: undefined };
    let object2: any = { a: true, b: null, c: 1, d: 'a', e: undefined };

    expect(isEqual(object1, object2)).toBe(true);

    object1 = { a: [1, 2, 3], b: new Date(2012, 4, 23), c: /x/, d: { e: 1 } };
    object2 = { a: [1, 2, 3], b: new Date(2012, 4, 23), c: /x/, d: { e: 1 } };

    expect(isEqual(object1, object2)).toBe(true);

    object1 = { a: 1, b: 2, c: 3 };
    object2 = { a: 3, b: 2, c: 1 };

    expect(isEqual(object1, object2)).toBe(false);

    object1 = { a: 1, b: 2, c: 3 };
    object2 = { d: 1, e: 2, f: 3 };

    expect(isEqual(object1, object2)).toBe(false);

    object1 = { a: 1, b: 2 };
    object2 = { a: 1, b: 2, c: 3 };

    expect(isEqual(object1, object2)).toBe(false);
  });

  it('should compare objects regardless of key order', () => {
    const object1 = { a: 1, b: 2, c: 3 };
    const object2 = { c: 3, a: 1, b: 2 };

    expect(isEqual(object1, object2)).toBe(true);
  });

  it('should compare nested objects', () => {
    const object1 = {
      a: [1, 2, 3],
      b: true,
      c: Object(1),
      d: 'a',
      e: {
        f: ['a', Object('b'), 'c'],
        g: Object(false),
        h: new Date(2012, 4, 23),
        i: noop,
        j: 'a',
      },
    };

    const object2 = {
      a: [1, Object(2), 3],
      b: Object(true),
      c: 1,
      d: Object('a'),
      e: {
        f: ['a', 'b', 'c'],
        g: false,
        h: new Date(2012, 4, 23),
        i: noop,
        j: 'a',
      },
    };

    expect(isEqual(object1, object2)).toBe(true);
  });

  it('should compare object instances', () => {
    function Foo() {
      // eslint-disable-next-line
      // @ts-ignore
      this.a = 1;
    }
    Foo.prototype.a = 1;

    function Bar() {
      // eslint-disable-next-line
      // @ts-ignore
      this.a = 1;
    }
    Bar.prototype.a = 2;

    // eslint-disable-next-line
    // @ts-ignore
    expect(isEqual(new Foo(), new Foo())).toBe(true);
    // eslint-disable-next-line
    // @ts-ignore
    expect(isEqual(new Foo(), new Bar())).toBe(false);
    // eslint-disable-next-line
    // @ts-ignore
    expect(isEqual({ a: 1 }, new Foo())).toBe(false);
    // eslint-disable-next-line
    // @ts-ignore
    expect(isEqual({ a: 2 }, new Bar())).toBe(false);
  });

  it('should compare objects with constructor properties', () => {
    expect(isEqual({ constructor: 1 }, { constructor: 1 })).toBe(true);
    expect(isEqual({ constructor: 1 }, { constructor: '1' })).toBe(false);
    expect(isEqual({ constructor: [1] }, { constructor: [1] })).toBe(true);
    expect(isEqual({ constructor: [1] }, { constructor: ['1'] })).toBe(false);
    expect(isEqual({ constructor: Object }, {})).toBe(false);
  });

  it('should compare arrays with circular references', () => {
    let array1: any[] = [];
    let array2: any[] = [];

    array1.push(array1);
    array2.push(array2);

    expect(isEqual(array1, array2)).toBe(true);

    array1.push('b');
    array2.push('b');

    expect(isEqual(array1, array2)).toBe(true);

    array1.push('c');
    array2.push('d');

    expect(isEqual(array1, array2)).toBe(false);

    array1 = ['a', 'b', 'c'];
    array1[1] = array1;
    array2 = ['a', ['a', 'b', 'c'], 'c'];

    expect(isEqual(array1, array2)).toBe(false);
  });

  it('should have transitive equivalence for circular references of arrays', () => {
    const array1: any[] = [];
    const array2: any[] = [array1];
    const array3: any[] = [array2];

    array1[0] = array1;

    expect(isEqual(array1, array2)).toBe(true);
    expect(isEqual(array2, array3)).toBe(true);
    expect(isEqual(array1, array3)).toBe(true);
  });

  it('should compare objects with circular references', () => {
    let object1: any = {};
    let object2: any = {};

    object1.a = object1;
    object2.a = object2;

    expect(isEqual(object1, object2)).toBe(true);

    object1.b = 0;
    object2.b = Object(0);

    expect(isEqual(object1, object2)).toBe(true);

    object1.c = Object(1);
    object2.c = Object(2);

    expect(isEqual(object1, object2)).toBe(false);

    object1 = { a: 1, b: 2, c: 3 };
    object1.b = object1;
    object2 = { a: 1, b: { a: 1, b: 2, c: 3 }, c: 3 };

    expect(isEqual(object1, object2)).toBe(false);
  });

  it('should have transitive equivalence for circular references of objects', () => {
    const object1: any = {};
    const object2: any = { a: object1 };
    const object3: any = { a: object2 };

    object1.a = object1;

    expect(isEqual(object1, object2)).toBe(true);
    expect(isEqual(object2, object3)).toBe(true);
    expect(isEqual(object1, object3)).toBe(true);
  });

  it('should compare objects with multiple circular references', () => {
    const array1: any = [{}];
    const array2: any = [{}];

    (array1[0].a = array1).push(array1);
    (array2[0].a = array2).push(array2);

    expect(isEqual(array1, array2)).toBe(true);

    array1[0].b = 0;
    array2[0].b = Object(0);

    expect(isEqual(array1, array2)).toBe(true);

    array1[0].c = Object(1);
    array2[0].c = Object(2);

    expect(isEqual(array1, array2)).toBe(false);
  });

  it('should compare objects with complex circular references', () => {
    const object1: any = {
      foo: { b: { c: { d: {} } } },
      bar: { a: 2 },
    };

    const object2: any = {
      foo: { b: { c: { d: {} } } },
      bar: { a: 2 },
    };

    object1.foo.b.c.d = object1;
    object1.bar.b = object1.foo.b;

    object2.foo.b.c.d = object2;
    object2.bar.b = object2.foo.b;

    expect(isEqual(object1, object2)).toBe(true);
  });

  it('should compare objects with shared property values', () => {
    const object1: any = {
      a: [1, 2],
    };

    const object2: any = {
      a: [1, 2],
      b: [1, 2],
    };

    object1.b = object1.a;

    expect(isEqual(object1, object2)).toBe(true);
  });

  it('should treat objects created by `Object.create(null)` like plain objects', () => {
    function Foo() {
      // eslint-disable-next-line
      // @ts-ignore
      this.a = 1;
    }
    Foo.prototype.constructor = null;

    const object1 = Object.create(null);
    object1.a = 1;

    const object2 = { a: 1 };

    expect(isEqual(object1, object2)).toBe(true);
    // eslint-disable-next-line
    // @ts-ignore
    expect(isEqual(new Foo(), object2)).toBe(false);
  });

  it('should avoid common type coercions', () => {
    expect(isEqual(true, Object(false))).toBe(false);
    expect(isEqual(Object(false), Object(0))).toBe(false);
    expect(isEqual(false, Object(''))).toBe(false);
    expect(isEqual(Object(36), Object('36'))).toBe(false);
    expect(isEqual(0, '')).toBe(false);
    expect(isEqual(1, true)).toBe(false);
    expect(isEqual(1337756400000, new Date(2012, 4, 23))).toBe(false);
    expect(isEqual('36', 36)).toBe(false);
    expect(isEqual(36, '36')).toBe(false);
  });

  it('should compare `arguments` objects', () => {
    const args1 = (function () {
      // eslint-disable-next-line
      return arguments;
    })();
    const args2 = (function () {
      // eslint-disable-next-line
      return arguments;
    })();
    // eslint-disable-next-line
    const args3 = (function (..._: any[]) {
      // eslint-disable-next-line
      return arguments;
    })(1, 2);

    expect(isEqual(args1, args2)).toBe(true);
    expect(isEqual(args1, args3)).toBe(false);
  });

  it('should treat `arguments` objects like `Object` objects', () => {
    const object = { 0: 1, 1: 2, 2: 3 };

    function Foo() {}
    Foo.prototype = object;

    expect(isEqual(args, object)).toBe(true);
    expect(isEqual(object, args)).toBe(true);
    // eslint-disable-next-line
    // @ts-ignore
    expect(isEqual(args, new Foo())).toBe(false);
    // eslint-disable-next-line
    // @ts-ignore
    expect(isEqual(new Foo(), args)).toBe(false);
  });

  it('should compare array buffers', () => {
    const buffer = new Int8Array([-1]).buffer;

    expect(isEqual(buffer, new Uint8Array([255]).buffer)).toBe(true);
    expect(isEqual(buffer, new ArrayBuffer(1))).toBe(false);
  });

  it('should compare array views', () => {
    const pairs = arrayViews.map((type, viewIndex) => {
      const otherType = arrayViews[(viewIndex + 1) % arrayViews.length];
      const CtorA =
        // eslint-disable-next-line
        // @ts-ignore
        globalThis[type] ||
        // eslint-disable-next-line
        // @ts-ignore
        function (n) {
          // eslint-disable-next-line
          // @ts-ignore
          this.n = n;
        };
      const CtorB =
        // eslint-disable-next-line
        // @ts-ignore
        globalThis[otherType] ||
        // eslint-disable-next-line
        // @ts-ignore
        function (n) {
          // eslint-disable-next-line
          // @ts-ignore
          this.n = n;
        };
      // eslint-disable-next-line
      // @ts-ignore
      const bufferA = globalThis[type] ? new ArrayBuffer(8) : 8;
      // eslint-disable-next-line
      // @ts-ignore
      const bufferB = globalThis[otherType] ? new ArrayBuffer(8) : 8;
      // eslint-disable-next-line
      // @ts-ignore
      const bufferC = globalThis[otherType] ? new ArrayBuffer(16) : 16;

      return [new CtorA(bufferA), new CtorA(bufferA), new CtorB(bufferB), new CtorB(bufferC)];
    });

    const expected = pairs.map(() => [true, false, false]);

    const actual = pairs.map(pair => [isEqual(pair[0], pair[1]), isEqual(pair[0], pair[2]), isEqual(pair[2], pair[3])]);

    expect(actual).toEqual(expected);
  });

  it('should compare buffers', () => {
    const buffer = Buffer.from([1]);

    expect(isEqual(buffer, Buffer.from([1]))).toBe(true);
    expect(isEqual(buffer, Buffer.from([2]))).toBe(false);
    expect(isEqual(buffer, new Uint8Array([1]))).toBe(false);
  });

  it('should compare date objects', () => {
    const date = new Date(2012, 4, 23);

    expect(isEqual(date, new Date(2012, 4, 23))).toBe(true);
    expect(isEqual(new Date('a'), new Date('b'))).toBe(true);
    expect(isEqual(date, new Date(2013, 3, 25))).toBe(false);
    expect(isEqual(date, { getTime: () => Number(date) })).toBe(false);
  });

  it('should compare error objects', () => {
    const pairs = ['Error', 'EvalError', 'RangeError', 'ReferenceError', 'SyntaxError', 'TypeError', 'URIError'].map(
      (type, index, errorTypes) => {
        const otherType = errorTypes[++index % errorTypes.length];
        // eslint-disable-next-line
        // @ts-ignore
        const CtorA = globalThis[type];
        // eslint-disable-next-line
        // @ts-ignore
        const CtorB = globalThis[otherType];

        return [new CtorA('a'), new CtorA('a'), new CtorB('a'), new CtorB('b')];
      }
    );

    const expected = pairs.map(() => [true, false, false]);

    const actual = pairs.map(pair => [isEqual(pair[0], pair[1]), isEqual(pair[0], pair[2]), isEqual(pair[2], pair[3])]);

    expect(actual).toEqual(expected);
  });

  it('should compare functions', () => {
    function a() {
      return 1 + 2;
    }
    function b() {
      return 1 + 2;
    }

    expect(isEqual(a, a)).toBe(true);
    expect(isEqual(a, b)).toBe(false);
  });

  it('should compare maps', () => {
    [[new Map(), new Map()]].forEach(maps => {
      const map1 = maps[0];
      const map2 = maps[1];

      map1.set('a', 1);
      map2.set('b', 2);
      expect(isEqual(map1, map2)).toBe(false);

      map1.set('b', 2);
      map2.set('a', 1);
      expect(isEqual(map1, map2)).toBe(true);

      map1.delete('a');
      map1.set('a', 1);
      expect(isEqual(map1, map2)).toBe(true);

      map2.delete('a');
      expect(isEqual(map1, map2)).toBe(false);

      map1.clear();
      map2.clear();
    });
  });

  it('should compare maps with circular references', () => {
    const map1 = new Map();
    const map2 = new Map();

    map1.set('a', map1);
    map2.set('a', map2);
    expect(isEqual(map1, map2)).toBe(true);

    map1.set('b', 1);
    map2.set('b', 2);
    expect(isEqual(map1, map2)).toBe(false);
  });

  it('should compare promises by reference', () => {
    [[Promise.resolve(1), Promise.resolve(1)]].forEach(promises => {
      const promise1 = promises[0];
      const promise2 = promises[1];

      expect(isEqual(promise1, promise2)).toBe(false);
      expect(isEqual(promise1, promise1)).toBe(true);
    });
  });

  it('should compare regexes', () => {
    expect(isEqual(/x/gim, /x/gim)).toBe(true);
    expect(isEqual(/x/gim, /x/gim)).toBe(true);
    expect(isEqual(/x/gi, /x/g)).toBe(false);
    expect(isEqual(/x/, /y/)).toBe(false);

    expect(isEqual(/x/g, { global: true, ignoreCase: false, multiline: false, source: 'x' })).toBe(false);
  });

  it('should compare sets', () => {
    [[new Set(), new Set()]].forEach(sets => {
      const set1 = sets[0];
      const set2 = sets[1];

      set1.add(1);
      set2.add(2);
      expect(isEqual(set1, set2)).toBe(false);

      set1.add(2);
      set2.add(1);
      expect(isEqual(set1, set2)).toBe(true);

      set1.delete(1);
      set1.add(1);
      expect(isEqual(set1, set2)).toBe(true);

      set2.delete(1);
      expect(isEqual(set1, set2)).toBe(false);

      set1.clear();
      set2.clear();
    });
  });

  it('should compare sets with circular references', () => {
    const set1 = new Set();
    const set2 = new Set();

    set1.add(set1);
    set2.add(set2);
    expect(isEqual(set1, set2)).toBe(true);

    set1.add(1);
    set2.add(2);
    expect(isEqual(set1, set2)).toBe(false);
  });

  it('should compare symbol properties', () => {
    const symbol1 = Symbol('a');
    const symbol2 = Symbol('b');

    const object1: any = { a: 1 };
    const object2: any = { a: 1 };

    object1[symbol1] = { a: { b: 2 } };
    object2[symbol1] = { a: { b: 2 } };

    Object.defineProperty(object2, symbol2, {
      configurable: true,
      enumerable: false,
      writable: true,
      value: 2,
    });

    expect(isEqual(object1, object2)).toBe(true);

    object2[symbol1] = { a: 1 };

    expect(isEqual(object1, object2)).toBe(false);

    delete object2[symbol1];
    object2[Symbol('a')] = { a: { b: 2 } };
    expect(isEqual(object1, object2)).toBe(false);
  });

  it('should return `false` for objects with custom `toString` methods', () => {
    let primitive: any;
    const object = {
      toString: function () {
        return primitive;
      },
    };
    const values = [true, null, 1, 'a', undefined];
    const expected = values.map(stubFalse);

    const actual = values.map(value => {
      primitive = value;
      return isEqual(object, value);
    });

    expect(actual).toEqual(expected);
  });
});
