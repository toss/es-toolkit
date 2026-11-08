import { flattenDepth as flattenDepthToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('flattenDepth', () => {
  const arr = [1, [2, 3], [4, [5, 6]]];

  bench('es-toolkit/flattenDepth', () => {
    do_not_optimize(flattenDepthToolkit(arr, 2));
  });

  bench('lodash/flattenDepth', () => {
    do_not_optimize(lodash.flattenDepth(arr, 2));
  });
});
