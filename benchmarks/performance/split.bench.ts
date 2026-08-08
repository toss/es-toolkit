import { bench, describe } from 'vitest';
import { split as splitToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { split: splitLodash } = lodash;

describe('split', () => {
  const str = 'a-b-c-d-e-f-g-h-i-j-k-l-m-n-o-p-q-r-s-t-u-v-w-x-y-z';

  bench('es-toolkit/compat', () => {
    splitToolkitCompat(str, '-');
  });

  bench('lodash', () => {
    splitLodash(str, '-');
  });
});
