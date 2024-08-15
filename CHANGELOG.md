# es-toolkit Changelog

## Version v1.16.0

Released on August 15th, 2024.

- Added support for [memoize](https://es-toolkit.slash.page/reference/function/memoize.html), [find](https://es-toolkit.slash.page/reference/compat/array/find.html), [findIndex](https://es-toolkit.slash.page/reference/compat/array/findIndex.html), [has](https://es-toolkit.slash.page/reference/compat/object/has.html), [partial](https://es-toolkit.slash.page/reference/function/partial.html), [partialRight](https://es-toolkit.slash.page/reference/function/partialRight.html), [sortBy](https://es-toolkit.slash.page/reference/array/sortBy.html), [isString](https://es-toolkit.slash.page/reference/predicate/isString.html), [rest](https://es-toolkit.slash.page/reference/function/rest.html), [padEnd](https://es-toolkit.slash.page/reference/compat/string/padEnd.html).

## Version v1.15.1

Released on August 10th, 2024.

- Disabled implicit conversion of values in [orderBy](https://es-toolkit.slash.page/reference/array/orderBy.html) for performance and simplicity.

## Version v1.15.0

Released on August 10th, 2024.

- Added support for [merge](https://es-toolkit.slash.page/reference/object/merge.html), [mergeWith](https://es-toolkit.slash.page/reference/object/mergeWith.html), [toMerged](https://es-toolkit.slash.page/reference/object/toMerged.html), [isSymbol](https://es-toolkit.slash.page/reference/predicate/isSymbol.html), [pascalCase](https://es-toolkit.slash.page/reference/string/pascalCase.html).
- Added compatibility tests with lodash for [orderBy](https://es-toolkit.slash.page/reference/array/orderBy.html).

## Version v1.14.0

Released on August 9th, 2024.

- (`es-toolkit`) Added support for [mapKeys](https://es-toolkit.slash.page/reference/object/mapKeys.html), [mapValues](https://es-toolkit.slash.page/reference/object/mapValues.html), [cloneDeep](https://es-toolkit.slash.page/reference/object/cloneDeep.html), [before](https://es-toolkit.slash.page/reference/function/before.html), [after](https://es-toolkit.slash.page/reference/function/after.html), [isSubset](https://es-toolkit.slash.page/reference/array/isSubset.html), [ary](https://es-toolkit.slash.page/reference/function/ary.html), [unary](https://es-toolkit.slash.page/reference/function/unary.html), [flattenDeep](https://es-toolkit.slash.page/reference/array/flattenDeep.html), [isEqual](https://es-toolkit.slash.page/reference/predicate/isEqual.html), [isFunction](https://es-toolkit.slash.page/reference/predicate/isFunction.html), [isBoolean](https://es-toolkit.slash.page/reference/predicate/isBoolean.html), [isPrimitive](https://es-toolkit.slash.page/reference/predicate/isPrimitive.html), and [isTypedArray](https://es-toolkit.slash.page/reference/predicate/isTypedArray.html).
- (`es-toolkit/compat`) Added support for [matches](https://es-toolkit.slash.page/reference/compat/predicate/matches.html), [isMatch](https://es-toolkit.slash.page/reference/compat/predicate/isMatch.html), [isArray](https://es-toolkit.slash.page/reference/compat/predicate/isArray.html), [isArrayLike](https://es-toolkit.slash.page/reference/compat/predicate/isArrayLike.html), [isObjectLike](https://es-toolkit.slash.page/reference/compat/predicate/isObjectLike.html), [isArguments](https://es-toolkit.slash.page/reference/compat/predicate/isArguments.html), [size](https://es-toolkit.slash.page/reference/compat/array/size.html), [bind](https://es-toolkit.slash.page/reference/compat/function/bind.html), [flattenDepth](https://es-toolkit.slash.page/reference/array/flatten.html), and [padStart](https://es-toolkit.slash.page/reference/compat/string/padStart.html).
- Added compatibility tests with lodash for many functions like [initial](https://es-toolkit.slash.page/reference/array/initial.html), [last](https://es-toolkit.slash.page/reference/array/last.html), [takeRight](https://es-toolkit.slash.page/reference/array/takeRight.html), [without](https://es-toolkit.slash.page/reference/array/without.html), [uniq](https://es-toolkit.slash.page/reference/array/uniq.html), [invert](https://es-toolkit.slash.page/reference/object/invert.html), [isNull](https://es-toolkit.slash.page/reference/predicate/isNull.html), [isUndefined](https://es-toolkit.slash.page/reference/predicate/isUndefined.html), and [isNil](https://es-toolkit.slash.page/reference/predicate/isNil.html).

## Version v1.13.1

Released on July 20th, 2024.

- Use the compatibility layer `es-toolkit/compat` in legacy CDN builds.

## Version v1.13.0

Released on July 20th, 2024.

`es-toolkit` can now be used in various CDNs, like [unpkg](https://unpkg.com) and [jsdelivr](https://www.jsdelivr.com). See more in our [usage docs](https://es-toolkit.slash.page/usage.html)

### Features

- Added support for [flattenObject](https://es-toolkit.slash.page/reference/object/flattenObject.html), [isPlainObject](https://es-toolkit.slash.page/reference/predicate/isPlainObject.html), [isLength](https://es-toolkit.slash.page/reference/predicate/isLength.html). ([3e60443](https://github.com/toss/es-toolkit/commit/3e60443a408d3296e4a18a1601a16f5953d414f9), [3764993](https://github.com/toss/es-toolkit/commit/376499351f347c269400ee0eeb5145ad041c7c06), [#245](https://github.com/toss/es-toolkit/pull/245))
- Added support for [concat](https://es-toolkit.slash.page/reference/compat/array/concat.html) in our compatibility layer `es-toolkit/compat`. ([e09517f](https://github.com/toss/es-toolkit/commit/e09517f05c180b43e0f2b0b0fa44167f9c4832f3))

### Lodash Compatibility

- Ensured compatibility with [difference](https://es-toolkit.slash.page/reference/array/difference.html) and [take](https://es-toolkit.slash.page/reference/compat/array/take.html)

## Version v1.12.0

Released on July 19th, 2024.

- Fixed a bug where `es-toolkit/compat` was not available in modern Node.js environments.
- Added support for [max](https://es-toolkit.slash.page/reference/compat/math/max.html) and [min](https://es-toolkit.slash.page/reference/compat/math/min.html) in our compatibility layer `es-toolkit/compat`. ([e1e6e38](https://github.com/toss/es-toolkit/commit/e1e6e38206750fb90f5b99cace9196635288e21c))

## Version v1.11.0

Released on July 18th, 2024.

### Introducing `es-toolkit/compat`

We're introducing `es-toolkit/compat`, a new module designed as a drop-in replacement for lodash. It replicates lodash's API, making it easier to switch between the two libraries.

`es-toolkit/compat` is undergoing rigorous testing using real `lodash` test cases. Initial benchmarks suggest it's typically 5% slower and increases bundle size by 10% compared to the original `es-toolkit`.

This module is intended to facilitate a smooth transition and should be replaced with the original `es-toolkit` for optimal performance once migration is complete.

For more information, see our [compatibility documentation](https://es-toolkit.slash.page/compatibility.html).

### Features

- Added support for [get](https://es-toolkit.slash.page/reference/compat/object/get.html) and [set](https://es-toolkit.slash.page/reference/compat/object/set.html) in our compatibility layer `es-toolkit/compat`. (https://github.com/toss/es-toolkit/pull/232, https://github.com/toss/es-toolkit/pull/223)
- Added support for [zipObjectDeep](https://es-toolkit.slash.page/reference/compat/array/zipObjectDeep.html) in our compatibility layer `es-toolkit/compat`. (https://github.com/toss/es-toolkit/pull/150)
- Added support for [flatMap](https://es-toolkit.slash.page/reference/compat/array/flatMap.html). (https://github.com/toss/es-toolkit/pull/209)
- Added support for [startCase](https://es-toolkit.slash.page/reference/string/startCase.html), [startsWith](https://es-toolkit.slash.page/reference/string/startsWith.html), and [endsWith](https://es-toolkit.slash.page/reference/string/endsWith.html). (https://github.com/toss/es-toolkit/pull/224).
- Added support for [withTimeout](https://es-toolkit.slash.page/reference/promise/withTimeout.html). (https://github.com/toss/es-toolkit/pull/210)

### Bug fixes

- Fixed `drop` and `dropRight` incorrectly accepting negative integers. (https://github.com/toss/es-toolkit/pull/218)
- Fixed `invert` not to invert inherited properties. (https://github.com/toss/es-toolkit/pull/221)

### Performance Improvements

- Improved performance for `dropRightWhile`. (https://github.com/toss/es-toolkit/pull/220)

## Version v1.10.1

Released on July 15th, 2024.

- Fixed [camelCase](https://es-toolkit.slash.page/reference/string/camelCase.html) using `capitalize` from incorrect import. ([8dda135](https://github.com/toss/es-toolkit/commit/8dda135fa339ae4953908a74b2e6eeca9f163a20))

## Version v1.10.0

Released on July 14th, 2024.

### Features

- Add support for [capitalize](https://es-toolkit.slash.page/reference/string/capitalize.html), [snakeCase](https://es-toolkit.slash.page/reference/string/snakeCase.html), [kebabCase](https://es-toolkit.slash.page/reference/string/kebabCase.html), [camelCase](https://es-toolkit.slash.page/reference/string/camelCase.html) and [lowerCase](https://es-toolkit.slash.page/reference/string/lowerCase.html). (https://github.com/toss/es-toolkit/pull/152, https://github.com/toss/es-toolkit/pull/161, https://github.com/toss/es-toolkit/pull/162, https://github.com/toss/es-toolkit/pull/166, [21d6530](https://github.com/toss/es-toolkit/commit/21d6530e16471d596410d57d59fd3ced8fc5569f)).
- Add support for [negate](https://es-toolkit.slash.page/reference/function/negate.html). (https://github.com/toss/es-toolkit/pull/177)
- Add support for [isEqual](https://es-toolkit.slash.page/reference/predicate/isEqual.html). (https://github.com/toss/es-toolkit/pull/174)
- Add support for [clone](https://es-toolkit.slash.page/reference/object/clone.html). (https://github.com/toss/es-toolkit/pull/155)
- Add support for [toFilled](https://es-toolkit.slash.page/reference/array/toFilled.html). (https://github.com/toss/es-toolkit/pull/154)
- Add support for [initial](https://es-toolkit.slash.page/reference/array/initial.html) and [last](https://es-toolkit.slash.page/reference/array/last.html). (https://github.com/toss/es-toolkit/pull/188, https://github.com/toss/es-toolkit/pull/149)
- Add support for [flattenDeep](https://es-toolkit.slash.page/reference/array/flattenDeep.html). (https://github.com/toss/es-toolkit/pull/160)

### Performance Improvements

- Optimize the performance of [isNil](https://es-toolkit.slash.page/reference/predicate/isNil.html) by simplifying its check. ([489ac76](https://github.com/toss/es-toolkit/commit/489ac76fc62f97cbfa3ca9eec2e0a4c03c4f5b1c))
- Optimize the performance of [sum](https://es-toolkit.slash.page/reference/array/sum.html). (https://github.com/toss/es-toolkit/pull/155)

## Version v1.9.0

Released on July 10th, 2024.

- Add support for [head](https://es-toolkit.slash.page/reference/array/head.html) and [tail](https://es-toolkit.slash.page/reference/array/tail.html). (https://github.com/toss/es-toolkit/pull/131, https://github.com/toss/es-toolkit/pull/143).
- Add support for [unzip](https://es-toolkit.slash.page/reference/array/unzip.html). (https://github.com/toss/es-toolkit/pull/130)
- Add support for [flatten](https://es-toolkit.slash.page/reference/array/flatten.html), which is six times faster than `Array#flat`. (https://github.com/toss/es-toolkit/pull/147)

## Version v1.8.0

Released on July 5th, 2024.

- Add support for [orderBy](https://es-toolkit.slash.page/reference/array/orderBy.html). (https://github.com/toss/es-toolkit/pull/123)
- Add support for [invert](https://es-toolkit.slash.page/reference/array/invert.html). (https://github.com/toss/es-toolkit/pull/125)
- Add support for [inRange](https://es-toolkit.slash.page/reference/array/inRange.html). (https://github.com/toss/es-toolkit/pull/124)

## Version v1.7.1

Released on July 3rd, 2024.

- Add support for [unzipWith](https://es-toolkit.slash.page/reference/array/unzipWith.html). (https://github.com/toss/es-toolkit/pull/113)
- Add support for [forEachRight](https://es-toolkit.slash.page/reference/array/forEachRight.html). (https://github.com/toss/es-toolkit/pull/119)
- Add support for [countBy](https://es-toolkit.slash.page/reference/array/countBy.html). (https://github.com/toss/es-toolkit/pull/117)
- Add support for [without](https://es-toolkit.slash.page/reference/array/without.html). (https://github.com/toss/es-toolkit/pull/115)
- Add support for [fill](https://es-toolkit.slash.page/reference/array/fill.html). (https://github.com/toss/es-toolkit/pull/109)
- Add support for [sampleSize](https://es-toolkit.slash.page/reference/array/sampleSize.html). (https://github.com/toss/es-toolkit/pull/101)
- Add support for [meanBy](https://es-toolkit.slash.page/reference/math/meanBy.html). (https://github.com/toss/es-toolkit/pull/104)
- Accept number and symbol keys in [keyBy](https://es-toolkit.slash.page/reference/array/keyBy.html) and [groupBy](https://es-toolkit.slash.page/reference/array/groupBy.html) (https://github.com/toss/es-toolkit/pull/98, https://github.com/toss/es-toolkit/pull/99)

## Version v1.6.1

Released on June 30th, 2024.

- Publish package on [JSR](https://jsr.io/@es-toolkit/es-toolkit).

## Version v1.6.0

Released on June 30th, 2024.

### Features

- Add support for [keyBy](https://es-toolkit.slash.page/reference/array/keyBy.html). (https://github.com/toss/es-toolkit/pull/93).
- Add support for [zipObject](https://es-toolkit.slash.page/reference/array/zipObject.html). (https://github.com/toss/es-toolkit/pull/92).
- Add support for [compact](https://es-toolkit.slash.page/reference/array/compact.html). ([60ae59b](https://github.com/toss/es-toolkit/commit/60ae59bcfee69992e5447322e1da9cb7631c5745))
- Add support for [mean](https://es-toolkit.slash.page/reference/math/mean.html). ([715bc60](https://github.com/toss/es-toolkit/commit/715bc60b26bb24ad490b8befe16204050699f0c0))

## Version v1.5.0

Released on June 28th, 2024.

### Features

- Add support for [range](https://es-toolkit.slash.page/reference/math/range.html). (https://github.com/toss/es-toolkit/pull/77, [2db11d8](https://github.com/toss/es-toolkit/commit/2db11d8882f6d7b0b53271c76f4c5007b6a9181e)).
- Add support for [minBy](https://es-toolkit.slash.page/reference/math/minBy.html) (https://github.com/toss/es-toolkit/pull/71).
- Add support for [maxBy](https://es-toolkit.slash.page/reference/math/maxBy.html) (https://github.com/toss/es-toolkit/pull/64).

### Bug fixes

- Enforce stricter argument types in `pickBy` and `omitBy`. (https://github.com/toss/es-toolkit/pull/60)
- Fix a bug in `difference` where one array parameter was not readonly. (https://github.com/toss/es-toolkit/pull/83)
- Fix a bug in `round` where it incorrectly accepts floating-point numbers as `precision`. (https://github.com/toss/es-toolkit/pull/79)

## Version v1.4.0

Released on June 15th, 2024.

### Features

- Add support for [random](https://es-toolkit.slash.page/reference/math/random.html). (https://github.com/toss/es-toolkit/pull/53)
- Add support for [randomInt](https://es-toolkit.slash.page/reference/math/randomInt.html). ([99a34e4](https://github.com/toss/es-toolkit/commit/99a34e4e9944c1b843e9d97dff0b5ff4e5eec260))
- Add support for using AbortSignals to cancel the `Promise` returned by `delay`. (https://github.com/toss/es-toolkit/pull/52)

### Performance Optimizations

- Optimized `uniqBy`. ([60e7974](https://github.com/toss/es-toolkit/commit/60e79741271e645bfa551f708466e43b136f69b1))

## Version v1.3.1

Released on June 15th, 2024.

- Fixed a bug in `dropWhile` where it incorrectly returned the entire array when no elements matched the predicate. (https://github.com/toss/es-toolkit/pull/49)

## Version v1.3.0

Released on June 14th, 2024.

### Features

- Add support for using AbortSignals to cancel `debounce`d functions. (https://github.com/toss/es-toolkit/pull/45)

### Performance Optimizations

- Optimize the time complexity of `intersection`. (https://github.com/toss/es-toolkit/pull/47)

## Version v1.2.2

Released on June 13th, 2024.

- Add support for `readonly` arrays in array utilities. (https://github.com/toss/es-toolkit/pull/32, [e595e5e](https://github.com/toss/es-toolkit/commit/e595e5e017e1f2cb138b1ad3d708635efc5e289e))
- Optimize the time complexity of `uniq`. (https://github.com/toss/es-toolkit/pull/40)
- Optimize the time complexity of `intersectionBy`. (https://github.com/toss/es-toolkit/pull/44)

## Version v1.2.1

Released on June 13th, 2024.

- Ensure that the `omit` and `pick` functions only accept plain JavaScript objects as arguments. (https://github.com/toss/es-toolkit/pull/35)

## Version v1.2.0

Released on June 8th, 2024.

### Features

- Added the `noop` function. (https://github.com/toss/es-toolkit/commit/678028dd3d60509b99dfec47aed7f1088140d19d)

### Performance Improvements

- Optimized the `difference` and `differenceBy` functions for better performance with large arrays. (https://github.com/toss/es-toolkit/pull/27, https://github.com/toss/es-toolkit/pull/28)

### Bug fixes

- Fixed `shuffle` to ensure it does not modify the original array. (https://github.com/toss/es-toolkit/pull/29)

## Version v1.1.0

Released on June 5th, 2024.

- Support passing arguments to throttled and debounced functions. (https://github.com/toss/es-toolkit/pull/26)

## Version v1.0.4

Released on June 4th, 2024.

- Provide correct type declarations for ECMAScript Modules. (https://github.com/toss/es-toolkit/pull/21)

## Version v1.0.3

Released on June 3rd, 2024.

- Provide correct types for `"module": "Node"`, ` "Node10"`, and `"Node16"`. (https://github.com/toss/es-toolkit/pull/16)

## Version v1.0.2

Initial release. Released on May 31th, 2024.
