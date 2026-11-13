import { flowRight as flowRightToolkit } from 'es-toolkit';
import { flowRight as flowRightCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('flowRight', () => {
  const add = (x: number, y: number) => x + y;
  const square = (n: number) => n * n;

  bench('es-toolkit/flowRight', () => {
    const combined = flowRightToolkit(add, square);
    do_not_optimize(combined(1, 2));
  });

  bench('es-toolkit/compat/flowRight', () => {
    const combined = flowRightCompat(add, square);
    do_not_optimize(combined(1, 2));
  });

  bench('lodash/flowRight', () => {
    const combined = lodash.flowRight(add, square);
    do_not_optimize(combined(1, 2));
  });
});
