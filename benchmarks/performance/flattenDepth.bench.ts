import { flattenDepth as flattenDepthToolkit } from 'es-toolkit/compat';
import { flattenDepth as flattenDepthLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('flattenDepth', () => {
  const arr = [1, [2, 3], [4, [5, 6]]];

  bench('es-toolkit/flattenDepth', () => {
    flattenDepthToolkit(arr, 2);
  });

  bench('lodash/flattenDepth', () => {
    flattenDepthLodash(arr, 2);
  });
});
