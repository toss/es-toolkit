/**
 * Converts `array` to an `arguments` object.
 *
 * @private
 * @param {Array} array The array to convert.
 * @returns {Object} Returns the converted `arguments` object.
 */
export function toArgs(array: any[]) {
  return function (..._: any[]) {
    return arguments;
  }.apply(undefined, array);
}
