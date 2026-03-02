import { describe, expect, it } from 'vitest';
import { isEqualWith } from './isEqualWith';
import { args } from '../compat/_internal/args';
import { arrayViews } from '../compat/_internal/arrayViews';
import { stubFalse } from '../compat/util/stubFalse';
import { noop } from '../function';

describe('isEqualWith', () => {
  const symbol1 = Symbol ? Symbol('a') : true;
  const symbol2 = Symbol ? Symbol('b') : false;

  it('should use the customizer function for string comparison', () => {
    const customizer = (a: any, b: any) => {
      if (typeof a === 'string' && typeof b === 'string') {
        return a.toLowerCase() === b.toLowerCase();
      }
    };

    expect(isEqualWith('Hello', 'hello', customizer)).toBe(true);
    expect(isEqualWith('Hello', 'world', customizer)).toBe(false);
  });

  it('should use the customizer function for number comparison', () => {
    const customizer = (a: any, b: any) => {
      if (typeof a === 'number' && typeof b === 'number') {
        return Math.abs(a - b) < 0.01;
      }
    };

    expect(isEqualWith(1.001, 1.002, customizer)).toBe(true);
    expect(isEqualWith(1.001, 1.02, customizer)).toBe(false);
  });

  it('should use the customizer function for object comparison', () => {
    const customizer = (a: any, b: any, key?: PropertyKey) => {
      if (key === 'date' && a instanceof Date && b instanceof Date) {
        return a.getFullYear() === b.getFullYear();
      }
    };

    const obj1 = { name: 'John', date: new Date('2023-02-01') };
    const obj2 = { name: 'John', date: new Date('2023-06-15') };
    const obj3 = { name: 'John', date: new Date('2024-02-01') };

    expect(isEqualWith(obj1, obj2, customizer)).toBe(true);
    expect(isEqualWith(obj1, obj3, customizer)).toBe(false);
  });

  it('should use the customizer function with parent objects', () => {
    const customizer = (a: any, b: any, key?: PropertyKey, aParent?: any, bParent?: any) => {
      if (key === 'value' && aParent && bParent && aParent.type === 'special' && bParent.type === 'special') {
        return String(a) === String(b);
      }
    };

    const obj1 = { type: 'special', value: 42 };
    const obj2 = { type: 'special', value: '42' };
    const obj3 = { type: 'normal', value: 42 };
    const obj4 = { type: 'normal', value: '42' };

    expect(isEqualWith(obj1, obj2, customizer)).toBe(true);
    expect(isEqualWith(obj1, obj3, customizer)).toBe(false);
    expect(isEqualWith(obj3, obj4, customizer)).toBe(false);
  });

  it('should compare primitives when customizer returns undefined', () => {
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

    const actual = pairs.map(pair => isEqualWith(pair[0], pair[1], noop));

    expect(actual).toEqual(expected);
  });

  it('should compare arrays when customizer returns undefined', () => {
    let array1: unknown[] = [true, null, 1, 'a', undefined];
    let array2: unknown[] = [true, null, 1, 'a', undefined];

    expect(isEqualWith(array1, array2, noop)).toBe(true);

    array1 = [[1, 2, 3], new Date(2012, 4, 23), /x/, { e: 1 }];
    array2 = [[1, 2, 3], new Date(2012, 4, 23), /x/, { e: 1 }];

    expect(isEqualWith(array1, array2, noop)).toBe(true);

    array1 = [1];
    array1[2] = 3;

    array2 = [1];
    array2[1] = undefined;
    array2[2] = 3;

    expect(isEqualWith(array1, array2, noop)).toBe(true);

    array1 = [Object(1), false, Object('a'), /x/, new Date(2012, 4, 23), ['a', 'b', [Object('c')]], { a: 1 }];
    array2 = [1, Object(false), 'a', /x/, new Date(2012, 4, 23), ['a', Object('b'), ['c']], { a: 1 }];

    expect(isEqualWith(array1, array2, noop)).toBe(true);

    array1 = [1, 2, 3];
    array2 = [3, 2, 1];

    expect(isEqualWith(array1, array2, noop)).toBe(false);

    array1 = [1, 2];
    array2 = [1, 2, 3];

    expect(isEqualWith(array1, array2, noop)).toBe(false);
  });

  it('should treat arrays with identical values but different non-index properties as equal when customizer returns undefined', () => {
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

    expect(isEqualWith(array1, array2, noop)).toBe(true);

    array1 = [1, 2, 3];
    array1.a = 1;

    array2 = [1, 2, 3];
    array2.b = 1;

    expect(isEqualWith(array1, array2, noop)).toBe(true);

    array1 = /c/.exec('abcde');
    array2 = ['c'];

    expect(isEqualWith(array1, array2, noop)).toBe(true);
  });

  it('should compare sparse arrays when customizer returns undefined', () => {
    const array = Array(1);

    expect(isEqualWith(array, Array(1), noop)).toBe(true);
    expect(isEqualWith(array, [undefined], noop)).toBe(true);
    expect(isEqualWith(array, Array(2), noop)).toBe(false);
  });

  it('should compare plain objects when customizer returns undefined', () => {
    let object1: any = { a: true, b: null, c: 1, d: 'a', e: undefined };
    let object2: any = { a: true, b: null, c: 1, d: 'a', e: undefined };

    expect(isEqualWith(object1, object2, noop)).toBe(true);

    object1 = { a: [1, 2, 3], b: new Date(2012, 4, 23), c: /x/, d: { e: 1 } };
    object2 = { a: [1, 2, 3], b: new Date(2012, 4, 23), c: /x/, d: { e: 1 } };

    expect(isEqualWith(object1, object2, noop)).toBe(true);

    object1 = { a: 1, b: 2, c: 3 };
    object2 = { a: 3, b: 2, c: 1 };

    expect(isEqualWith(object1, object2, noop)).toBe(false);

    object1 = { a: 1, b: 2, c: 3 };
    object2 = { d: 1, e: 2, f: 3 };

    expect(isEqualWith(object1, object2, noop)).toBe(false);

    object1 = { a: 1, b: 2 };
    object2 = { a: 1, b: 2, c: 3 };

    expect(isEqualWith(object1, object2, noop)).toBe(false);
  });

  it('should compare objects regardless of key order when customizer returns undefined', () => {
    const object1 = { a: 1, b: 2, c: 3 };
    const object2 = { c: 3, a: 1, b: 2 };

    expect(isEqualWith(object1, object2, noop)).toBe(true);
  });

  it('should compare nested objects when customizer returns undefined', () => {
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

    expect(isEqualWith(object1, object2, noop)).toBe(true);
  });

  it('should compare object instances when customizer returns undefined', () => {
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
    expect(isEqualWith(new Foo(), new Foo(), noop)).toBe(true);
    // eslint-disable-next-line
    // @ts-ignore
    expect(isEqualWith(new Foo(), new Bar(), noop)).toBe(false);
    // eslint-disable-next-line
    // @ts-ignore
    expect(isEqualWith({ a: 1 }, new Foo(), noop)).toBe(false);
    // eslint-disable-next-line
    // @ts-ignore
    expect(isEqualWith({ a: 2 }, new Bar(), noop)).toBe(false);
  });

  it('should compare objects with constructor properties when customizer returns undefined', () => {
    expect(isEqualWith({ constructor: 1 }, { constructor: 1 }, noop)).toBe(true);
    expect(isEqualWith({ constructor: 1 }, { constructor: '1' }, noop)).toBe(false);
    expect(isEqualWith({ constructor: [1] }, { constructor: [1] }, noop)).toBe(true);
    expect(isEqualWith({ constructor: [1] }, { constructor: ['1'] }, noop)).toBe(false);
    expect(isEqualWith({ constructor: Object }, {}, noop)).toBe(false);
  });

  it('should compare arrays with circular references when customizer returns undefined', () => {
    let array1: any[] = [];
    let array2: any[] = [];

    array1.push(array1);
    array2.push(array2);

    expect(isEqualWith(array1, array2, noop)).toBe(true);

    array1.push('b');
    array2.push('b');

    expect(isEqualWith(array1, array2, noop)).toBe(true);

    array1.push('c');
    array2.push('d');

    expect(isEqualWith(array1, array2, noop)).toBe(false);

    array1 = ['a', 'b', 'c'];
    array1[1] = array1;
    array2 = ['a', ['a', 'b', 'c'], 'c'];

    expect(isEqualWith(array1, array2, noop)).toBe(false);
  });

  it('should have transitive equivalence for circular references of arrays when customizer returns undefined', () => {
    const array1: any[] = [];
    const array2: any[] = [array1];
    const array3: any[] = [array2];

    array1[0] = array1;

    expect(isEqualWith(array1, array2, noop)).toBe(true);
    expect(isEqualWith(array2, array3, noop)).toBe(true);
    expect(isEqualWith(array1, array3, noop)).toBe(true);
  });

  it('should compare objects with circular references when customizer returns undefined', () => {
    let object1: any = {};
    let object2: any = {};

    object1.a = object1;
    object2.a = object2;

    expect(isEqualWith(object1, object2, noop)).toBe(true);

    object1.b = 0;
    object2.b = Object(0);

    expect(isEqualWith(object1, object2, noop)).toBe(true);

    object1.c = Object(1);
    object2.c = Object(2);

    expect(isEqualWith(object1, object2, noop)).toBe(false);

    object1 = { a: 1, b: 2, c: 3 };
    object1.b = object1;
    object2 = { a: 1, b: { a: 1, b: 2, c: 3 }, c: 3 };

    expect(isEqualWith(object1, object2, noop)).toBe(false);
  });

  it('should have transitive equivalence for circular references of objects when customizer returns undefined', () => {
    const object1: any = {};
    const object2: any = { a: object1 };
    const object3: any = { a: object2 };

    object1.a = object1;

    expect(isEqualWith(object1, object2, noop)).toBe(true);
    expect(isEqualWith(object2, object3, noop)).toBe(true);
    expect(isEqualWith(object1, object3, noop)).toBe(true);
  });

  it('should compare objects with multiple circular references when customizer returns undefined', () => {
    const array1: any = [{}];
    const array2: any = [{}];

    (array1[0].a = array1).push(array1);
    (array2[0].a = array2).push(array2);

    expect(isEqualWith(array1, array2, noop)).toBe(true);

    array1[0].b = 0;
    array2[0].b = Object(0);

    expect(isEqualWith(array1, array2, noop)).toBe(true);

    array1[0].c = Object(1);
    array2[0].c = Object(2);

    expect(isEqualWith(array1, array2, noop)).toBe(false);
  });

  it('should compare objects with complex circular references when customizer returns undefined', () => {
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

    expect(isEqualWith(object1, object2, noop)).toBe(true);
  });

  it('should compare objects with shared property values when customizer returns undefined', () => {
    const object1: any = {
      a: [1, 2],
    };

    const object2: any = {
      a: [1, 2],
      b: [1, 2],
    };

    object1.b = object1.a;

    expect(isEqualWith(object1, object2, noop)).toBe(true);
  });

  it('should treat objects created by `Object.create(null)` like plain objects when customizer returns undefined', () => {
    function Foo() {
      // eslint-disable-next-line
      // @ts-ignore
      this.a = 1;
    }
    Foo.prototype.constructor = null;

    const object1 = Object.create(null);
    object1.a = 1;

    const object2 = { a: 1 };

    expect(isEqualWith(object1, object2, noop)).toBe(true);
    // eslint-disable-next-line
    // @ts-ignore
    expect(isEqualWith(new Foo(), object2, noop)).toBe(false);
  });

  it('should avoid common type coercions when customizer returns undefined', () => {
    expect(isEqualWith(true, Object(false), noop)).toBe(false);
    expect(isEqualWith(Object(false), Object(0), noop)).toBe(false);
    expect(isEqualWith(false, Object(''), noop)).toBe(false);
    expect(isEqualWith(Object(36), Object('36'), noop)).toBe(false);
    expect(isEqualWith(0, '', noop)).toBe(false);
    expect(isEqualWith(1, true, noop)).toBe(false);
    expect(isEqualWith(1337756400000, new Date(2012, 4, 23), noop)).toBe(false);
    expect(isEqualWith('36', 36, noop)).toBe(false);
    expect(isEqualWith(36, '36', noop)).toBe(false);
  });

  it('should compare `arguments` objects when customizer returns undefined', () => {
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

    expect(isEqualWith(args1, args2, noop)).toBe(true);
    expect(isEqualWith(args1, args3, noop)).toBe(false);
  });

  it('should treat `arguments` objects like `Object` objects when customizer returns undefined', () => {
    const object = { 0: 1, 1: 2, 2: 3 };

    function Foo() {}
    Foo.prototype = object;

    expect(isEqualWith(args, object, noop)).toBe(true);
    expect(isEqualWith(object, args, noop)).toBe(true);
    // eslint-disable-next-line
    // @ts-ignore
    expect(isEqualWith(args, new Foo(), noop)).toBe(false);
    // eslint-disable-next-line
    // @ts-ignore
    expect(isEqualWith(new Foo(), args, noop)).toBe(false);
  });

  it('should compare array buffers when customizer returns undefined', () => {
    const buffer = new Int8Array([-1]).buffer;

    expect(isEqualWith(buffer, new Uint8Array([255]).buffer, noop)).toBe(true);
    expect(isEqualWith(buffer, new ArrayBuffer(1), noop)).toBe(false);
  });

  it('should compare array views when customizer returns undefined', () => {
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

    const actual = pairs.map((pair: any[]) => [
      isEqualWith(pair[0], pair[1], noop),
      isEqualWith(pair[0], pair[2], noop),
      isEqualWith(pair[2], pair[3], noop),
    ]);

    expect(actual).toEqual(expected);
  });

  it('should compare buffers when customizer returns undefined', () => {
    const buffer = Buffer.from([1]);

    expect(isEqualWith(buffer, Buffer.from([1]), noop)).toBe(true);
    expect(isEqualWith(buffer, Buffer.from([2]), noop)).toBe(false);
    expect(isEqualWith(buffer, new Uint8Array([1]), noop)).toBe(false);
  });

  it('should compare date objects when customizer returns undefined', () => {
    const date = new Date(2012, 4, 23);

    expect(isEqualWith(date, new Date(2012, 4, 23), noop)).toBe(true);
    expect(isEqualWith(new Date('a'), new Date('b'), noop)).toBe(true);
    expect(isEqualWith(date, new Date(2013, 3, 25), noop)).toBe(false);
    expect(isEqualWith(date, { getTime: () => Number(date) }, noop)).toBe(false);
  });

  it('should compare error objects when customizer returns undefined', () => {
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

    const actual = pairs.map(pair => [
      isEqualWith(pair[0], pair[1], noop),
      isEqualWith(pair[0], pair[2], noop),
      isEqualWith(pair[2], pair[3], noop),
    ]);

    expect(actual).toEqual(expected);
  });

  it('should compare functions when customizer returns undefined', () => {
    function a() {
      return 1 + 2;
    }
    function b() {
      return 1 + 2;
    }

    expect(isEqualWith(a, a, noop)).toBe(true);
    expect(isEqualWith(a, b, noop)).toBe(false);
  });

  it('should compare maps when customizer returns undefined', () => {
    [[new Map(), new Map()]].forEach(maps => {
      const map1 = maps[0];
      const map2 = maps[1];

      map1.set('a', 1);
      map2.set('b', 2);
      expect(isEqualWith(map1, map2, noop)).toBe(false);

      map1.set('b', 2);
      map2.set('a', 1);
      expect(isEqualWith(map1, map2, noop)).toBe(true);

      map1.delete('a');
      map1.set('a', 1);
      expect(isEqualWith(map1, map2, noop)).toBe(true);

      map2.delete('a');
      expect(isEqualWith(map1, map2, noop)).toBe(false);

      map1.clear();
      map2.clear();
    });
  });

  it('should compare maps with circular references when customizer returns undefined', () => {
    const map1 = new Map();
    const map2 = new Map();

    map1.set('a', map1);
    map2.set('a', map2);
    expect(isEqualWith(map1, map2, noop)).toBe(true);

    map1.set('b', 1);
    map2.set('b', 2);
    expect(isEqualWith(map1, map2, noop)).toBe(false);
  });

  it('should compare promises by reference when customizer returns undefined', () => {
    [[Promise.resolve(1), Promise.resolve(1)]].forEach(promises => {
      const promise1 = promises[0];
      const promise2 = promises[1];

      expect(isEqualWith(promise1, promise2, noop)).toBe(false);
      expect(isEqualWith(promise1, promise1, noop)).toBe(true);
    });
  });

  it('should compare regexes when customizer returns undefined', () => {
    expect(isEqualWith(/x/gim, /x/gim, noop)).toBe(true);
    expect(isEqualWith(/x/gim, /x/gim, noop)).toBe(true);
    expect(isEqualWith(/x/gi, /x/g, noop)).toBe(false);
    expect(isEqualWith(/x/, /y/, noop)).toBe(false);

    expect(
      isEqualWith(
        /x/g,
        {
          global: true,
          ignoreCase: false,
          multiline: false,
          source: 'x',
        },
        noop
      )
    ).toBe(false);
  });

  it('should compare sets when customizer returns undefined', () => {
    [[new Set(), new Set()]].forEach(sets => {
      const set1 = sets[0];
      const set2 = sets[1];

      set1.add(1);
      set2.add(2);
      expect(isEqualWith(set1, set2, noop)).toBe(false);

      set1.add(2);
      set2.add(1);
      expect(isEqualWith(set1, set2, noop)).toBe(true);

      set1.delete(1);
      set1.add(1);
      expect(isEqualWith(set1, set2, noop)).toBe(true);

      set2.delete(1);
      expect(isEqualWith(set1, set2, noop)).toBe(false);

      set1.clear();
      set2.clear();
    });
  });

  it('should compare sets with circular references when customizer returns undefined', () => {
    const set1 = new Set();
    const set2 = new Set();

    set1.add(set1);
    set2.add(set2);
    expect(isEqualWith(set1, set2, noop)).toBe(true);

    set1.add(1);
    set2.add(2);
    expect(isEqualWith(set1, set2, noop)).toBe(false);
  });

  it('should compare symbol properties when customizer returns undefined', () => {
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

    expect(isEqualWith(object1, object2, noop)).toBe(true);

    object2[symbol1] = { a: 1 };

    expect(isEqualWith(object1, object2, noop)).toBe(false);

    delete object2[symbol1];
    object2[Symbol('a')] = { a: { b: 2 } };
    expect(isEqualWith(object1, object2, noop)).toBe(false);
  });

  it('should return `false` for objects with custom `toString` methods when customizer returns undefined', () => {
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
      return isEqualWith(object, value, noop);
    });

    expect(actual).toEqual(expected);
  });
});
