import { bench, describe } from 'vitest';
import { partition as partitionToolkit } from 'es-toolkit';
import { partition as partitionLodash } from 'lodash';

describe('partition', () => {
  bench('es-toolkit/partition', () => {
    partitionToolkit([1, 2, 3, 4, 5], x => x < 3);
  });

  bench('lodash/partition', () => {
    partitionLodash([1, 2, 3], x => x < 3);
  });
});
