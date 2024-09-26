import { bench, describe } from 'vitest';
import { flowRight as flowRightToolkit } from 'es-toolkit';
import { flowRight as flowRightLodash } from 'lodash';

const flowRight = flowRightToolkit;
const flowRightLo = flowRightLodash;

describe('flowRight', () => {
  const add = (x: number, y: number) => x + y;
  const square = (n: number) => n * n;

  bench('es-toolkit/flowRight', () => {
    const combined = flowRight(add, square);
    combined(1, 2);
  });

  bench('lodash/flowRight', () => {
    const combined = flowRightLo(add, square);
    combined(1, 2);
  });
});
