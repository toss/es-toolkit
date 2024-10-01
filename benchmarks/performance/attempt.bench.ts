import { bench, describe } from 'vitest';
import { attempt as attemptToolkit_ } from 'es-toolkit/compat';
import { attempt as attemptLodash_ } from 'lodash';

const attemptToolkit = attemptToolkit_;
const attemptLodash = attemptLodash_;

describe('attempt', () => {
  bench('es-toolkit/attempt', () => {
    attemptToolkit(() => undefined);
  });

  bench('lodash/attempt', () => {
    attemptLodash(() => undefined);
  });
});
