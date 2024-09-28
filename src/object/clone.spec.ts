import { describe, expect, it } from 'vitest';
import { clone } from './clone';

describe('clone', () => {
  it('should return primitive values as is', () => {
    const symbol = Symbol('symbol');

    expect(clone(42)).toBe(42);
    expect(clone('es-toolkit')).toBe('es-toolkit');
    expect(clone(symbol)).toBe(symbol);
    expect(clone(true)).toBe(true);
    expect(clone(null)).toBe(null);
    expect(clone(undefined)).toBe(undefined);
    expect(clone(42n)).toBe(42n);
  });

  it('should clone arrays', () => {
    const arr = [1, 2, 3];
    const clonedArr = clone(arr);

    expect(clonedArr).toEqual(arr);
    expect(clonedArr).not.toBe(arr);
  });

  it('should clone ArrayBuffer', () => {
    const buffer = new ArrayBuffer(8);
    const clonedBuffer = clone(buffer);

    expect(clonedBuffer).toEqual(buffer);
    expect(clonedBuffer).not.toBe(buffer);
    expect(clonedBuffer).toBeInstanceOf(ArrayBuffer);

    expect(clonedBuffer.byteLength).toBe(buffer.byteLength);
    expect(new Uint8Array(clonedBuffer)).toEqual(new Uint8Array(buffer));
  });

  it('should clone buffers', () => {
    const buffer = Buffer.from([1, 2, 3]);
    const clonedBuffer = clone(buffer);

    expect(clonedBuffer).toEqual(buffer);
    expect(clonedBuffer).not.toBe(buffer);
    expect(clonedBuffer).toBeInstanceOf(Buffer);

    expect(clonedBuffer.length).toBe(buffer.length);
  });

  it('should clone SharedArrayBuffer', () => {
    const buffer = new SharedArrayBuffer(8);
    const clonedBuffer = clone(buffer);

    expect(clonedBuffer).toEqual(buffer);
    expect(clonedBuffer).not.toBe(buffer);
    expect(clonedBuffer).toBeInstanceOf(SharedArrayBuffer);

    expect(clonedBuffer.byteLength).toBe(buffer.byteLength);
    expect(new Uint8Array(clonedBuffer)).toEqual(new Uint8Array(buffer));
  });

  it('should clone objects', () => {
    const obj = { a: 1, b: 'es-toolkit', c: [1, 2, 3] };
    const clonedObj = clone(obj);

    expect(clonedObj).toEqual(obj);
    expect(clonedObj).not.toBe(obj);
  });

  it('should clone custom classes', () => {
    class Person {
      constructor(
        public name: string,
        public age: number
      ) {}

      greet() {
        return `Hello, my name is ${this.name}`;
      }
    }

    const person = new Person('es-toolkit', 100);
    const clonedPerson = clone(person);

    expect(clonedPerson).toEqual(person);
    expect(clonedPerson).not.toBe(person);
    expect(clonedPerson.greet).toBe(person.greet);
    expect(clonedPerson).toBeInstanceOf(Person);
  });

  it('should clone dates', () => {
    const date = new Date();
    const clonedDate = clone(date);

    expect(clonedDate).toEqual(date);
    expect(clonedDate).not.toBe(date);
    expect(clonedDate).toBeInstanceOf(Date);
  });

  it('should clone regular expressions', () => {
    const regex = /abc/gsu;
    regex.lastIndex = 10;
    const clonedRegex = clone(regex);

    expect(clonedRegex).toEqual(regex);
    expect(clonedRegex).not.toBe(regex);
    expect(clonedRegex).toBeInstanceOf(RegExp);

    expect(clonedRegex.source).toBe(regex.source);
    expect(clonedRegex.flags).toBe(regex.flags);
    expect(clonedRegex.lastIndex).toBe(regex.lastIndex);
  });

  it('should shallow clone nested objects', () => {
    const nestedObj = { a: [1, 2, 3], b: { c: 'es-toolkit' }, d: new Date() };
    const clonedNestedObj = clone(nestedObj);

    expect(clonedNestedObj).toEqual(nestedObj);
    expect(clonedNestedObj).not.toBe(nestedObj);
    expect(clonedNestedObj.a).toEqual(nestedObj.a);
    expect(clonedNestedObj.a[2]).toEqual(nestedObj.a[2]);
  });

  it('should return functions as is', () => {
    const func = () => {};
    const clonedFunc = clone(func);

    expect(clonedFunc).toBe(func);
  });

  it('should clone sets', () => {
    const set = new Set([1, 2, 3]);
    const clonedSet = clone(set);

    expect(clonedSet).toEqual(set);
    expect(clonedSet).not.toBe(set);
    expect(clonedSet).toBeInstanceOf(Set);
  });

  it('should clone maps', () => {
    const map = new Map([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);
    const clonedMap = clone(map);

    expect(clonedMap).toEqual(map);
    expect(clonedMap).not.toBe(map);
    expect(clonedMap).toBeInstanceOf(Map);
  });

  it('should clone typed arrays', () => {
    const typedArray = new Uint8Array([1, 2, 3]);
    const clonedTypedArray = clone(typedArray);

    expect(clonedTypedArray).toEqual(typedArray);
    expect(clonedTypedArray).not.toBe(typedArray);
    expect(clonedTypedArray).toBeInstanceOf(Uint8Array);
  });

  it('should clone BigInt64Array', () => {
    const bigIntArray = new BigInt64Array([1n, 2n, 3n]);
    const clonedBigIntArray = clone(bigIntArray);

    expect(clonedBigIntArray).toEqual(bigIntArray);
    expect(clonedBigIntArray).not.toBe(bigIntArray);
    expect(clonedBigIntArray).toBeInstanceOf(BigInt64Array);
  });

  it('should clone Data views', () => {
    const buffer = new ArrayBuffer(8);
    const dataView = new DataView(buffer);
    const clonedDataView = clone(dataView);

    expect(clonedDataView).toEqual(dataView);
    expect(clonedDataView).not.toBe(dataView);
    expect(clonedDataView).toBeInstanceOf(DataView);
  });

  it('should clone File', () => {
    if (typeof File === 'undefined') {
      return;
    }

    const file = new File(['Hello'], 'file.txt', { type: 'text/plain' });
    const clonedFile = clone(file);

    expect(clonedFile).toEqual(file);
    expect(clonedFile).not.toBe(file);
    expect(clonedFile).toBeInstanceOf(File);

    expect(clonedFile.size).toBe(file.size);
    expect(clonedFile.type).toBe(file.type);
    expect(clonedFile.text()).resolves.toBe('Hello');
  });

  it('should clone Blob', () => {
    const blob = new Blob(['Hello'], { type: 'text/plain' });
    const clonedBlob = clone(blob);

    expect(clonedBlob).toEqual(blob);
    expect(clonedBlob).not.toBe(blob);
    expect(clonedBlob).toBeInstanceOf(Blob);

    expect(clonedBlob.size).toBe(blob.size);
    expect(clonedBlob.type).toBe(blob.type);
    expect(clonedBlob.text()).resolves.toBe('Hello');
  });

  it('should clone Error', () => {
    const error = new Error('Something went wrong', { cause: 'Unknown' });
    const clonedError = clone(error);

    expect(clonedError).toEqual(error);
    expect(clonedError).not.toBe(error);
    expect(clonedError).toBeInstanceOf(Error);

    expect(clonedError.message).toBe(error.message);
    expect(clonedError.stack).toBe(error.stack);
    expect(clonedError.name).toBe(error.name);
    expect(clonedError.cause).toBe(error.cause);
  });

  it('should clone Custom Error', () => {
    class CustomError extends Error {
      constructor(message: string) {
        super(message);
        this.name = 'CustomError';
      }
    }

    const error = new CustomError('Something went wrong');
    const clonedError = clone(error);

    expect(clonedError).toEqual(error);
    expect(clonedError).not.toBe(error);
    expect(clonedError).toBeInstanceOf(CustomError);

    expect(clonedError.message).toBe(error.message);
    expect(clonedError.name).toBe(error.name);
  });
});
