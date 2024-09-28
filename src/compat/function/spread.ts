/**
 * Creates a new function that spreads elements of an array argument into individual arguments
 * for the original function. The array argument is positioned based on the `argsIndex` parameter.
 *
 * @template F - A function type with any number of parameters and any return type.
 * @param {F} func - The function to be transformed. It can be any function with any number of arguments.
 * @param {number} [argsIndex=0] - The index where the array argument is positioned among the other arguments.
 *   If `argsIndex` is negative or `NaN`, it defaults to `0`. If it's a fractional number, it is rounded to the nearest integer.
 * @returns {(...args: any[]) => ReturnType<F>} - A new function that takes multiple arguments, including an array of arguments at the specified `argsIndex`,
 *   and returns the result of calling the original function with those arguments.
 *
 * @example
 * function add(a, b) {
 *   return a + b;
 * }
 *
 * const spreadAdd = spread(add);
 * console.log(spreadAdd([1, 2])); // Output: 3
 *
 * @example
 * // Example function to spread arguments over
 * function add(a, b) {
 *   return a + b;
 * }
 *
 * // Create a new function that uses `spread` to combine arguments
 * const spreadAdd = spread(add, 1);
 *
 * // Calling `spreadAdd` with an array as the second argument
 * console.log(spreadAdd(1, [2])); // Output: 3
 *
 * @example
 * // Function with default arguments
 * function greet(name, greeting = 'Hello') {
 *   return `${greeting}, ${name}!`;
 * }
 *
 * // Create a new function that uses `spread` to position the argument array at index 0
 * const spreadGreet = spread(greet, 0);
 *
 * // Calling `spreadGreet` with an array of arguments
 * console.log(spreadGreet(['Alice'])); // Output: Hello, Alice!
 * console.log(spreadGreet(['Bob', 'Hi'])); // Output: Hi, Bob!
 */
export function spread<F extends (...args: any[]) => any>(func: F, argsIndex = 0): (...args: any[]) => ReturnType<F> {
  argsIndex = Number.parseInt(argsIndex as any, 10);

  if (Number.isNaN(argsIndex) || argsIndex < 0) {
    argsIndex = 0;
  }

  return function (this: any, ...args: any[]) {
    const array = args[argsIndex];
    const params = args.slice(0, argsIndex);

    if (array) {
      params.push(...array);
    }

    return func.apply(this, params);
  };
}
