import { bench, describe } from 'vitest';
import { drop as dropToolkit_ } from 'es-toolkit';
import { drop as dropCompatToolkit_ } from 'es-toolkit/compat';
import { drop as dropLodash_ } from 'lodash';

const dropToolkit = dropToolkit_;
const dropCompatToolkit = dropCompatToolkit_;
const dropLodash = dropLodash_;

describe('drop', () => {
  bench('es-toolkit/drop', () => {
    dropToolkit([1, 2, 3, 4, 5, 6], 3);
  });

  bench('es-toolkit/compat/drop', () => {
    dropCompatToolkit([1, 2, 3, 4, 5, 6], 3);
  });

  bench('lodash/drop', () => {
    dropLodash([1, 2, 3, 4, 5, 6], 3);
  });
});
