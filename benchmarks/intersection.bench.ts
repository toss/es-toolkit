import { bench, describe } from 'vitest';
import { intersection as intersectionToolkit } from 'es-toolkit';
import { intersection as intersectionLodash } from 'lodash';

describe('intersection', () => {
  bench('es-toolkit', () => {
    intersectionToolkit([1, 2, 3], [2, 4]);
  })

  bench('lodash', () => {
    intersectionLodash([1, 2, 3], [2, 4]);
  })
});