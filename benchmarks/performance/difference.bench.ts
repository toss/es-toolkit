import { bench, describe } from 'vitest';
import { difference as differenceToolkit_ } from 'es-toolkit';
import { difference as differenceCompatToolkit_ } from 'es-toolkit/compat';
import { difference as differenceLodash_ } from 'lodash';

const differenceToolkit = differenceToolkit_;
const differenceCompatToolkit = differenceCompatToolkit_;
const differenceLodash = differenceLodash_;

describe('difference', () => {
  bench('es-toolkit/difference', () => {
    differenceToolkit([1, 2, 3], [2]);
  });

  bench('es-toolkit/compat/difference', () => {
    differenceCompatToolkit([1, 2, 3], [2]);
  });

  bench('lodash/difference', () => {
    differenceLodash([1, 2, 3], [2]);
  });
});
