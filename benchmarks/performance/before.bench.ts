import { before as beforeToolkit } from 'es-toolkit';
import { before as beforeToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('before', () => {
  bench(
    'es-toolkit/before',
    () => {
      const add = (a: number, b: number) => a + b;
      const n = 10;
      const beforeFn = beforeToolkit(10, add);

      for (let i = 0; i < n; i++) {
        do_not_optimize(beforeFn(1, 2));
      }
    },
    {
      time: 100,
    }
  );
  bench(
    'es-toolkit/compat/before',
    () => {
      const add = (a: number, b: number) => a + b;
      const n = 10;
      const beforeFn = beforeToolkitCompat(10, add);

      for (let i = 0; i < n; i++) {
        do_not_optimize(beforeFn(1, 2));
      }
    },
    {
      time: 100,
    }
  );

  bench(
    'lodash/before',
    () => {
      const add = (a: number, b: number) => a + b;
      const n = 10;
      const beforeFn = lodash.before(10, add);

      for (let i = 0; i < n; i++) {
        do_not_optimize(beforeFn(1, 2));
      }
    },
    {
      time: 100,
    }
  );
});
