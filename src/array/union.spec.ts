import { describe, expect, it } from "vitest";
import { union } from "./union";

describe("union", () => {
  it("uniq function should return the union of two arrays", () => {
    expect(union([2, 1], [2])).toEqual([2, 1]);
    expect(union([2, 1], [2], [2, 3])).toEqual([2, 1, 3]);
    expect(union([2, 1], [2], [1, [5]])).toEqual([2, 1, [5]]);
  });
});
