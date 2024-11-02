import { bench, describe } from 'vitest';
import { negate as negateToolkit_ } from 'es-toolkit';
import { negate as negateLodash_ } from 'lodash';

const negateToolkit = negateToolkit_;
const negateLodash = negateLodash_;

describe('compact', () => {
  bench('es-toolkit', () => {
    negateToolkit(() => true)();
  });

  bench('lodash', () => {
    negateLodash(() => true)();
  });
});
