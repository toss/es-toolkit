import { split as splitToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('split', () => {
  const str = 'a-b-c-d-e-f-g-h-i-j-k-l-m-n-o-p-q-r-s-t-u-v-w-x-y-z';

  bench('es-toolkit/compat', () => {
    do_not_optimize(splitToolkitCompat(str, '-'));
  });

  bench('lodash', () => {
    do_not_optimize(lodash.split(str, '-'));
  });
});
