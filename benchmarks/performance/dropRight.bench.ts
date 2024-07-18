import { bench, describe } from 'vitest';
import { dropRight as dropRightToolkit } from 'es-toolkit';
import { dropRight as dropRightLodash } from 'lodash';

describe('dropRight', () => {
  bench('es-toolkit/dropRight', () => {
    dropRightToolkit([1, 2, 3, 4, 5, 6], 3);
  });

  bench('lodash/dropRight', () => {
    dropRightLodash([1, 2, 3, 4, 5, 6], 3);
  });
});
