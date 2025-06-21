import { identity } from '../../function/identity.ts';
import { Many } from '../_internal/Many.ts';
import { iteratee } from '../util/iteratee.ts';

/**
 * Creates a function that invokes `func` with its arguments transformed by corresponding transform functions.
 *
 * Transform functions can be:
 * - Functions that accept and return a value
 * - Property names (strings) to get a property value from each argument
 * - Objects to check if arguments match the object properties
 * - Arrays of [property, value] to check if argument properties match values
 *
 * If a transform is nullish, the identity function is used instead.
 * Only transforms arguments up to the number of transform functions provided.
 *
 * @template F - The type of the function to wrap
 * @template T - The type of the transform functions array
 * @param {F} func - The function to wrap
 * @param {T} transforms - The functions to transform arguments. Each transform can be:
 *   - A function that accepts and returns a value
 *   - A string to get a property value (e.g. 'name' gets the name property)
 *   - An object to check if arguments match its properties
 *   - An array of [property, value] to check property matches
 * @returns {(...args: any[]) => ReturnType<F>} A new function that transforms arguments before passing them to func
 * @throws {TypeError} If func is not a function.
 * @example
 * ```ts
 * function doubled(n: number) {
 *   return n * 2;
 * }
 *
 * function square(n: number) {
 *   return n * n;
 * }
 *
 * const func = overArgs((x, y) => [x, y], [doubled, square]);
 *
 * func(5, 3);
 * // => [10, 9]
 *
 * // With property shorthand
 * const user = { name: 'John', age: 30 };
 * const getUserInfo = overArgs(
 *   (name, age) => `${name} is ${age} years old`,
 *   ['name', 'age']
 * );
 * getUserInfo(user, user);
 * // => "John is 30 years old"
 * ```
 */
export function overArgs(
  func: (...args: any[]) => any,
  ..._transforms: Array<Many<(...args: any[]) => any>>
): (...args: any[]) => any {
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }

  const transforms = Array.isArray(_transforms) ? _transforms : [_transforms];

  return function (this: any, ...args: any[]) {
    const length = Math.min(args.length, transforms.length);
    const transformedArgs = [...args];

    for (let i = 0; i < length; i++) {
      const transform = iteratee(transforms[i] ?? identity);
      transformedArgs[i] = transform.call(this, args[i]);
    }

    return func.apply(this, transformedArgs);
  };
}
