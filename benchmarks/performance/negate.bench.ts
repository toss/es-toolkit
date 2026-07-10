import { bench, describe } from 'vitest';
import { negate as negateToolkit } from 'es-toolkit';
import { negate as negateCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { negate: negateLodash } = lodash;

describe('compact', () => {
  bench('es-toolkit', () => {
    negateToolkit(() => true)();
  });

  bench('es-toolkit/compat', () => {
    negateCompatToolkit(() => true)();
  });

  bench('lodash', () => {
    negateLodash(() => true)();
  });
});
