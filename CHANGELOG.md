# es-toolkit Changelog

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
