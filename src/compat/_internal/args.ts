export const args = toArgs([1, 2, 3]);

/**
 * Converts an array to an `arguments` object.
 *
 * @param {unknown[]} array - The array to convert.
 * @returns {IArguments} - The `arguments` object.
 *
 * @example
 * toArgs([1, 2, 3]); // { '0': 1, '1': 2, '2': 3 } as IArguments
 */

function toArgs(array: unknown[]): IArguments {
  // eslint-disable-next-line prefer-spread
  return (function (...args) {
    args;
    // eslint-disable-next-line prefer-rest-params
    return arguments;
  })(...array);
}
