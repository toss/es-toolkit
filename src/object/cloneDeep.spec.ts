import { describe, expect, it } from 'vitest';
import { cloneDeep } from './cloneDeep';

describe('cloneDeep', () => {
  it('should return primitive values as is', () => {
    const symbol = Symbol('symbol');

    expect(cloneDeep(42)).toBe(42);
    expect(cloneDeep('es-toolkit')).toBe('es-toolkit');
    expect(cloneDeep(symbol)).toBe(symbol);
    expect(cloneDeep(true)).toBe(true);
    expect(cloneDeep(null)).toBe(null);
    expect(cloneDeep(undefined)).toBe(undefined);
  });

  it('should clone arrays', () => {
    const arr = [1, 2, 3];
    const clonedArr = cloneDeep(arr);

    expect(clonedArr).toEqual(arr);
    expect(clonedArr).not.toBe(arr);
  });

  it('should clone arrays with nested objects', () => {
    const arr = [{ a: 1 }, { b: 2 }, { c: 3 }];
    const clonedArr = cloneDeep(arr);
    arr[0].a = 2;

    expect(clonedArr).not.toEqual(arr);
    expect(clonedArr).not.toBe(arr);
  });

  it('should clone objects', () => {
    const obj = { a: 1, b: 'es-toolkit', c: [1, 2, 3] };
    const clonedObj = cloneDeep(obj);

    expect(clonedObj).toEqual(obj);
    expect(clonedObj).not.toBe(obj);
  });

  it('should clone dates', () => {
    const date = new Date();
    const clonedDate = cloneDeep(date);

    expect(clonedDate).toEqual(date);
    expect(clonedDate).not.toBe(date);
  });

  it('should clone regular expressions', () => {
    const regex = /abc/g;
    const clonedRegex = cloneDeep(regex);

    expect(clonedRegex).toEqual(regex);
    expect(clonedRegex).not.toBe(regex);
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

  it('should return functions as is', () => {
    const func = () => {};
    const clonedFunc = cloneDeep(func);

    expect(clonedFunc).toBe(func);
  });

  it('should clone sets', () => {
    const set = new Set([1, 2, 3]);
    const clonedSet = cloneDeep(set);

    expect(clonedSet).toEqual(set);
    expect(clonedSet).not.toBe(set);
  });

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

  it('should clone instance', () => {
    class A {
      props: { a: string };
      constructor(props: { a: string }) {
        this.props = props;
      }
      getA() {
        return this.props;
      }
    }
    const props = { a: 'es-toolkit' };
    const a = new A(props);
    const b = cloneDeep(a);
    props.a = 'es-toolkit-2';
    expect(a.getA()).toEqual({ a: 'es-toolkit-2' });
    expect(b.getA()).toEqual({ a: 'es-toolkit' });
    expect(a).not.toBe(b);
  });
});
