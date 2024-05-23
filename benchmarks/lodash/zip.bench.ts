import { bench, describe } from 'vitest';
import { zip as zipToolkit } from 'es-toolkit';
import { zip as zipLodash } from 'lodash';

describe('zip', () => {
  bench('es-toolkit', () => {
    zipToolkit([1, 2, 3, 4], [3, 4, 5, 6]);
  })

  bench('lodash', () => {
    zipLodash([1, 2, 3, 4], [3, 4, 5, 6]);
  })
});