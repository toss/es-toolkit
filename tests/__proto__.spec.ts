import { describe, expect, it } from "vitest";
import { merge, mergeWith, toMerged } from "es-toolkit";
import { merge as mergeCompat, mergeWith as mergeWithCompat, set, unset, zipObjectDeep } from "es-toolkit/compat";

describe("__proto__", () => {
  it("should not be polluted in merge", () => {
    merge({}, { ["__proto__"]: { polluted: "yes" } });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect({}.polluted).toBeUndefined();
  });

  it("should not be polluted in toMerged", () => {
    toMerged({}, { ["__proto__"]: { polluted: "yes" } });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect({}.polluted).toBeUndefined();
  })

  it("should not be polluted in mergeWith", () => {
    mergeWith({}, { ["__proto__"]: { polluted: "yes" } }, (x, y) => {
      if (typeof x === "number" && typeof y === "number") {
        return x + y;
      }
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect({}.polluted).toBeUndefined();
  });

  it("should not be polluted in compat/merge", () => {
    mergeCompat({}, { ["__proto__"]: { polluted: "yes" } });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect({}.polluted).toBeUndefined();
  })

  it("should not be polluted in compat/mergeWith", () => {
    mergeWithCompat({}, { ["__proto__"]: { polluted: "yes" } }, (x, y) => {
      if (typeof x === "number" && typeof y === "number") {
        return x + y;
      }
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect({}.polluted).toBeUndefined();
  })

  it("should not be polluted in compat/set", () => {
    set({}, "__proto__.polluted", "yes");

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect({}.polluted).toBeUndefined();
  })

  it("should not be polluted in compat/zipObjectDeep", () => {
    zipObjectDeep(["__proto__.polluted"], ["yes"]);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect({}.polluted).toBeUndefined();
  })

  it("should not be polluted in compat/unset", () => {
    unset({}, "__proto__.toString");

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    expect({}.toString).not.toBeUndefined();
  })
});
