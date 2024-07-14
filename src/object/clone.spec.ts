import { describe, expect, it } from "vitest";
import { clone } from "./clone";

describe("clone", () => {
  it("should return primitive values as is", () => {
    const symbol = Symbol("symbol");

    expect(clone(42)).toBe(42);
    expect(clone("es-toolkit")).toBe("es-toolkit");
    expect(clone(symbol)).toBe(symbol);
    expect(clone(true)).toBe(true);
    expect(clone(null)).toBe(null);
    expect(clone(undefined)).toBe(undefined);
  });

  it("should clone arrays", () => {
    const arr = [1, 2, 3];
    const clonedArr = clone(arr);

    expect(clonedArr).toEqual(arr);
    expect(clonedArr).not.toBe(arr);
  });

  it("should clone objects", () => {
    const obj = { a: 1, b: "es-toolkit" };
    const clonedObj = clone(obj);

    expect(clonedObj).toEqual(obj);
    expect(clonedObj).not.toBe(obj);
  });

  it("should clone dates", () => {
    const date = new Date();
    const clonedDate = clone(date);

    expect(clonedDate).toEqual(date);
    expect(clonedDate).not.toBe(date);
  });

  it("should clone regular expressions", () => {
    const regex = /abc/g;
    const clonedRegex = clone(regex);

    expect(clonedRegex).toEqual(regex);
    expect(clonedRegex).not.toBe(regex);
  });

  it("should shallow clone nested objects", () => {
    const nestedObj = { a: [1, 2, 3], b: { c: "es-toolkit" }, d: new Date() };
    const clonedNestedObj = clone(nestedObj);

    expect(clonedNestedObj).toEqual(nestedObj);
    expect(clonedNestedObj).not.toBe(nestedObj);
    expect(clonedNestedObj.a).toEqual(nestedObj.a);
    expect(clonedNestedObj.a[2]).toEqual(nestedObj.a[2]);
  });

  it("should return functions as is", () => {
    const func = () => {};
    const clonedFunc = clone(func);

    expect(clonedFunc).toBe(func);
  });

  it("should clone sets", () => {
    const set = new Set([1, 2, 3]);
    const clonedSet = clone(set);

    expect(clonedSet).toEqual(set);
    expect(clonedSet).not.toBe(set);
  });

  it("should clone maps", () => {
    const map = new Map([[1, "a"], [2, "b"], [3, "c"]]);
    const clonedMap = clone(map);

    expect(clonedMap).toEqual(map);
    expect(clonedMap).not.toBe(map);
  });
});
