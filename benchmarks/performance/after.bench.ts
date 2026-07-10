import { bench, describe } from 'vitest';
import { after as afterToolkit } from 'es-toolkit';
import { after as afterCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { after: afterLodash } = lodash;

describe('after', () => {
  bench('es-toolkit/after', () => {
    const add = (a: number, b: number) => a + b;
    const n = 10;
    const afterFn = afterToolkit(n, add);
    for (let i = 0; i < n + 1; i++) {
      afterFn(1, 2);
    }
  });

  bench('es-toolkit/compat/after', () => {
    const add = (a: number, b: number) => a + b;
    const n = 10;
    const afterFn = afterCompatToolkit(n, add);
    for (let i = 0; i < n + 1; i++) {
      afterFn(1, 2);
    }
  });

  bench('lodash/after', () => {
    const add = (a: number, b: number) => a + b;
    const n = 10;
    const afterFn = afterLodash(n, add);
    for (let i = 0; i < n + 1; i++) {
      afterFn(1, 2);
    }
  });
});
