import { bench, describe } from 'vitest';
import { attempt as attemptToolkit } from 'es-toolkit';
import { attempt as attemptLodash } from 'lodash';

describe('attempt', () => {
  bench('es-toolkit/attempt', () => {
    attemptToolkit(() => undefined);
  });

  bench('lodash/attempt', () => {
    attemptLodash(() => undefined);
  });
});
