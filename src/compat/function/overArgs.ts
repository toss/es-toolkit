/**
 * Creates a function that invokes `func` with its arguments transformed by the corresponding
 * transform functions.
 *
 * @param func - The function to wrap.
 * @param transforms - The functions to transform arguments. A transform can be a function, a string (property shorthand),
 *  or an array/object (matches shorthand).
 * @returns A new function that transforms its arguments before passing them to `func`.
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
export function overArgs<F extends (...args: any[]) => any, T extends any[]>(
  func: F,
  transforms: T
): (...args: any[]) => ReturnType<F> {
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }

  function createTransform(transform: any): (arg: any) => any {
    if (typeof transform === 'function') {
      return transform;
    }
    if (typeof transform === 'string') {
      return (obj: any) => obj?.[transform];
    }
    return (value: any) => value;
  }

  const transformsArray = Array.isArray(transforms) ? transforms : [transforms];

  return function (this: any, ...args: any[]) {
    const length = Math.min(args.length, transformsArray.length);
    const transformedArgs = [...args];

    for (let i = 0; i < length; i++) {
      const transform = createTransform(transformsArray[i]);
      transformedArgs[i] = transform(args[i]);
    }

    return func.apply(this, transformedArgs);
  };
}
