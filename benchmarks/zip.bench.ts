import { bench, describe } from 'vitest';
import { zip as zipToolkit } from 'es-toolkit';
import { zip as zipLodash } from 'lodash';

describe('zip', () => {
  bench('es-toolkit/zip', () => {
    zipToolkit([1, 2, 3, 4], [3, 4, 5, 6]);
  });

  bench('lodash/zip', () => {
    zipLodash([1, 2, 3, 4], [3, 4, 5, 6]);
  });
});
