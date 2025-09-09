import { bench, describe } from 'vitest';
import { gt as gtToolkitCompat_ } from 'es-toolkit/compat';
import { gt as gtLodash_ } from 'lodash';

const gtToolkitCompat = gtToolkitCompat_;
const gtLodash = gtLodash_;

describe('gt', () => {
  bench('es-toolkit/compat/gt', () => {
    gtToolkitCompat(3, 1);
    gtToolkitCompat(3, 3);
    gtToolkitCompat(1, 3);
  });

  bench('lodash/gt', () => {
    gtLodash(3, 1);
    gtLodash(3, 3);
    gtLodash(1, 3);
  });
});
