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

export { castArray } from './array/castArray.ts';
export { chunk } from './array/chunk.ts';
export { compact } from './array/compact.ts';
export { concat } from './array/concat.ts';
export { difference } from './array/difference.ts';
export { differenceBy } from './array/differenceBy.ts';
export { differenceWith } from './array/differenceWith.ts';
export { drop } from './array/drop.ts';
export { dropRight } from './array/dropRight.ts';
export { dropRightWhile } from './array/dropRightWhile.ts';
export { dropWhile } from './array/dropWhile.ts';
export { every } from './array/every.ts';
export { fill } from './array/fill.ts';
export { filter } from './array/filter.ts';
export { find } from './array/find.ts';
export { findIndex } from './array/findIndex.ts';
export { findLastIndex } from './array/findLastIndex.ts';
export { flatten } from './array/flatten.ts';
export { flattenDeep } from './array/flattenDeep.ts';
export { flattenDepth } from './array/flattenDepth.ts';
export { forEach as each } from './array/forEach.ts';
export { forEach } from './array/forEach.ts';
export { head } from './array/head.ts';
export { head as first } from './array/head.ts';
export { includes } from './array/includes.ts';
export { indexOf } from './array/indexOf.ts';
export { intersection } from './array/intersection.ts';
export { intersectionBy } from './array/intersectionBy.ts';
export { join } from './array/join.ts';
export { last } from './array/last.ts';
export { lastIndexOf } from './array/lastIndexOf.ts';
export { map } from './array/map.ts';
export { nth } from './array/nth.ts';
export { orderBy } from './array/orderBy.ts';
export { pull } from './array/pull.ts';
export { pullAll } from './array/pullAll.ts';
export { remove } from './array/remove.ts';
export { reverse } from './array/reverse.ts';
export { sample } from './array/sample.ts';
export { size } from './array/size.ts';
export { slice } from './array/slice.ts';
export { some } from './array/some.ts';
export { sortBy } from './array/sortBy.ts';
export { tail } from './array/tail.ts';
export { take } from './array/take.ts';
export { takeRight } from './array/takeRight.ts';
export { takeRightWhile } from './array/takeRightWhile.ts';
export { union } from './array/union.ts';
export { uniq } from './array/uniq.ts';
export { uniqBy } from './array/uniqBy.ts';
export { unzip } from './array/unzip.ts';
export { without } from './array/without.ts';
export { zip } from './array/zip.ts';
export { zipObjectDeep } from './array/zipObjectDeep.ts';

export { after } from './function/after.ts';
export { ary } from './function/ary.ts';
export { attempt } from './function/attempt.ts';
export { before } from './function/before.ts';
export { bind } from './function/bind.ts';
export { bindKey } from './function/bindKey.ts';
export { curry } from './function/curry.ts';
export { curryRight } from './function/curryRight.ts';
export { debounce, type DebouncedFunction, type DebouncedFunction as DebouncedFunc } from './function/debounce.ts';
export { defer } from './function/defer.ts';
export { delay } from './function/delay.ts';
export { flip } from './function/flip.ts';
export { flow } from './function/flow.ts';
export { flowRight } from './function/flowRight.ts';
export { negate } from './function/negate.ts';
export { nthArg } from './function/nthArg.ts';
export { rearg } from './function/rearg.ts';
export { rest } from './function/rest.ts';
export { spread } from './function/spread.ts';
export { throttle } from './function/throttle.ts';

export { add } from './math/add.ts';
export { ceil } from './math/ceil.ts';
export { clamp } from './math/clamp.ts';
export { floor } from './math/floor.ts';
export { inRange } from './math/inRange.ts';
export { max } from './math/max.ts';
export { min } from './math/min.ts';
export { parseInt } from './math/parseInt.ts';
export { random } from './math/random.ts';
export { range } from './math/range.ts';
export { rangeRight } from './math/rangeRight.ts';
export { round } from './math/round.ts';
export { subtract } from './math/subtract.ts';
export { sum } from './math/sum.ts';
export { sumBy } from './math/sumBy.ts';

export { assignIn } from './object/assignIn.ts';
export { assignIn as extend } from './object/assignIn.ts';
export { cloneDeep } from './object/cloneDeep.ts';
export { cloneDeepWith } from './object/cloneDeepWith.ts';
export { defaults } from './object/defaults.ts';
export { findKey } from './object/findKey.ts';
export { fromPairs } from './object/fromPairs.ts';
export { get } from './object/get.ts';
export { has } from './object/has.ts';
export { invertBy } from './object/invertBy.ts';
export { keys } from './object/keys.ts';
export { keysIn } from './object/keysIn.ts';
export { mapKeys } from './object/mapKeys.ts';
export { mapValues } from './object/mapValues.ts';
export { merge } from './object/merge.ts';
export { mergeWith } from './object/mergeWith.ts';
export { omit } from './object/omit.ts';
export { pick } from './object/pick.ts';
export { property } from './object/property.ts';
export { propertyOf } from './object/propertyOf.ts';
export { set } from './object/set.ts';
export { toDefaulted } from './object/toDefaulted.ts';
export { unset } from './object/unset.ts';

