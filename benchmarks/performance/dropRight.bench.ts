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
