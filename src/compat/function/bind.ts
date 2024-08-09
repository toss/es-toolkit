/**
 * Creates a function that invokes `func` with the `this` binding of `thisArg` and `partials` prepended to the arguments it receives.
 *
 * The `bind.placeholder` value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * Note: Unlike native `Function#bind`, this method doesn't set the `length` property of bound functions.
 *
 * @param {(...args: any[]) => any} func  The function to bind.
 * @param {any} thisArg  The `this` binding of `func`.
 * @param {any[]} partials  The arguments to be partially applied.
 * @returns {(...args: any[]) => any} Returns the new bound function.
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
export function bind<F extends Function>(func: F, thisObj?: unknown, ...partialArgs: any[]): F {
  const binded = function (this: any, ...providedArgs: any[]) {
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

    if (this instanceof binded) {
      // @ts-expect-error - fn is a constructor
      return new func(...args);
    }

    return func.apply(thisObj, args);
  };

  return binded as any as F;
}

bind.placeholder = Symbol('bind.placeholder');