import { describe, expect, it } from "vitest";
import { omit } from "./omit";

describe("omit", () => {
  it("should omit properties from an object", () => {
    const object = { foo: 1, bar: 2, baz: 3 };

    expect(omit(object, ['foo', 'bar'])).toEqual({ baz: 3 });
  });
});
