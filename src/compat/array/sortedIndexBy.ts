import { isNil } from '../predicate/isNil';
import { isSymbol } from '../predicate/isSymbol';

type Iteratee<T, R> = (value: T) => R;
const MAX_ARRAY_INDEX = Number.MAX_SAFE_INTEGER;

export function sortedIndexBy<T, R>(
  array: ArrayLike<T> | null | undefined,
  value: T,
  iteratee: Iteratee<T, R>,
  retHighest?: boolean
): number {
  let low = 0;
  let high = array == null ? 0 : array.length;
  if (high === 0 || isNil(array)) {
    return 0;
  }

  const transformedValue = iteratee(value);

  const valIsNaN = transformedValue !== transformedValue; // Check for NaN
  const valIsNull = transformedValue === null;
  const valIsSymbol = isSymbol(transformedValue);
  const valIsUndefined = transformedValue === undefined;

  while (low < high) {
    let setLow: boolean;
    const mid = Math.floor((low + high) / 2);
    const computed = iteratee(array[mid]);

    const othIsDefined = computed !== undefined;
    const othIsNull = computed === null;
    const othIsReflexive = computed === computed; // Check for NaN
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
