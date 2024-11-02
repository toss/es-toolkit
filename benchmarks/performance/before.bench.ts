import { bench, describe } from 'vitest';
import { before as beforeToolkit_ } from 'es-toolkit';
import { before as beforeToolkitCompat_ } from 'es-toolkit/compat';
import { before as beforeLodash_ } from 'lodash';

const beforeToolkit = beforeToolkit_;
const beforeToolkitCompat = beforeToolkitCompat_;
const beforeLodash = beforeLodash_;

describe('before', () => {
  bench(
    'es-toolkit/before',
    () => {
      const add = (a: number, b: number) => a + b;
      const n = 10;
      const beforeFn = beforeToolkit(10, add);

      for (let i = 0; i < n; i++) {
        beforeFn(1, 2);
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
        beforeFn(1, 2);
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
      const beforeFn = beforeLodash(10, add);

      for (let i = 0; i < n; i++) {
        beforeFn(1, 2);
      }
    },
    {
      time: 100,
    }
  );
});
