/**
 * Creates a function that invokes `func` with the `this` binding of `thisArg` and `partials` prepended to the arguments it receives.
 *
 * The `bind.placeholder` value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: Unlike native `Function#bind`, this method doesn't set the `length` property of bound functions.
 *
 * @template F - The type of the function to bind.
 * @param func - The function to bind.
 * @param thisObj - The `this` binding of `func`.
 * @param partialArgs - The arguments to be partially applied.
 * @returns - Returns the new bound function.
 *
 * @example
 * function greet(greeting, punctuation) {
 *   return greeting + ' ' + this.user + punctuation;
 * }
 * const object = { user: 'fred' };
 * let bound = bind(greet, object, 'hi');
 * bound('!');
 * // => 'hi fred!'
 *
 * bound = bind(greet, object, bind.placeholder, '!');
 * bound('hi');
 * // => 'hi fred!'
 */
export function bind<F extends (...args: any[]) => any>(func: F, thisObj?: unknown, ...partialArgs: any[]): F {
  const bound = function (this: any, ...providedArgs: any[]) {
    const args: any[] = [];

    // Populate args by merging partialArgs and providedArgs.
    // e.g.. when we call bind(func, {}, [1, bind.placeholder, 3])(2, 4);
    // we have args with [1, 2, 3, 4].
    let startIndex = 0;

    for (let i = 0; i < partialArgs.length; i++) {
      const arg = partialArgs[i];

      if (arg === bind.placeholder) {
        args.push(providedArgs[startIndex++]);
      } else {
        args.push(arg);
      }
    }

    for (let i = startIndex; i < providedArgs.length; i++) {
      args.push(providedArgs[i]);
    }

    if (this instanceof bound) {
      // @ts-expect-error - fn is a constructor
      return new func(...args);
    }

    return func.apply(thisObj, args);
  };

  return bound as any as F;
}

const bindPlaceholder: unique symbol = Symbol('bind.placeholder');
bind.placeholder = bindPlaceholder;
