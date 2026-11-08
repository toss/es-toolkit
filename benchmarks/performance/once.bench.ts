import { once as onceToolkit } from 'es-toolkit';
import { once as onceToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('once', () => {
  bench('es-toolkit/once', () => {
    do_not_optimize(onceToolkit(() => undefined));
  });

  bench('es-toolkit/compat/once', () => {
    do_not_optimize(onceToolkitCompat(() => undefined));
  });

  bench('lodash/once', () => {
    do_not_optimize(lodash.once(() => undefined));
  });
});
