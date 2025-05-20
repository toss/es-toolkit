import { flatten } from '../../array';
import { identity, matches, matchesProperty, property, unary } from '../compat';

type MatchesPropertyArray = [string | Array<string | number>, any];

type MatchesObject = Record<string, any>;

type ProcessTransformElementInput =
  | ((arg: any) => any) // Case: A function itself
  | MatchesPropertyArray // Case: A specific array pattern for property matching
  | MatchesObject // Case: A general object for predicate matching
  | string // Case: A string for property access
  | number // Case: A number for property access
  | boolean // Case: A boolean for property access
  | symbol // Case: A symbol for property access
  | null // Case: Null value
  | undefined; // Case: Undefined value

type ProcessedTransformFunction = (arg: any) => any;

/**
 * Processes a single transformation element specification into a function.
 * This internal helper function determines the type of transformation based on the input value.
 *
 * @param {ProcessTransformElementInput} value The value specifying the transformation.
 * @returns {ProcessedTransformFunction} Returns a function that performs the specified transformation.
 */
function processTransformElement(value: ProcessTransformElementInput): ProcessedTransformFunction {
  if (value === null) {
    return identity;
  }

  if (typeof value === 'function') {
    return unary(value as (...args: any[]) => any);
  }

  if (Array.isArray(value)) {
    if (value.length === 2) {
      const path = value[0];
      if (typeof path === 'string' || Array.isArray(path)) {
        return unary(matchesProperty(path, value[1]));
      }
    }
  }

  if (typeof value === 'object') {
    return unary(matches(value));
  }

  if (typeof value === 'boolean') {
    const path = typeof value === 'boolean' ? String(value) : value;
    return unary(property(path));
  }

  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'symbol') {
    return unary(property(value));
  }

  return identity;
}

type OverArgsTransformArg = ProcessTransformElementInput | Array<OverArgsTransformArg>;

/**
 * Creates a function that invokes `func` with arguments transformed according to the
 * corresponding transformation functions.
 *
 * The `transformsArgs` provide the specifications for the transformations.
 * Each specification can be:
 * - A `function`: The function is applied to the corresponding argument.
 * - `null` or `undefined`: The argument is passed through unchanged.
 * - A `string`, `number`, `boolean`, or `symbol`: Used as a property path/key to access a value on the corresponding argument.
 * - An `object` (not array): Used as a predicate object to check if the corresponding argument matches properties.
 * - An `Array` of length 2, `[path, value]`: Used as a property matcher to check if the corresponding argument has the property at `path` equal to `value`.
 *
 * Transformations are applied to the first `n` arguments of the new function, where `n` is the number of transformation specifications provided.
 * Arguments beyond the number of transformations are passed through unchanged.
 *
 * @template TFunc The type of the function to invoke.
 * @param {TFunc} func The function to invoke.
 * @param {...Array<OverArgsTransformArg>} transformsArgs The transformation specifications. Can be provided as individual arguments or nested arrays.
 * @returns {(...args: Parameters<TFunc>) => ReturnType<TFunc>} Returns the new function that applies the transformations to its arguments before invoking `func`.
 *
 * @example
 * const doubled = (num: number) => num * 2;
 * const squared = (num: number) => num * num;
 * const func = overArgs((x, y) => [x, y], [doubled, squared]);
 * console.log(func(2, 3));
 * // => [4, 9]
 *
 * @example
 * const multiplyAndAdd = (a: number, b: number) => (a * 2) + b;
 * const doubleFirstArg = overArgs(multiplyAndAdd, (num: number) => num * 2);
 * console.log(doubleFirstArg(5, 10));
 * // => 30 (5 * 2 + 10 = 20, 20 + 10 = 30)
 */
export function overArgs<TFunc extends (...args: any[]) => any>(
  func: TFunc,
  ...transformsArgs: Array<OverArgsTransformArg>
): (...args: any[]) => ReturnType<TFunc> {
  const transforms: Array<(arg: any) => any> = flatten(transformsArgs).map(processTransformElement);

  const funcsLength = transforms.length;

  return function (this: ThisParameterType<TFunc>, ...args: Parameters<TFunc>): ReturnType<TFunc> {
    const context = this;
    const argsCount = args.length;
    const limit = Math.min(argsCount, funcsLength);
    const processedArgs: any[] = new Array(argsCount);
    for (let i = 0; i < argsCount; i++) {
      processedArgs[i] = args[i];
    }

    for (let i = 0; i < limit; i++) {
      const transform = transforms[i];
      processedArgs[i] = transform.call(context, args[i]);
    }

    return func.apply(context, processedArgs);
  };
}
