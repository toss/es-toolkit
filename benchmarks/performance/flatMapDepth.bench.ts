import { flatMapDepth as flatMapDepthToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

function createNestedArray(arr: any[], depth: number) {
  let result = arr;

  for (let i = 0; i < depth; i++) {
    result = [result];
  }
  return result;
}

group('flatMapDepth', () => {
  const iterateeDepth = (item: number) => createNestedArray([item, item, item], 10);
  const arr = Array.from({ length: 30 }, (_, i) => i);

  bench('es-toolkit/compat/flatMapDepth', () => {
    do_not_optimize(flatMapDepthToolkitCompat(arr, iterateeDepth, 100));
  });

  bench('lodash/flatMapDepth', () => {
    do_not_optimize(lodash.flatMapDepth(arr, iterateeDepth, 100));
  });

  bench('js built-in/map.flat', () => {
    do_not_optimize(arr.map(iterateeDepth).flat(100));
  });
});