export { conforms } from './predicate/conforms.ts';
export { conformsTo } from './predicate/conformsTo.ts';
export { isArguments } from './predicate/isArguments.ts';
export { isArray } from './predicate/isArray.ts';
export { isArrayBuffer } from './predicate/isArrayBuffer.ts';
export { isArrayLike } from './predicate/isArrayLike.ts';
export { isArrayLikeObject } from './predicate/isArrayLikeObject.ts';
export { isBoolean } from './predicate/isBoolean.ts';
export { isBuffer } from './predicate/isBuffer.ts';
export { isDate } from './predicate/isDate.ts';
export { isElement } from './predicate/isElement.ts';
export { isEmpty } from './predicate/isEmpty.ts';
export { isEqualWith } from './predicate/isEqualWith.ts';
export { isError } from './predicate/isError.ts';
export { isFinite } from './predicate/isFinite.ts';
export { isInteger } from './predicate/isInteger.ts';
export { isMap } from './predicate/isMap.ts';
export { isMatch } from './predicate/isMatch.ts';
export { isNaN } from './predicate/isNaN.ts';
export { isNil } from './predicate/isNil.ts';
export { isNumber } from './predicate/isNumber.ts';
export { isObject } from './predicate/isObject.ts';
export { isObjectLike } from './predicate/isObjectLike.ts';
export { isPlainObject } from './predicate/isPlainObject.ts';
export { isRegExp } from './predicate/isRegExp.ts';
export { isSafeInteger } from './predicate/isSafeInteger.ts';
export { isSet } from './predicate/isSet.ts';
export { isString } from './predicate/isString.ts';
export { isSymbol } from './predicate/isSymbol.ts';
export { isTypedArray } from './predicate/isTypedArray.ts';
export { isWeakMap } from './predicate/isWeakMap.ts';
export { isWeakSet } from './predicate/isWeakSet.ts';
export { matches } from './predicate/matches.ts';
export { matchesProperty } from './predicate/matchesProperty.ts';

export { camelCase } from './string/camelCase.ts';
export { deburr } from './string/deburr.ts';
export { endsWith } from './string/endsWith.ts';
export { escape } from './string/escape.ts';
export { escapeRegExp } from './string/escapeRegExp.ts';
export { kebabCase } from './string/kebabCase.ts';
export { lowerCase } from './string/lowerCase.ts';
export { lowerFirst } from './string/lowerFirst.ts';
export { pad } from './string/pad.ts';
export { padEnd } from './string/padEnd.ts';
export { padStart } from './string/padStart.ts';
export { repeat } from './string/repeat.ts';
export { replace } from './string/replace.ts';
export { snakeCase } from './string/snakeCase.ts';
export { startCase } from './string/startCase.ts';
export { startsWith } from './string/startsWith.ts';
export { template, templateSettings } from './string/template.ts';
export { toLower } from './string/toLower.ts';
export { toUpper } from './string/toUpper.ts';
export { trim } from './string/trim.ts';
export { trimEnd } from './string/trimEnd.ts';
export { trimStart } from './string/trimStart.ts';
export { unescape } from './string/unescape.ts';
export { upperCase } from './string/upperCase.ts';
export { upperFirst } from './string/upperFirst.ts';
export { words } from './string/words.ts';

export { constant } from './util/constant.ts';
export { defaultTo } from './util/defaultTo.ts';
export { eq } from './util/eq.ts';
export { gt } from './util/gt.ts';
export { gte } from './util/gte.ts';
export { invoke } from './util/invoke.ts';
export { iteratee } from './util/iteratee.ts';
export { lt } from './util/lt.ts';
export { lte } from './util/lte.ts';
export { method } from './util/method.ts';
export { methodOf } from './util/methodOf.ts';
export { now } from './util/now.ts';
export { stubArray } from './util/stubArray.ts';
export { stubFalse } from './util/stubFalse.ts';
export { stubObject } from './util/stubObject.ts';
export { stubString } from './util/stubString.ts';
export { stubTrue } from './util/stubTrue.ts';
export { times } from './util/times.ts';
export { toArray } from './util/toArray.ts';
export { toFinite } from './util/toFinite.ts';
export { toInteger } from './util/toInteger.ts';
export { toLength } from './util/toLength.ts';
export { toNumber } from './util/toNumber.ts';
export { toPath } from './util/toPath.ts';
export { toPlainObject } from './util/toPlainObject.ts';
export { toSafeInteger } from './util/toSafeInteger.ts';
export { toString } from './util/toString.ts';
export { uniqueId } from './util/uniqueId.ts';
