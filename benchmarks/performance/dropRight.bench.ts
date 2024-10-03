import { bench, describe } from 'vitest';
import { dropRight as dropRightToolkit_ } from 'es-toolkit';
import { dropRight as dropRightLodash_ } from 'lodash';

const dropRightToolkit = dropRightToolkit_;
const dropRightLodash = dropRightLodash_;

describe('dropRight', () => {
  bench('es-toolkit/dropRight', () => {
    dropRightToolkit([1, 2, 3, 4, 5, 6], 3);
  });

  bench('lodash/dropRight', () => {
    dropRightLodash([1, 2, 3, 4, 5, 6], 3);
  });
});

describe('dropRight/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/dropRight', () => {
    dropRightToolkit(largeArray, 5000);
  });

  bench('lodash/dropRight', () => {
    dropRightLodash(largeArray, 5000);
  });
});
