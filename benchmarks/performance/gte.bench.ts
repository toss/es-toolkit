import { bench, describe } from 'vitest';
import { gte as gteToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { gte: gteLodash } = lodash;

describe('gte', () => {
  bench('es-toolkit/compat/gte', () => {
    gteToolkitCompat(3, 1);
    gteToolkitCompat(3, 3);
    gteToolkitCompat(1, 3);
  });

  bench('lodash/gte', () => {
    gteLodash(3, 1);
    gteLodash(3, 3);
    gteLodash(1, 3);
  });
});
