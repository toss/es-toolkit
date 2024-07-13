import { describe, it, expect } from "vitest";
import { flattenObject } from "./flattenObject";
describe("flattenObject function tests", () => {
	it("should flattenObject a simple nested object correctly", () => {
		const obj = { name: "John", address: { city: "New York", country: "USA" } };
		const expected = {
			name: "John",
			"address.city": "New York",
			"address.country": "USA",
		};
		expect(flattenObject(obj)).toEqual(expected);
	});

	it("should flattenObject deeper nested objects correctly", () => {
		const obj = {
			user: {
				id: 1,
				profile: {
					name: "John",
					address: { city: "New York", country: "USA" },
				},
			},
		};
		const expected = {
			"user.id": 1,
			"user.profile.name": "John",
			"user.profile.address.city": "New York",
			"user.profile.address.country": "USA",
		};
		expect(flattenObject(obj)).toEqual(expected);
	});

	it("should handle different separators correctly", () => {
		const obj = { user: { id: 1, profile: { name: "John" } } };
		const expected = { "user-id": 1, "user-profile-name": "John" };
		expect(flattenObject(obj, "-")).toEqual(expected);
	});

	it("should return an empty object when an empty object is passed", () => {
		const obj = {};
		const expected = {};
		expect(flattenObject(obj)).toEqual(expected);
	});

	it("should return the same object if a non-object is passed", () => {
		const obj = "This is not an object";
		const expected = {};
		// @ts-expect-error-error
		expect(flattenObject(obj)).toEqual(expected); // Casting to any to simulate incorrect usage
	});

	it("should not flattenObject arrays within objects", () => {
		const obj = { user: { id: 1, hobbies: ["reading", "swimming"] } };
		const expected = { "user.id": 1, "user.hobbies": ["reading", "swimming"] };
		expect(flattenObject(obj)).toEqual(expected);
	});
});
