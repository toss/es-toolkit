import { bench, describe } from 'vitest';
import { flow as flowToolkit } from 'es-toolkit';
import { flow as flowToolkitCompat } from 'es-toolkit/compat';
import { flow as flowLodash } from 'lodash';

const flow = flowToolkit;
const flowCompat = flowToolkitCompat;
const flowLo = flowLodash;

describe('flow', () => {
  const add = (x: number, y: number) => x + y;
  const square = (n: number) => n * n;

  bench('es-toolkit/flow', () => {
    const combined = flow(add, square);
    combined(1, 2);
  });

  bench('es-toolkit/compat/flow', () => {
    const combined = flowCompat(add, square);
    combined(1, 2);
  });

  bench('lodash/flow', () => {
    const combined = flowLo(add, square);
    combined(1, 2);
  });
});
