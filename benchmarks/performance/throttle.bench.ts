import { bench, describe } from 'vitest';
import { throttle as throttleToolkit_ } from 'es-toolkit';
import { throttle as throttleCompatToolkit_ } from 'es-toolkit/compat';
import { throttle as throttleLodash_ } from 'lodash';

const throttleToolkit = throttleToolkit_;
const throttleCompatToolkit = throttleCompatToolkit_;
const throttleLodash = throttleLodash_;

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
