import { bench, describe } from 'vitest';
import { attempt as attemptToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { attempt: attemptLodash } = lodash;

describe('attempt', () => {
  bench('es-toolkit/attempt', () => {
    attemptToolkit(() => undefined);
  });

  bench('lodash/attempt', () => {
    attemptLodash(() => undefined);
  });
});
