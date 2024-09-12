/**
 * Creates a function that invokes the method at `object[key]` with `partialArgs` prepended to the arguments it receives.
 *
 * This method differs from `bind` by allowing bound functions to reference methods that may be redefined or don't yet exist.
 *
 * The `bindKey.placeholder` value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * @template T - The type of the object to bind.
 * @template K - The type of the key to bind.
 * @param {T} object - The object to invoke the method on.
 * @param {K} key - The key of the method.
 * @param {...any} partialArgs - The arguments to be partially applied.
 * @returns {T[K] extends (...args: any[]) => any ? (...args: any[]) => ReturnType<T[K]> : never} - Returns the new bound function.
 *
 * @example
 * const object = {
 *   user: 'fred',
 *   greet: function (greeting, punctuation) {
 *     return greeting + ' ' + this.user + punctuation;
 *   },
 * };
 *
 * let bound = bindKey(object, 'greet', 'hi');
 * bound('!');
 * // => 'hi fred!'
 *
 * object.greet = function (greeting, punctuation) {
 *   return greeting + 'ya ' + this.user + punctuation;
 * };
 *
 * bound('!');
 * // => 'hiya fred!'
 *
 * // Bound with placeholders.
 * bound = bindKey(object, 'greet', bindKey.placeholder, '!');
 * bound('hi');
 * // => 'hiya fred!'
 */
export function bindKey<T extends Record<PropertyKey, any>, K extends keyof T>(
  object: T,
  key: K,
  ...partialArgs: any[]
): T[K] extends (...args: any[]) => any ? (...args: any[]) => ReturnType<T[K]> : never {
  const bound = function (this: any, ...providedArgs: any[]) {
    const args: any[] = [];

    // Populate args by merging partialArgs and providedArgs.
    // e.g.. when we call bind(func, {}, [1, bind.placeholder, 3])(2, 4);
    // we have args with [1, 2, 3, 4].
    let startIndex = 0;

    for (let i = 0; i < partialArgs.length; i++) {
      const arg = partialArgs[i];

      if (arg === bindKey.placeholder) {
        args.push(providedArgs[startIndex++]);
      } else {
        args.push(arg);
      }
    }

    for (let i = startIndex; i < providedArgs.length; i++) {
      args.push(providedArgs[i]);
    }

    if (this instanceof bound) {
      return new object[key](...args);
    }

    // eslint-disable-next-line prefer-spread
    return object[key].apply(object, args);
  };

  return bound as any;
}

const bindKeyPlaceholder: unique symbol = Symbol('bindKey.placeholder');
bindKey.placeholder = bindKeyPlaceholder;
