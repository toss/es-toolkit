import { flattenDeep as flattenDeepToolkit } from 'es-toolkit';
import { flattenDeep as flattenDeepToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

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
    flattenDeepToolkit(arr);
  });

  bench('es-toolkit/flattenDeep (compat)', () => {
    flattenDeepToolkitCompat(arr);
  });

  bench('lodash/flattenDeep', () => {
    lodash.flattenDeep(arr);
  });

  bench('js built-in/flat(Infinity)', () => {
    arr.flat(Infinity);
  });
});
