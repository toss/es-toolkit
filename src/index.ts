/**
 * es-toolkit
 * ====================================
 * A modern JavaScript utility library that's 2-3 times faster and up to 97% smaller—a major upgrade to lodash.
 *
 * es-toolkit is a state-of-the-art, high-performance JavaScript utility library
 * with a small bundle size and strong type annotations.
 *
 * - es-toolkit offers a variety of everyday utility functions with modern implementations, such as [debounce](https://es-toolkit.slash.page/reference/function/debounce.html), [delay](https://es-toolkit.slash.page/reference/promise/delay.html), [chunk](https://es-toolkit.slash.page/reference/array/chunk.html), [sum](https://es-toolkit.slash.page/reference/math/sum.html), and [pick](https://es-toolkit.slash.page/reference/object/pick.html).
 * - Designed with performance in mind, es-toolkit achieves [2-3× better performance](https://es-toolkit.slash.page/performance.html) in modern JavaScript environments.
 * - es-toolkit supports tree shaking out of the box, and [reduces JavaScript code by up to 97%](https://es-toolkit.slash.page/bundle-size.html) compared to other libraries.
 * - es-toolkit includes built-in TypeScript support, with straightforward yet robust types. It also provides useful type guards such as [isNotNil](https://es-toolkit.slash.page/reference/predicate/isNotNil.html).
 * - es-toolkit is battle-tested with 100% test coverage, ensuring reliability and robustness.
 *
 * ## Features
 *
 * Here are some of the features es-toolkit offers:
 *
 * - **Array**: Utilities for array manipulation, such as [uniq](https://es-toolkit.slash.page/reference/array/uniq.html) and [difference](https://es-toolkit.slash.page/reference/array/difference.html).
 * - **Function**: Tools for controlling function execution, including [debounce](https://es-toolkit.slash.page/reference/function/debounce.html) and [throttle](https://es-toolkit.slash.page/reference/function/throttle.html).
 * - **Math**: Numerical utilities like [sum](https://es-toolkit.slash.page/reference/math/sum.html) and [round](https://es-toolkit.slash.page/reference/math/round.html).
 * - **Object**: Tools for manipulating JavaScript objects, such as [pick](https://es-toolkit.slash.page/reference/object/pick.html) and [omit](https://es-toolkit.slash.page/reference/object/omit.html).
 * - **Predicate**: Type guard functions like [isNotNil](https://es-toolkit.slash.page/reference/predicate/isNotNil.html).
 * - **Promise**: Asynchronous utilities like [delay](https://es-toolkit.slash.page/reference/promise/delay.html).
 * - **String**: Utilities for string manipulation, such as [snakeCase](https://es-toolkit.slash.page/reference/string/snakeCase.html)
 *
 * ## Examples
 *
 * ```typescript
 * // import from '@es-toolkit/es-toolkit' in jsr.
 * import { debounce, chunk } from 'es-toolkit';
 *
 * const debouncedLog = debounce(message => {
 *   console.log(message);
 * }, 300);
 *
 * // This call will be debounced
 * debouncedLog('Hello, world!');
 *
 * const array = [1, 2, 3, 4, 5, 6];
 * const chunkedArray = chunk(array, 2);
 *
 * console.log(chunkedArray);
 * // Output: [[1, 2], [3, 4], [5, 6]]
 * ```
 *
 * ## Resources
 *
 * If you want to know more about the project, please take a look at the
 * following resources:
 *
 * - [GitHub](https://github.com/toss/es-toolkit)
 * - [Documentation](https://es-toolkit.slash.page)
 *
 * @module
 */
export * from './array/index.ts';
export * from './error/index.ts';
export * from './function/index.ts';
export * from './math/index.ts';
export * from './object/index.ts';
export * from './predicate/index.ts';
export * from './promise/index.ts';
export * from './string/index.ts';
export * from './util/index.ts';

// ECMAScript 2024 Iterator Helpers - Explicit Exports
export {
  hasNativeIteratorHelpers,
  // Prevent conflicts with existing array module by renaming using 'as'
  map as mapIterable,
  filter as filterIterable,
  take as takeIterable,
  drop as dropIterable,
} from './iterator/index.ts';

// ECMAScript 2025 Set Methods - Explicit Exports
export {
  hasNativeSetMethods,
  hasWorkingSetMethods,
  isSet,
  ensureSet,
  // Prevent conflicts with existing array module by renaming using 'as'
  intersection as setIntersection,
  union as setUnion,
  difference as setDifference,
  symmetricDifference,
} from './set/index.ts';
