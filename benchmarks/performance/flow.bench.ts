import { bench, describe } from 'vitest';
import { flow as flowToolkit_ } from 'es-toolkit';
import { flow as flowToolkitCompat_ } from 'es-toolkit/compat';
import { flow as flowLodash_ } from 'lodash';

const flowToolkit = flowToolkit_;
const flowCompat = flowToolkitCompat_;
const flowLodash = flowLodash_;

describe('flow', () => {
  const add = (x: number, y: number) => x + y;
  const square = (n: number) => n * n;

  bench('es-toolkit/flow', () => {
    const combined = flowToolkit(add, square);
    combined(1, 2);
  });

  bench('es-toolkit/compat/flow', () => {
    const combined = flowCompat(add, square);
    combined(1, 2);
  });

  bench('lodash/flow', () => {
    const combined = flowLodash(add, square);
    combined(1, 2);
  });
});
