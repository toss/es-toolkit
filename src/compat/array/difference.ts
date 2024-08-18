import { difference as differenceToolkit } from '../../array/difference.ts';
import { flatten } from '../../array/flatten.ts';

export function difference<T>(arr: readonly T[], ...values: Array<readonly T[]>): T[] {
  const arr1 = arr;
  const arr2 = flatten(values);

  return differenceToolkit(arr1, arr2);
}
