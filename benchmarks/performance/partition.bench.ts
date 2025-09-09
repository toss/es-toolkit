import { bench, describe } from 'vitest';
import { partition as partitionToolkit_ } from 'es-toolkit';
import { partition as partitionToolkitCompat_ } from 'es-toolkit/compat';
import { partition as partitionLodash_ } from 'lodash';

const partitionToolkit = partitionToolkit_;
const partitionToolkitCompat = partitionToolkitCompat_;
const partitionLodash = partitionLodash_;

describe('partition', () => {
  bench('es-toolkit/partition', () => {
    partitionToolkit([1, 2, 3, 4, 5], x => x < 3);
  });

  bench('es-toolkit/partition/compat', () => {
    partitionToolkitCompat([1, 2, 3, 4, 5], x => x < 3);
  });

  bench('lodash/partition', () => {
    partitionLodash([1, 2, 3], x => x < 3);
  });
});

describe('partition/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, index) => index);

  bench('es-toolkit/partition', () => {
    partitionToolkit(largeArray, x => x < 5000);
  });

  bench('es-toolkit/partition/compat', () => {
    partitionToolkitCompat(largeArray, x => x < 5000);
  });

  bench('lodash/partition', () => {
    partitionLodash(largeArray, x => x < 5000);
  });
});
