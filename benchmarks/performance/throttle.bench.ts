import { bench, describe } from 'vitest';
import { throttle as throttleToolkit } from 'es-toolkit';
import { throttle as throttleLodash } from 'lodash';

describe('throttle', () => {
  bench('es-toolkit/throttle', () => {
    throttleToolkit(() => undefined, 1000)();
  });

  bench('lodash/throttle', () => {
    throttleLodash(() => undefined, 1000)();
  });
});
