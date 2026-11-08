import { flatMap as flatMapToolkit } from 'es-toolkit';
import { flatMap as flatMapToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

function createNestedArray(arr: any[], depth: number) {
  let result = arr;

  for (let i = 0; i < depth; i++) {
    result = [result];
  }
  return result;
}

group('flatMap', () => {
  const iteratee = (item: number) => [item, item, item];
  const arr = Array.from({ length: 30 }, (_, i) => i);

  bench('es-toolkit/flatMap', () => {
    do_not_optimize(flatMapToolkit(arr, iteratee));
  });

  bench('es-toolkit/compat/flatMap', () => {
    do_not_optimize(flatMapToolkitCompat(arr, iteratee));
  });

  bench('js built-in/map.flat', () => {
    do_not_optimize(arr.map(iteratee).flat());
  });
});

group('flatMapDepth', () => {
  const iterateeDepth = (item: number) => createNestedArray([item, item, item], 10);
  const arr = Array.from({ length: 30 }, (_, i) => i);

  bench('es-toolkit/flatMap', () => {
    do_not_optimize(flatMapToolkit(arr, iterateeDepth, 10));
  });

  bench('lodash/flatMapDepth', () => {
    do_not_optimize(lodash.flatMapDepth(arr, iterateeDepth, 10));
  });

  bench('js built-in/map.flat', () => {
    do_not_optimize(arr.map(iterateeDepth).flat(10));
  });
});
