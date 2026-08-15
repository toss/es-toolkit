import { bench, describe } from 'vitest';
import { gt as gtToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { gt: gtLodash } = lodash;

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
