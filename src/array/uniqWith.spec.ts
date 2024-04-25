import { describe, expect, it } from "vitest";
import { uniqWith } from "./uniqWith";

describe("uniqWith", () => {
  it("should work with a `comparator`", () => {
    expect(
      uniqWith(
        [
          { x: 1, y: 2 },
          { x: 1, y: 3 },
        ],
        (a, b) => a.x === b.x
      )
    ).toEqual([{ x: 1, y: 2 }]);
  });
});
