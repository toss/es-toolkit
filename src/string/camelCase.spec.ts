import { describe, expect, it } from "vitest";
import { camelCase } from "./camelCase";

describe("camelCase", () => {
  it("should change camel case to camel case", async () => {
    expect(camelCase("camelCase")).toEqual("camelCase");
  });

  it("should change space to camel case", async () => {
    expect(camelCase("some whitespace")).toEqual("someWhitespace");
  });

  it("should change hyphen to camel case", async () => {
    expect(camelCase("hyphen-text")).toEqual("hyphenText");
  });

  it("should change Acronyms to small letter", async () => {
    expect(camelCase("HTTPRequest")).toEqual("httpRequest");
  });

  it("should handle leading and trailing whitespace", async () => {
    expect(camelCase("    leading and trailing whitespace")).toEqual(
      "leadingAndTrailingWhitespace",
    );
  });

  it("should handle special characters correctly", async () => {
    expect(camelCase("special@characters!")).toEqual("specialCharacters");
  });

  it("should handle strings that are already in camel_case", async () => {
    expect(camelCase("camel_case")).toEqual("camelCase");
  });

  it("should work with an empty string", async () => {
    expect(camelCase("")).toEqual("");
  });

  it("should work with screaming camel case", async () => {
    expect(camelCase("FOO_BAR")).toEqual("fooBar");
  });
});
