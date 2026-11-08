import { throttle as throttleToolkit } from 'es-toolkit';
import { throttle as throttleCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('throttle', () => {
  bench('es-toolkit/throttle', () => {
    throttleToolkit(() => undefined, 1000)();
  });

  bench('es-toolkit/compat/throttle', () => {
    throttleCompatToolkit(() => undefined, 1000)();
  });

  bench('lodash/throttle', () => {
    lodash.throttle(() => undefined, 1000)();
  });
});
