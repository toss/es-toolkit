import { bench, describe } from 'vitest';
import { flatMapDepth as flatMapDepthToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { flatMapDepth: flatMapDepthLodash } = lodash;

function createNestedArray(arr: any[], depth: number) {
  let result = arr;

  for (let i = 0; i < depth; i++) {
    result = [result];
  }
  return result;
}

describe('flatMapDepth', () => {
  const iterateeDepth = (item: number) => createNestedArray([item, item, item], 10);
  const arr = Array.from({ length: 30 }, (_, i) => i);

  bench('es-toolkit/compat/flatMapDepth', () => {
    flatMapDepthToolkitCompat(arr, iterateeDepth, 100);
  });

  bench('lodash/flatMapDepth', () => {
    flatMapDepthLodash(arr, iterateeDepth, 100);
  });

  bench('js built-in/map.flat', () => {
    arr.map(iterateeDepth).flat(100);
  });
});
