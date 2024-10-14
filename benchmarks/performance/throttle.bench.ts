import { throttle as throttleToolkit } from 'es-toolkit';
import { throttle as throttleCompatToolkit } from 'es-toolkit/compat';
import { throttle as throttleLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('throttle', () => {
  bench('es-toolkit/throttle', () => {
    throttleToolkit(() => undefined, 1000)();
  });

  bench('es-toolkit/compat/throttle', () => {
    throttleCompatToolkit(() => undefined, 1000)();
  });

  bench('lodash/throttle', () => {
    throttleLodash(() => undefined, 1000)();
  });
});
