const semverRegExp =
  /^(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-(?:(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+(?:[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

/**
 * Checks if a given string is a valid semantic version according to the [Semantic Versioning 2.0.0](https://semver.org/) specification.
 *
 * @param {unknown} value The value to check if it is a SemVer string.
 * @returns {boolean} Returns `true` if `value` is a SemVer string, else `false`.
 *
 * @example
 * const value1 = '1.0.0';
 * const value2 = '1.0.0-alpha';
 * const value3 = '1.0.0+build.123';
 * const value4 = '1.0.0-alpha+build.123';
 *
 * console.log(isSemver(value1)); // true
 * console.log(isSemver(value2)); // true
 * console.log(isSemver(value3)); // true
 * console.log(isSemver(value4)); // true
 */
export function isSemver(value: unknown): boolean {
  if (typeof value !== 'string') {
    return false;
  }

  return semverRegExp.test(value);
}
