import { throttle as throttleToolkit } from 'es-toolkit';
import { throttle as throttleCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('throttle', () => {
  bench('es-toolkit/throttle', () => {
    do_not_optimize(throttleToolkit(() => undefined, 1000)());
  });

  bench('es-toolkit/compat/throttle', () => {
    do_not_optimize(throttleCompatToolkit(() => undefined, 1000)());
  });

  bench('lodash/throttle', () => {
    do_not_optimize(lodash.throttle(() => undefined, 1000)());
  });
});
