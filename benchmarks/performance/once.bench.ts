import { once as onceToolkit } from 'es-toolkit';
import { once as onceLodash } from 'lodash';
import { bench, describe } from 'vitest';

describe('once', () => {
  bench('es-toolkit/once', () => {
    onceToolkit(() => undefined);
  });

  bench('lodash/once', () => {
    onceLodash(() => undefined);
  });
});
