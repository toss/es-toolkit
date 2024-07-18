import { describe, expect, it } from "vitest";
import { toPath } from "./toPath";

describe("toPath function", () => {
  it("converts dot-separated keys correctly", () => {
    const result = toPath("a.b.c");
    expect(result).toEqual(["a", "b", "c"]);
  });

  it("converts bracket notation keys correctly", () => {
    const result = toPath("a[b][c]");
    expect(result).toEqual(["a", "b", "c"]);
  });

  it("handles mixed notation correctly", () => {
    const result = toPath("a[b].c");
    expect(result).toEqual(["a", "b", "c"]);
  });

  it("handles leading dots correctly", () => {
    const result = toPath(".a.b.c");
    expect(result).toEqual(["", "a", "b", "c"]);
  });

  it("handles quoted keys correctly", () => {
    const result = toPath('a["b.c"].d');
    expect(result).toEqual(["a", "b.c", "d"]);
  });

  it("handles empty input correctly", () => {
    const result = toPath("");
    expect(result).toEqual([]);
  });

  it("handles complex input with leading dot correctly", () => {
    const result = toPath('.a[b].c.d[e]["f.g"].h');
    expect(result).toEqual(["", "a", "b", "c", "d", "e", "f.g", "h"]);
  });
});
