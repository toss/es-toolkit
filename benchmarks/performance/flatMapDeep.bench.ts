import { bench, describe } from 'vitest';
import { flatMapDeep as flatMapToolkit } from 'es-toolkit';
import { flatMapDeep as flatMapDeep } from 'lodash';

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
    flatMapToolkit(arr, iterateeDepth);
  });

  bench('lodash/flatMapDeep', () => {
    flatMapDeep(arr, iterateeDepth);
  });

  bench('js built-in/map.flat', () => {
    arr.map(iterateeDepth).flat(Infinity);
  });
});
