import { isSubset as isSubsetToolkit } from 'es-toolkit';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

const isSubsetLodash = (array: any[], subset: any[]) => {
  return lodash.difference(array, subset).length === 0;
};

group('isSubset', () => {
  bench('es-toolkit/isSubset', () => {
    do_not_optimize(isSubsetToolkit([1, 2, 3], [1, 2]));
  });

  bench('lodash/difference implementation', () => {
    do_not_optimize(isSubsetLodash([1, 2, 3], [1, 2]));
  });
});

group('isSubset/largeArray', () => {
  const largeArray = Array.from({ length: 1000000 }, (_, index) => index);
  const subset = Array.from({ length: 1000 }, (_, index) => index);

  bench('es-toolkit/isSubset', () => {
    do_not_optimize(isSubsetToolkit(largeArray, subset));
  });

  bench('lodash/difference implementation', () => {
    do_not_optimize(isSubsetLodash(largeArray, subset));
  });
});
