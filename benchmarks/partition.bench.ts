import { bench, describe } from 'vitest';
import { partition as partitionToolkit } from 'es-toolkit';
import { partition as partitionLodash } from 'lodash';

describe('partition', () => {
  bench('es-toolkit', () => {
    partitionToolkit([1, 2, 3, 4, 5], x => x < 3);
  });

  bench('lodash', () => {
    partitionLodash([1, 2, 3], x => x < 3);
  });
});
