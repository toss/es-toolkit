import { bench, describe } from 'vitest';
import { flatMap as flatMapToolkit_ } from 'es-toolkit';
import { flatMap as flatMapToolkitCompat_ } from 'es-toolkit/compat';
import { flatMapDepth as flatMapDepthLodash_ } from 'lodash';

const flatMapToolkit = flatMapToolkit_;
const flatMapToolkitCompat = flatMapToolkitCompat_;
const flatMapDepthLodash = flatMapDepthLodash_;

function createNestedArray(arr: any[], depth: number) {
  let result = arr;

  for (let i = 0; i < depth; i++) {
    result = [result];
  }
  return result;
}

describe('flatMap', () => {
  const iteratee = (item: number) => [item, item, item];
  const arr = Array.from({ length: 30 }, (_, i) => i);

  bench('es-toolkit/flatMap', () => {
    flatMapToolkit(arr, iteratee);
  });

  bench('es-toolkit/compat/flatMap', () => {
    flatMapToolkitCompat(arr, iteratee);
  });

  bench('js built-in/map.flat', () => {
    arr.map(iteratee).flat();
  });
});

describe('flatMapDepth', () => {
  const iterateeDepth = (item: number) => createNestedArray([item, item, item], 10);
  const arr = Array.from({ length: 30 }, (_, i) => i);

  bench('es-toolkit/flatMap', () => {
    flatMapToolkit(arr, iterateeDepth, 10);
  });

  bench('lodash/flatMapDepth', () => {
    flatMapDepthLodash(arr, iterateeDepth, 10);
  });

  bench('js built-in/map.flat', () => {
    arr.map(iterateeDepth).flat(10);
  });
});
