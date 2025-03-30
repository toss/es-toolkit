import { isNull, isUndefined } from '../../predicate';
import { isNaN } from '../predicate/isNaN';
import { isNil } from '../predicate/isNil';
import { isSymbol } from '../predicate/isSymbol';

type PropertyName = string | number | symbol;

type Iteratee<T, R> = ((value: T) => R) | PropertyName | [PropertyName, any] | Partial<T>;

function iterateeToFunction<T, R>(iteratee: Iteratee<T, R>): (value: T) => any {
  if (typeof iteratee === 'function') {
    return iteratee;
  }

  if (typeof iteratee === 'string' || typeof iteratee === 'number' || typeof iteratee === 'symbol') {
    return (obj: any) => obj?.[iteratee];
  }

  if (Array.isArray(iteratee)) {
    const [path, value] = iteratee;
    return (obj: any) => obj?.[path] === value;
  }

  return (obj: any) => {
    for (const key in iteratee) {
      if (obj?.[key] !== iteratee[key]) {
        return false;
      }
    }
    return true;
  };
}

const MAX_ARRAY_LENGTH = 4294967295;
const MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1;
/**
 * This method is like `sortedIndex` except that it accepts `iteratee`
 * which is invoked for `value` and each element of `array` to compute their
 * sort ranking. The iteratee is invoked with one argument: (value).
 *
 * @param {ArrayLike<T> | null | undefined} array The sorted array to inspect.
 * @param {T} value The value to evaluate.
 * @param {(value: T) => R} iteratee The iteratee invoked per element.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 * @example
 * const objects = [{ 'n': 4 }, { 'n': 5 }]
 * sortedIndexBy(objects, { 'n': 4 }, ({ n }) => n)
 * // => 0
 */
export function sortedIndexBy<T, R>(
  array: ArrayLike<T> | null | undefined,
  value: T,
  iteratee?: Iteratee<T, R>,
  retHighest?: boolean
): number {
  let low = 0;
  let high = array == null ? 0 : array.length;
  if (high === 0 || isNil(array)) {
    return 0;
  }

  const iterFn = iteratee ? iterateeToFunction(iteratee) : (val: T) => val;
  const transformedValue = iterFn(value);

  const valIsNaN = isNaN(transformedValue);
  const valIsNull = isNull(transformedValue);
  const valIsSymbol = isSymbol(transformedValue);
  const valIsUndefined = isUndefined(transformedValue);

  while (low < high) {
    let setLow: boolean;
    const mid = Math.floor((low + high) / 2);
    const computed = iterFn(array[mid]);

    const othIsDefined = !isUndefined(computed);
    const othIsNull = isNull(computed);
    const othIsReflexive = !isNaN(computed);
    const othIsSymbol = isSymbol(computed);

    if (valIsNaN) {
      setLow = retHighest || othIsReflexive;
    } else if (valIsUndefined) {
      setLow = othIsReflexive && (retHighest || othIsDefined);
    } else if (valIsNull) {
      setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
    } else if (valIsSymbol) {
      setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
    } else if (othIsNull || othIsSymbol) {
      setLow = false;
    } else {
      setLow = retHighest ? computed! <= transformedValue : computed! < transformedValue;
    }

    if (setLow) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return Math.min(high, MAX_ARRAY_INDEX);
}
