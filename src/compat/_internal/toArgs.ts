/**
 * Converts an array to an `arguments` object.
 *
 * @param {unknown[]} array - The array to convert.
 * @returns {IArguments} - The `arguments` object.
 *
 * @example
 * toArgs([1, 2, 3]); // { '0': 1, '1': 2, '2': 3 } as IArguments
 */
export function toArgs(array: unknown[]): IArguments {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (function (..._: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    return arguments;
  })(...array);
}
