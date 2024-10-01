import { bench, describe } from 'vitest';
import { flattenDeep as flattenDeepToolkit_ } from 'es-toolkit';
import { flattenDeep as flattenDeepToolkitCompat_ } from 'es-toolkit/compat';
import { flattenDeep as flattenDeepLodash_ } from 'lodash';

const flattenDeepToolkit = flattenDeepToolkit_;
const flattenDeepToolkitCompat = flattenDeepToolkitCompat_;
const flattenDeepLodash = flattenDeepLodash_;

const createNestedArray = (values: number[]) => {
  if (values.length === 0) {
    return [];
  }
  const [first, ...rest] = values;
  return [first, createNestedArray(rest)];
};

describe('flattenDeep', () => {
  const arr = createNestedArray(Array.from({ length: 30 }, (_, index) => index));

  bench('es-toolkit/flattenDeep', () => {
    flattenDeepToolkit(arr);
  });

  bench('es-toolkit/flattenDeep (compat)', () => {
    flattenDeepToolkitCompat(arr);
  });

  bench('lodash/flattenDeep', () => {
    flattenDeepLodash(arr);
  });

  bench('js built-in/flat(Infinity)', () => {
    arr.flat(Infinity);
  });
});
