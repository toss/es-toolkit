import { bench, describe } from 'vitest';
import { drop as dropToolkit } from 'es-toolkit';
import { drop as dropLodash } from 'lodash';

describe('drop', () => {
  bench('es-toolkit', () => {
    dropToolkit([1, 2, 3, 4, 5, 6], 3);
  });

  bench('lodash', () => {
    dropLodash([1, 2, 3, 4, 5, 6], 3);
  });
});
