/**
 * This method is like `partial` except that partially applied arguments are appended to the arguments it receives.
 *
 * The partialRight.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template F The type of the function to partially apply.
 * @param {F} func The function to partially apply arguments to.
 * @param {any[]} partialArgs The arguments to be partially applied.
 * @returns {(...args: any[]) => ReturnType<F>} Returns the new partially applied function.
 *
 * @example
 * function greet(greeting, name) {
 *   return greeting + ' ' + name;
 * }
 *
 * const greetFred = partialRight(greet, 'fred');
 * greetFred('hi');
 * // => 'hi fred'
 *
 * // Partially applied with placeholders.
 * const sayHelloTo = partialRight(greet, 'hello', partialRight.placeholder);
 * sayHelloTo('fred');
 * // => 'hello fred'
 */
export function partialRight<F extends (...args: any[]) => any>(
  func: F,
  ...partialArgs: any[]
): (...args: any[]) => ReturnType<F> {
  return function (this: any, ...providedArgs: any[]) {
    const placeholderLength = partialArgs.filter(arg => arg === partialRightPlaceholder).length;
    const rangeLength = Math.max(providedArgs.length - placeholderLength, 0);
    const args: any[] = [];

    let providedIndex = 0;
    for (let i = 0; i < rangeLength; i++) {
      args.push(providedArgs[providedIndex++]);
    }
    for (let i = 0; i < partialArgs.length; i++) {
      const arg = partialArgs[i];

      if (arg === partialRight.placeholder) {
        args.push(providedArgs[providedIndex++]);
      } else {
        args.push(arg);
      }
    }
    return func.apply(this, args);
  } as any as F;
}

const partialRightPlaceholder: unique symbol = Symbol('partialRight.placeholder');
partialRight.placeholder = partialRightPlaceholder;
