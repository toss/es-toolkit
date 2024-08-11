/**
 * Creates a function that invokes `func` with `partialArgs` prepended to the arguments it receives. This method is like `bind` except it does not alter the `this` binding.
 *
 * The partial.placeholder value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: This method doesn't set the `length` property of partially applied functions.
 *
 * @template F The type of the function to partially apply.
 * @param {F} func The function to partially apply arguments to.
 * @param {any[]} partialArgs The arguments to be partially applied.
 * @returns {F} Returns the new partially applied function.
 *
 * @example
 * function greet(greeting, name) {
 *   return greeting + ' ' + name;
 * }
 *
 * const sayHelloTo = partial(greet, 'hello');
 * sayHelloTo('fred');
 * // => 'hello fred'
 *
 * // Partially applied with placeholders.
 * const greetFred = partial(greet, partial.placeholder, 'fred');
 * greetFred('hi');
 * // => 'hi fred'
 */
export function partial<F extends (...args: any[]) => any>(func: F, ...partialArgs: any[]): F {
  return function (this: any, ...providedArgs: any[]) {
    const args: any[] = [];

    let startIndex = 0;
    for (let i = 0; i < partialArgs.length; i++) {
      const arg = partialArgs[i];

      if (arg === partial.placeholder) {
        args.push(providedArgs[startIndex++]);
      } else {
        args.push(arg);
      }
    }
    for (let i = startIndex; i < providedArgs.length; i++) {
      args.push(providedArgs[i]);
    }

    return func.apply(this, args);
  } as any as F;
}

const partialPlaceholder: unique symbol = Symbol('partial.placeholder');
partial.placeholder = partialPlaceholder;
