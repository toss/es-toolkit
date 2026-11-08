import { intersection as intersectionToolkit } from 'es-toolkit';
import { intersection as intersectionCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('intersection, small arrays', () => {
  const array1 = [1, 2, 3];
  const array2 = [2, 4];

  bench('es-toolkit/intersection', () => {
    do_not_optimize(intersectionToolkit(array1, array2));
  });

  bench('es-toolkit/compat/intersection', () => {
    do_not_optimize(intersectionCompatToolkit(array1, array2));
  });

  bench('lodash/intersection', () => {
    do_not_optimize(lodash.intersection(array1, array2));
  });
});

group('intersection, large arrays', () => {
  const array1 = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 1000));
  const array2 = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 1000));

  bench('es-toolkit/intersection', () => {
    do_not_optimize(intersectionToolkit(array1, array2));
  });

  bench('es-toolkit/compat/intersection', () => {
    do_not_optimize(intersectionCompatToolkit(array1, array2));
  });

  bench('lodash/intersection', () => {
    do_not_optimize(lodash.intersection(array1, array2));
  });
});
