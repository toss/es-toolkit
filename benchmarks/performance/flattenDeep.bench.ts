import { flattenDeep as flattenDeepToolkit } from 'es-toolkit';
import { flattenDeep as flattenDeepToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

const createNestedArray = (values: number[]): any[] => {
  if (values.length === 0) {
    return [];
  }
  const [first, ...rest] = values;
  return [first, createNestedArray(rest)];
};

group('flattenDeep', () => {
  const arr = createNestedArray(Array.from({ length: 30 }, (_, index) => index));

  bench('es-toolkit/flattenDeep', () => {
    do_not_optimize(flattenDeepToolkit(arr));
  });

  bench('es-toolkit/flattenDeep (compat)', () => {
    do_not_optimize(flattenDeepToolkitCompat(arr));
  });

  bench('lodash/flattenDeep', () => {
    do_not_optimize(lodash.flattenDeep(arr));
  });

  bench('js built-in/flat(Infinity)', () => {
    do_not_optimize(arr.flat(Infinity));
  });
});
