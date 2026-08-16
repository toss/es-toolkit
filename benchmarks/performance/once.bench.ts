import { bench, describe } from 'vitest';
import { once as onceToolkit } from 'es-toolkit';
import { once as onceToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { once: onceLodash } = lodash;

describe('once', () => {
  bench('es-toolkit/once', () => {
    onceToolkit(() => undefined);
  });

  bench('es-toolkit/compat/once', () => {
    onceToolkitCompat(() => undefined);
  });

  bench('lodash/once', () => {
    onceLodash(() => undefined);
  });
});
