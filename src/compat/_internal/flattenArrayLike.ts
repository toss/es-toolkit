import { isArrayLikeObject } from '../predicate/isArrayLikeObject.ts';

export function flattenArrayLike<T>(values: Array<ArrayLike<T>>): T[] {
  const result: T[] = [];

  for (let i = 0; i < values.length; i++) {
    const arrayLike = values[i];

    if (!isArrayLikeObject(arrayLike)) {
      continue;
    }

    for (let j = 0; j < arrayLike.length; j++) {
      result.push(arrayLike[j]);
    }
  }

  return result;
}
