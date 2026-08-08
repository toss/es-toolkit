import { bench, describe } from 'vitest';
import { flatMapDeep as flatMapDeepToolkit } from 'es-toolkit';
import { flatMapDeep as flatMapDeepToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { flatMapDeep: flatMapDeepLodash } = lodash;

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
