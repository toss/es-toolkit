/**
 *
 * Creates a function that invokes `func` with the `this` binding of `thisArg` and `partials` prepended to the arguments it receives.
 *
 * The `bind.placeholder` value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
 *
 * **Note:** Unlike native `Function#bind`, this method doesn't set the `length` property of bound functions.
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
export function bind(func: (...args: any[]) => any, thisArg?: any, ...partials: any[]): (...args: any[]) => any {
  const wrapper = function (this: any, ...args: any[]) {
    let index = 0;
    const result = partials.map(bindArg => {
      if (bindArg === bind.placeholder) {
        return args[index++];
      }
      return bindArg;
    });
    for (let i = index; i < args.length; i++) {
      result.push(args[i]);
    }
    if (this instanceof wrapper) {
      // @ts-expect-error - fn is a constructor
      return new func(...result);
    }
    return func.apply(thisArg, result);
  };
  return wrapper;
}

bind.placeholder = Symbol('bind.placeholder') as symbol;
