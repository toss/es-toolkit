import { flow as flowToolkit } from 'es-toolkit';
import { flow as flowCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('flow', () => {
  const add = (x: number, y: number) => x + y;
  const square = (n: number) => n * n;

  bench('es-toolkit/flow', () => {
    const combined = flowToolkit(add, square);
    do_not_optimize(combined(1, 2));
  });

  bench('es-toolkit/compat/flow', () => {
    const combined = flowCompat(add, square);
    do_not_optimize(combined(1, 2));
  });

  bench('lodash/flow', () => {
    const combined = lodash.flow(add, square);
    do_not_optimize(combined(1, 2));
  });
});
