import { bench, describe } from 'vitest';
import { takeRightWhile as takeRightWhileToolkit_ } from 'es-toolkit';
import { takeRightWhile as takeRightWhileLodash_ } from 'lodash';

const takeRightWhileToolkit = takeRightWhileToolkit_;
const takeRightWhileLodash = takeRightWhileLodash_;

describe('takeRightWhile', () => {
  bench('es-toolkit/takeRightWhile', () => {
    takeRightWhileToolkit([5, 4, 3, 2, 1], n => n < 4);
  });

  bench('lodash/takeRightWhile', () => {
    takeRightWhileLodash([5, 4, 3, 2, 1], n => n < 4);
  });
});
