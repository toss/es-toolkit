# es-toolkit Changelog

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
