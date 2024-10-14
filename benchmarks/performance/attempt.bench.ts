import { attempt as attemptToolkit } from 'es-toolkit/compat';
import { attempt as attemptLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('attempt', () => {
  bench('es-toolkit/attempt', () => {
    attemptToolkit(() => undefined);
  });

  bench('lodash/attempt', () => {
    attemptLodash(() => undefined);
  });
});
