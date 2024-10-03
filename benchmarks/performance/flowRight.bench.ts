import { bench, describe } from 'vitest';
import { flowRight as flowRightToolkit_ } from 'es-toolkit';
import { flowRight as flowRightToolkitCompat_ } from 'es-toolkit/compat';
import { flowRight as flowRightLodash_ } from 'lodash';

const flowRightToolkit = flowRightToolkit_;
const flowRightCompat = flowRightToolkitCompat_;
const flowRightLodash = flowRightLodash_;

describe('flowRight', () => {
  const add = (x: number, y: number) => x + y;
  const square = (n: number) => n * n;

  bench('es-toolkit/flowRight', () => {
    const combined = flowRightToolkit(add, square);
    combined(1, 2);
  });

  bench('es-toolkit/compat/flowRight', () => {
    const combined = flowRightCompat(add, square);
    combined(1, 2);
  });

  bench('lodash/flowRight', () => {
    const combined = flowRightLodash(add, square);
    combined(1, 2);
  });
});
