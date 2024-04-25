import { describe, expect, it } from "vitest";
import { uniq } from "./uniq";

describe("uniq", () => {
  it("uniq function creates unique elements from the array passed as an argument.", () => {
    expect(uniq([11, 2, 3, 44, 11, 2, 3])).toEqual([11, 2, 3, 44]);
  });
});
