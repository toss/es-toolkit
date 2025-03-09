import * as lodashStable from "es-toolkit/compat";
import { describe, expect, it } from "vitest";
import { pickBy } from "./pickBy";
import { stubTrue } from "../util/stubTrue";

describe("pickBy", () => {
  it("should work with a predicate argument", () => {
    const object = { a: 1, b: 2, c: 3, d: 4 };

    const actual = pickBy(object, (n) => n === 1 || n === 3);

    expect(actual).toEqual({ a: 1, c: 3 });
  });

  it("should not treat keys with dots as deep paths", () => {
    const object = { "a.b.c": 1 };
    const actual = pickBy(object, stubTrue);

    expect(actual).toEqual({ "a.b.c": 1 });
  });

  it("should pick properties based on the predicate function", () => {
    const obj = { a: 1, b: "pick", c: 3 };
    const shouldPick = (value: string | number) => typeof value === "string";
    const result = pickBy(obj, shouldPick);
    expect(result).toEqual({ b: "pick" });
  });

  it("should return an empty object if no properties satisfy the predicate", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const shouldPick = (value: number) => typeof value === "string";
    const result = pickBy(obj, shouldPick);
    expect(result).toEqual({});
  });

  it("should return the same object if all properties satisfy the predicate", () => {
    const obj = { a: "pick", b: "pick", c: "pick" };
    const shouldPick = (value: string) => typeof value === "string";
    const result = pickBy(obj, shouldPick);
    expect(result).toEqual(obj);
  });

  it("should work with an empty object", () => {
    const obj = {};
    const shouldPick = (value: never) => value;
    const result = pickBy(obj, shouldPick);
    expect(result).toEqual({});
  });

  it("should work with nested objects", () => {
    const obj = { a: 1, b: { nested: "pick" }, c: 3 };
    const shouldPick = (value: number | { nested: string }, key: string) =>
      key === "b";
    const result = pickBy(obj, shouldPick);
    expect(result).toEqual({ b: { nested: "pick" } });
  });

  it("should work with no predicate function", () => {
    const obj = { a: 1, b: "pick", c: 3 };
    const result = pickBy(obj);
    expect(result).toEqual(obj);
  });

  it("should return an empty object if the object is null", () => {
    const obj = null;
    const shouldPick = (value: string) => typeof value === "string";
    const result = pickBy(obj as unknown as object, shouldPick);
    expect(result).toEqual({});
  });

  it("should return an empty object if the object is undefined", () => {
    const obj = undefined;
    const shouldPick = (value: string) => typeof value === "string";
    const result = pickBy(obj as unknown as object, shouldPick);
    expect(result).toEqual({});
  });

  it(`should provide correct iteratee arguments`, () => {
    const array = [1, 2, 3];

    let args: any;
    const expected: any = [1, 0, array];

    // eslint-disable-next-line
    // @ts-ignore
    pickBy(array, function () {
      args || (args = Array.prototype.slice.call(arguments));
    });

    expected[1] += "";

    expect(args).toEqual(expected);
  });

  it(`should treat sparse arrays as dense`, () => {
    const array = [1];
    array[2] = 3;

    let expected = [
      [1, "0", array],
      [undefined, "1", array],
      [3, "2", array],
    ];

    expected = lodashStable.map(expected, (args) => {
      args[1] += "";
      return args;
    });

    const argsList: any = [];
    pickBy(array, function () {
      argsList.push(Array.prototype.slice.call(arguments));
      return true;
    });

    expect(argsList).toEqual(expected);
  });

  it(`iterates over own string keyed properties of objects`, () => {
    function Foo(this: any) {
      // eslint-disable-next-line
      // @ts-ignore
      this.a = 1;
    }
    Foo.prototype.b = 2;

    const values: any[] = [];
    // eslint-disable-next-line
    // @ts-ignore
    pickBy(new Foo(), (value) => {
      values.push(value);
    });
    expect(values).toEqual([1]);
  });

  it(`should ignore changes to \`length\``, () => {
    let count = 0;
    const array = [1];

    pickBy(array, () => {
      if (++count === 1) {
        array.push(2);
      }
      return true;
    });

    expect(count).toBe(1);
  });

  it(`should ignore added \`object\` properties`, () => {
    let count = 0;
    const object = { a: 1 };

    pickBy(object, () => {
      if (++count === 1) {
        // eslint-disable-next-line
        // @ts-ignore
        object.b = 2;
      }
      return true;
    });

    expect(count).toBe(1);
  });
});
