import { bench, describe } from "vitest";
import { flattenObject as flattenObjectToolkit } from "es-toolkit"; // Assuming this is the correct import
import _ from "lodash";

// Function to create a deeply nested object for testing
const createNestedObject = (
	depth: number,
	currentDepth = 0,
): Record<string, unknown> => {
	if (currentDepth === depth) {
		return { end: "value" };
	}
	return {
		[`level${currentDepth}`]: createNestedObject(depth, currentDepth + 1),
	};
};
function flatten(obj, separator = ".") {
	function flattenInner(input, prefix = "", result = {}) {
		return _.transform(
			input,
			(acc, value, key) => {
				const newKey = prefix ? `${prefix}${separator}${key as string}` : key;
				if (_.isObject(value) && !_.isArray(value)) {
					flattenInner(value, newKey as string, acc);
				} else {
					acc[newKey] = value;
				}
			},
			result,
		);
	}
	return flattenInner(obj);
}
describe("flattenObject", () => {
	const nestedObject = createNestedObject(10); // Adjust depth as needed for your benchmark

	bench("es-toolkit/flattenObjectToolkit", () => {
		flattenObjectToolkit(nestedObject);
	});

	// Example benchmark for lodash's flattenDeep as it's more comparable to flattening objects
	bench("lodash custom flatten", () => {
		flatten(nestedObject);
	});
});
