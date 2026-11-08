import { flatMapDeep as flatMapDeepToolkit } from 'es-toolkit';
import { flatMapDeep as flatMapDeepToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

function createNestedArray(arr: any[], depth: number) {
  let result = arr;

  for (let i = 0; i < depth; i++) {
    result = [result];
  }
  return result;
}

group('flatMapDeep', () => {
  const iterateeDepth = (item: number) => createNestedArray([item, item, item], 10);
  const arr = Array.from({ length: 30 }, (_, i) => i);

  bench('es-toolkit/flatMapDeep', () => {
    do_not_optimize(flatMapDeepToolkit(arr, iterateeDepth));
  });

  bench('es-toolkit/compat/flatMapDeep', () => {
    do_not_optimize(flatMapDeepToolkitCompat(arr, iterateeDepth));
  });

  bench('lodash/flatMapDeep', () => {
    do_not_optimize(lodash.flatMapDeep(arr, iterateeDepth));
  });

  bench('js built-in/map.flat', () => {
    do_not_optimize(arr.map(iterateeDepth).flat(Infinity));
  });
});
