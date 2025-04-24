/**
 * es-toolkit compatibility layer with lodash (WIP)
 * ====================================
 * ```tsx
 * // es-toolkit/compat aims to provide 100% feature parity with lodash
 * import { chunk } from 'es-toolkit/compat';
 *
 * chunk([1, 2, 3, 4], 0);
 * // Returns [], which is identical to lodash
 * ```
 *
 * `es-toolkit/compat` will offer complete compatibility with lodash, ensuring a seamless transition.
 *
 * To guarantee identical behavior, `es-toolkit/compat` will be thoroughly tested using actual lodash test cases.
 *
 * The primary goal of `es-toolkit/compat` is to serve as a drop-in replacement for lodash.
 *
 * It's important to note that while `es-toolkit/compat` will mirror the behavior of lodash functions with 100% accuracy,
 * it will deliberately omit unsafe features, such as:
 *
 * - Implicit type casting from an empty string `''` to 0 or false, and similar cases.
 *
 * @module
 */

export * from './compat.ts';

export { toolkit as default } from './toolkit.ts';
