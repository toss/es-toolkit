import { describe, expect, it } from 'vitest';
import { cloneDeep } from './cloneDeep';

describe('cloneDeep', () => {
  //-------------------------------------------------------------------------------------
  // primitive
  //-------------------------------------------------------------------------------------
  it('should return primitive values as is', () => {
    const symbol = Symbol('symbol');
    expect(cloneDeep(42)).toBe(42);
    expect(cloneDeep('es-toolkit')).toBe('es-toolkit');
    expect(cloneDeep(symbol)).toBe(symbol);
    expect(cloneDeep(true)).toBe(true);
    expect(cloneDeep(null)).toBe(null);
    expect(cloneDeep(undefined)).toBe(undefined);
  });

  //-------------------------------------------------------------------------------------
  // array
  //-------------------------------------------------------------------------------------
  it('should clone arrays', () => {
    const arr = [1, 2, 3];
    const clonedArr = cloneDeep(arr);

    expect(clonedArr).toEqual(arr);
    expect(clonedArr).not.toBe(arr);
  });

  it('should clone RegExp arrays', () => {
    const arr = /test/.exec('hello test');
    const cloned = cloneDeep(arr);

    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
  });

  it('should clone arrays with nested objects', () => {
    const arr = [{ a: 1 }, { b: 2 }, { c: 3 }];
    const clonedArr = cloneDeep(arr);
    arr[0].a = 2;
    expect(clonedArr).not.toEqual(arr);
    expect(clonedArr).not.toBe(arr);
  });

  //-------------------------------------------------------------------------------------
  // object
  //-------------------------------------------------------------------------------------
  it('should clone objects', () => {
    const obj = { a: 1, b: 'es-toolkit', c: [1, 2, 3] };
    const clonedObj = cloneDeep(obj);

    expect(clonedObj).toEqual(obj);
    expect(clonedObj).not.toBe(obj);
  });

  it('should deep clone nested objects', () => {
    const nestedObj = { a: [1, 2, 3], b: { c: 'es-toolkit' }, d: new Date() };
    const clonedNestedObj = cloneDeep(nestedObj);
    nestedObj.a[2] = 4;
    nestedObj.b.c = 'es-toolkit-2';
    expect(clonedNestedObj).not.toEqual(nestedObj);
    expect(clonedNestedObj).not.toBe(nestedObj);
    expect(clonedNestedObj.a).not.toEqual(nestedObj.a);
    expect(clonedNestedObj.b).not.toEqual(nestedObj.b);
    expect(clonedNestedObj.a[0]).toEqual(nestedObj.a[0]);
    expect(clonedNestedObj.a[2]).not.toEqual(nestedObj.a[2]);
  });

  //-------------------------------------------------------------------------------------
  // date
  //-------------------------------------------------------------------------------------
  it('should clone dates', () => {
    const date = new Date();
    const clonedDate = cloneDeep(date);

    expect(clonedDate).toEqual(date);
    expect(clonedDate).not.toBe(date);
  });

  //-------------------------------------------------------------------------------------
  // regex
  //-------------------------------------------------------------------------------------
  it('should clone regular expressions', () => {
    const regex = /abc/g;
    const clonedRegex = cloneDeep(regex);

    expect(clonedRegex).toEqual(regex);
    expect(clonedRegex).not.toBe(regex);
  });

  //-------------------------------------------------------------------------------------
  // set
  //-------------------------------------------------------------------------------------
  it('should clone sets', () => {
    const set = new Set([1, 2, 3]);
    const clonedSet = cloneDeep(set);

    expect(clonedSet).toEqual(set);
    expect(clonedSet).not.toBe(set);
  });

  //-------------------------------------------------------------------------------------
  // map
  //-------------------------------------------------------------------------------------
  it('should clone maps', () => {
    const map = new Map([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);
    const clonedMap = cloneDeep(map);

    expect(clonedMap).toEqual(map);
    expect(clonedMap).not.toBe(map);
  });

  it('should clone map with nested objects', () => {
    const obj = { a: 1 };
    const map = new Map([
      [1, obj],
      [2, obj],
      [3, obj],
    ]);
    const clonedMap = cloneDeep(map);
    obj.a = 2;
    expect(clonedMap).not.toEqual(map); // map = {1:{a:2},2:{a:2},3:{a:2}}
    expect(clonedMap).not.toBe(map);
  });

  //-------------------------------------------------------------------------------------
  // instance
  //-------------------------------------------------------------------------------------
  it('should clone instance', () => {
    class A {
      readonly props: { a: string };
      #b: number; // this is js spec private field (not cloned)
      private c: number; // this is ts spec private field (cloned)
      private readonly d: () => number;
      constructor(props: { a: string }, b: number, c: number, d: () => number) {
        if (props.a !== 'es-toolkit') {
          throw new Error('es-toolkit');
        }
        this.props = props;
        this.#b = b;
        this.c = c;
        this.d = d;
      }
      getA() {
        return this.props;
      }
      getB() {
        return this.#b;
      }
      getThis() {
        console.log(this);
        return this;
      }
    }
    const props = { a: 'es-toolkit' };
    const d = () => 1;
    const a = new A(props, 1, 2, d);
    const b = cloneDeep(a);
    a.props.a = 'es-toolkit-2';
    expect(a).not.toBe(b);
    // @ts-expect-error: test
    expect(b['#b']).toBe(undefined);
    expect(b).toEqual({
      props: { a: 'es-toolkit' },
      d,
      c: 2,
    });
  });

  //-------------------------------------------------------------------------------------
  // File
  //-------------------------------------------------------------------------------------
  it('should clone File objects', () => {
    // For legacy NodeJS support
    if (typeof File !== 'undefined') {
      const file = new File(['es-toolkit'], 'es-toolkit.txt', { type: 'text/plain' });
      const clonedFile = cloneDeep(file);
      expect(clonedFile).not.toBe(file);
      expect(clonedFile.name).toBe(file.name);
      expect(clonedFile.type).toBe(file.type);
      expect(clonedFile.size).toBe(file.size);
      expect(clonedFile.constructor).toBe(File);
    }
  });

  //-------------------------------------------------------------------------------------
  // Blob
  //-------------------------------------------------------------------------------------
  it('should clone Blob objects', () => {
    const blob = new Blob(['es-toolkit'], { type: 'text/plain' });
    const clonedBlob = cloneDeep(blob);
    expect(clonedBlob).not.toBe(blob);
    expect(clonedBlob.type).toBe(blob.type);
    expect(clonedBlob.size).toBe(blob.size);
    expect(clonedBlob.constructor).toBe(Blob);
  });

  //-------------------------------------------------------------------------------------
  // ArrayBuffer
  //-------------------------------------------------------------------------------------
  it('should clone ArrayBuffer objects', () => {
    const arrayBuffer = new ArrayBuffer(10);
    const uint8View = new Uint8Array(arrayBuffer);
    for (let i = 0; i < uint8View.length; i++) {
      uint8View[i] = i;
    }
    const clonedArrayBuffer = cloneDeep(arrayBuffer);
    const clonedUint8View = new Uint8Array(clonedArrayBuffer);
    uint8View[0] = 1;

    /**
     * arrayBuffer = <01, 01, 02, 03, 04, 05, 06, 07, 08, 09>
     * clonedArrayBuffer = <00, 01, 02, 03, 04, 05, 06, 07, 08, 09>
     */
    expect(clonedArrayBuffer).not.toBe(arrayBuffer);
    /**
     * arrayBuffer = [1, 1, 2, 3, 4, 5, 6, 7, 8, 9]
     * clonedArrayBuffer = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
     */
    expect(clonedUint8View).not.toBe(uint8View);
  });

  //-------------------------------------------------------------------------------------
  // TypedArray
  //-------------------------------------------------------------------------------------
  it('should clone TypedArray objects', () => {
    const typedArray = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const clonedTypedArray = cloneDeep(typedArray);
    typedArray[0] = 255;
    expect(clonedTypedArray).not.toBe(typedArray);
    expect(typedArray).toEqual(new Uint8Array([255, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
    expect(clonedTypedArray).toEqual(new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
  });

  //-------------------------------------------------------------------------------------
  // Error
  //-------------------------------------------------------------------------------------

  it('should clone Error', () => {
    const error = new Error('es-toolkit');
    const clonedError = cloneDeep(error);
    expect(clonedError).not.toBe(error);
    expect(clonedError.message).toBe(error.message);
    expect(clonedError.name).toBe(error.name);
    expect(clonedError.stack).toBe(error.stack);
    expect(clonedError.cause).toBe(error.cause);
  });
  it('should clone TypeError', () => {
    const error = new TypeError('es-toolkit');
    const clonedError = cloneDeep(error);
    expect(clonedError).not.toBe(error);
    expect(clonedError.message).toBe(error.message);
    expect(clonedError.name).toBe(error.name);
    expect(clonedError.stack).toBe(error.stack);
    expect(clonedError.cause).toBe(error.cause);
  });

  it('should clone EvalError', () => {
    const error = new EvalError('es-toolkit');
    const clonedError = cloneDeep(error);
    expect(clonedError).not.toBe(error);
    expect(clonedError.message).toBe(error.message);
    expect(clonedError.name).toBe(error.name);
    expect(clonedError.stack).toBe(error.stack);
    expect(clonedError.cause).toBe(error.cause);
  });

  it('should clone RangeError', () => {
    const error = new RangeError('es-toolkit');
    const clonedError = cloneDeep(error);
    expect(clonedError).not.toBe(error);
    expect(clonedError.message).toBe(error.message);
    expect(clonedError.name).toBe(error.name);
    expect(clonedError.stack).toBe(error.stack);
    expect(clonedError.cause).toBe(error.cause);
  });

  it('should clone ReferenceError', () => {
    const error = new ReferenceError('es-toolkit');
    const clonedError = cloneDeep(error);
    expect(clonedError).not.toBe(error);
    expect(clonedError.message).toBe(error.message);
    expect(clonedError.name).toBe(error.name);
    expect(clonedError.stack).toBe(error.stack);
    expect(clonedError.cause).toBe(error.cause);
  });

  it('should clone SyntaxError', () => {
    const error = new SyntaxError('es-toolkit');
    const clonedError = cloneDeep(error);
    expect(clonedError).not.toBe(error);
    expect(clonedError.message).toBe(error.message);
    expect(clonedError.name).toBe(error.name);
    expect(clonedError.stack).toBe(error.stack);
    expect(clonedError.cause).toBe(error.cause);
  });

  it('should clone URIError', () => {
    const error = new URIError('es-toolkit');
    const clonedError = cloneDeep(error);
    expect(clonedError).not.toBe(error);
    expect(clonedError.message).toBe(error.message);
    expect(clonedError.name).toBe(error.name);
    expect(clonedError.stack).toBe(error.stack);
    expect(clonedError.cause).toBe(error.cause);
  });

  it('should clone custom Error', () => {
    class HttpError extends Error {
      code: number;
      constructor(message: string, code: number) {
        super(message);
        this.name = 'CustomError';
        this.code = code;
      }
    }
    const error = new HttpError('es-toolkit', 400);
    const clonedError = cloneDeep(error);
    expect(clonedError).not.toBe(error);
    expect(clonedError.message).toBe(error.message);
    expect(clonedError.name).toBe(error.name);
    expect(clonedError.stack).toBe(error.stack);
    expect(clonedError.cause).toBe(error.cause);
    expect(clonedError.code).toBe(error.code);
  });

  it('should clone DataViews', () => {
    const buffer = new Uint8Array([0, 1, 2]).buffer;
    const view = new DataView(buffer, 1, 2);

    const cloned = cloneDeep(view);

    expect(cloned).not.toBe(view);
    expect(cloned.getInt8(0)).toBe(view.getInt8(0));
    expect(cloned.getInt8(1)).toBe(view.getInt8(1));
  });

  it('should clone buffers', () => {
    const buffer = Buffer.from([1, 2, 3]);

    const cloned = cloneDeep(buffer);

    expect(cloned).not.toBe(buffer);
    expect(cloned).toEqual(buffer);
  });
});
