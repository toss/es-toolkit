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
export * from '../index.ts';

export { chunk } from './array/chunk.ts';
export { concat } from './array/concat.ts';
export { difference } from './array/difference.ts';
export { fill } from './array/fill.ts';
export { find } from './array/find.ts';
export { findIndex } from './array/findIndex.ts';
export { flatten } from './array/flatten.ts';
export { flattenDeep } from './array/flattenDeep.ts';
export { flattenDepth } from './array/flattenDepth.ts';
export { orderBy } from './array/orderBy.ts';
export { size } from './array/size.ts';
export { zipObjectDeep } from './array/zipObjectDeep.ts';
export { head as first } from '../array/head.ts';
export { indexOf } from './array/indexOf.ts';

export { ary } from './function/ary.ts';
export { bind } from './function/bind.ts';
export { rest } from './function/rest.ts';
export { spread } from './function/spread.ts';

export { get } from './object/get.ts';
export { set } from './object/set.ts';
export { has } from './object/has.ts';
export { property } from './object/property.ts';
export { mapKeys } from './object/mapKeys.ts';
export { mapValues } from './object/mapValues.ts';
export { merge } from './object/merge.ts';
export { mergeWith } from './object/mergeWith.ts';

export { isPlainObject } from './predicate/isPlainObject.ts';
export { isArray } from './predicate/isArray.ts';
export { isArguments } from './predicate/isArguments.ts';
export { isArrayLike } from './predicate/isArrayLike.ts';
export { isSymbol } from './predicate/isSymbol.ts';
export { isObjectLike } from './predicate/isObjectLike.ts';
export { isBoolean } from './predicate/isBoolean.ts';
export { isTypedArray } from './predicate/isTypedArray.ts';
export { isMatch } from './predicate/isMatch.ts';
export { isRegExp } from './predicate/isRegExp.ts';
export { isString } from './predicate/isString.ts';
export { matches } from './predicate/matches.ts';
export { matchesProperty } from './predicate/matchesProperty.ts';

export { startsWith } from './string/startsWith.ts';
export { endsWith } from './string/endsWith.ts';
export { padStart } from './string/padStart.ts';
export { padEnd } from './string/padEnd.ts';

export { max } from './math/max.ts';
export { min } from './math/min.ts';
