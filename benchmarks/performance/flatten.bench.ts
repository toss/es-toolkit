import { flatten as flattenToolkit } from 'es-toolkit';
import { flatten as flattenCompatToolkit } from 'es-toolkit/compat';
import { flattenDepth as flattenDepthLodash } from 'lodash';
import { bench, describe } from '../bench';

const createNestedArray = (values: any[]) => {
  if (values.length === 0) {
    return [];
  }
  const [first, ...rest] = values;
  return [first, createNestedArray(rest)];
};

describe('flatten', () => {
  const arr = createNestedArray(Array.from({ length: 30 }, (_, index) => index));

  bench('es-toolkit/flatten', () => {
    flattenToolkit(arr, 30);
  });

  bench('es-toolkit/flatten (compat)', () => {
    flattenCompatToolkit(arr, 30);
  });

  bench('lodash/flattenDepth', () => {
    flattenDepthLodash(arr, 30);
  });

  bench('js built-in/flat', () => {
    arr.flat(30);
  });
});
