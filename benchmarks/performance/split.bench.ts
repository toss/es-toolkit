import { bench, describe } from 'vitest';
import { split as splitToolkitCompat_ } from 'es-toolkit/compat';
import { split as splitLodash_ } from 'lodash';

const splitToolkitCompat = splitToolkitCompat_;
const splitLodash = splitLodash_;

describe('split', () => {
  const str = 'a-b-c-d-e-f-g-h-i-j-k-l-m-n-o-p-q-r-s-t-u-v-w-x-y-z';

  bench('es-toolkit/compat', () => {
    splitToolkitCompat(str, '-');
  });

  bench('lodash', () => {
    splitLodash(str, '-');
  });
});
