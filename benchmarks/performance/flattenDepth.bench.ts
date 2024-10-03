import { bench, describe } from 'vitest';
import { flattenDepth as flattenDepthToolkit_ } from 'es-toolkit/compat';
import { flattenDepth as flattenDepthLodash_ } from 'lodash';

const flattenDepthToolkit = flattenDepthToolkit_;
const flattenDepthLodash = flattenDepthLodash_;

describe('flattenDepth', () => {
  const arr = [1, [2, 3], [4, [5, 6]]];

  bench('es-toolkit/flattenDepth', () => {
    flattenDepthToolkit(arr, 2);
  });

  bench('lodash/flattenDepth', () => {
    flattenDepthLodash(arr, 2);
  });
});
