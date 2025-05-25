import { bench, describe } from 'vitest';
import { flatMapDeep as flatMapDeepToolkit_ } from 'es-toolkit';
import { flatMapDeep as flatMapDeepToolkitCompat_ } from 'es-toolkit/compat';
import { flatMapDeep as flatMapDeepLodash_ } from 'lodash';

const flatMapDeepToolkit = flatMapDeepToolkit_;
const flatMapDeepToolkitCompat = flatMapDeepToolkitCompat_;
const flatMapDeepLodash = flatMapDeepLodash_;

function createNestedArray(arr: any[], depth: number) {
  let result = arr;

  for (let i = 0; i < depth; i++) {
    result = [result];
  }
  return result;
}

describe('flatMapDeep', () => {
  const iterateeDepth = (item: number) => createNestedArray([item, item, item], 10);
  const arr = Array.from({ length: 30 }, (_, i) => i);

  bench('es-toolkit/flatMapDeep', () => {
    flatMapDeepToolkit(arr, iterateeDepth);
  });

  bench('es-toolkit/compat/flatMapDeep', () => {
    flatMapDeepToolkitCompat(arr, iterateeDepth);
  });

  bench('lodash/flatMapDeep', () => {
    flatMapDeepLodash(arr, iterateeDepth);
  });

  bench('js built-in/map.flat', () => {
    arr.map(iterateeDepth).flat(Infinity);
  });
});
