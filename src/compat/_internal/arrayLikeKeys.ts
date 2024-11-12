import { isIndex } from './isIndex';
import { isArguments } from '../predicate/isArguments';
import { isTypedArray } from '../predicate/isTypedArray';
import { times } from '../util/times';

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {ArrayLike<unknown>} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {string[]} Returns the array of property names.
 */
export function arrayLikeKeys(value: ArrayLike<unknown>, inherited: boolean): string[] {
  const isArr = Array.isArray(value);
  const isArg = !isArr && isArguments(value);
  const isBuff = !isArr && !isArg && Buffer?.isBuffer(value);
  const isType = !isArr && !isArg && !isBuff && isTypedArray(value);
  const skipIndexes = isArr || isArg || isBuff || isType;
  const result = skipIndexes ? times(value.length, String) : [];
  const length = result.length;

  for (var key in value) {
    if (
      (inherited || Object.hasOwn(value, key)) &&
      !(
        skipIndexes &&
        // Safari 9 has enumerable `arguments.length` in strict mode.
        (key == 'length' ||
          // Node.js 0.10 has enumerable non-index properties on buffers.
          (isBuff && (key == 'offset' || key == 'parent')) ||
          // PhantomJS 2 has enumerable non-index properties on typed arrays.
          (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
          // Skip index properties.
          isIndex(key, length))
      )
    ) {
      result.push(key);
    }
  }
  return result;
}
