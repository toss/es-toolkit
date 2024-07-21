import { describe, expect, it } from "vitest";
import { compact } from "../../array/compact";
import { falsey } from "../_internal/falsey";

/**
 * @see https://github.com/lodash/lodash/blob/6a2cc1dfcf7634fea70d1bc5bd22db453df67b42/test/compact.spec.js#L1
 */
describe('compact', () => {
  it('should filter falsey values', () => {
    const array = ['0', '1', '2'];
    expect(compact(falsey.concat(array))).toEqual(array);
  });
});
