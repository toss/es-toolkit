import { after as afterToolkit } from 'es-toolkit';
import { after as afterCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('after', () => {
  bench('es-toolkit/after', () => {
    const add = (a: number, b: number) => a + b;
    const n = 10;
    const afterFn = afterToolkit(n, add);
    for (let i = 0; i < n + 1; i++) {
      do_not_optimize(afterFn(1, 2));
    }
  });

  bench('es-toolkit/compat/after', () => {
    const add = (a: number, b: number) => a + b;
    const n = 10;
    const afterFn = afterCompatToolkit(n, add);
    for (let i = 0; i < n + 1; i++) {
      do_not_optimize(afterFn(1, 2));
    }
  });

  bench('lodash/after', () => {
    const add = (a: number, b: number) => a + b;
    const n = 10;
    const afterFn = lodash.after(n, add);
    for (let i = 0; i < n + 1; i++) {
      do_not_optimize(afterFn(1, 2));
    }
  });
});
