import { bench, describe } from 'vitest';
import { gte as gteToolkitCompat_ } from 'es-toolkit/compat';
import { gte as gteLodash_ } from 'lodash';

const gteToolkitCompat = gteToolkitCompat_;
const gteLodash = gteLodash_;

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
