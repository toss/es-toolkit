import { delay as delayToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('delay', () => {
  bench('es-toolkit/compat/delay', () => {
    do_not_optimize(delayToolkitCompat(() => {}, 1000));
  });

  bench('lodash/delay', () => {
    do_not_optimize(lodash.delay(() => {}, 1000));
  });
});
