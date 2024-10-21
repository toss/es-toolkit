import { flowRight as flowRightToolkit } from 'es-toolkit';
import { flowRight as flowRightToolkitCompat } from 'es-toolkit/compat';
import { flowRight as flowRightLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('flowRight', () => {
  const add = (x: number, y: number) => x + y;
  const square = (n: number) => n * n;

  bench('es-toolkit/flowRight', () => {
    const combined = flowRightToolkit(add, square);
    combined(1, 2);
  });

  bench('es-toolkit/compat/flowRight', () => {
    const combined = flowRightToolkitCompat(add, square);
    combined(1, 2);
  });

  bench('lodash/flowRight', () => {
    const combined = flowRightLodash(add, square);
    combined(1, 2);
  });
});
