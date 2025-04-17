import { describe, expect, it } from "vitest";
import { merge } from "es-toolkit";

describe("__proto__", () => {
  it("should not be polluted in merge", () => {
    merge({}, { ["__proto__"]: { polluted: "yes" } });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect({}.polluted).toBeUndefined();
  });
});
