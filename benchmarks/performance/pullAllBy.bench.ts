import { bench, describe } from 'vitest';
import { pullAllBy as pullAllByToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { pullAllBy: pullAllByLodash } = lodash;

const array = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }, { x: 2 }, { x: 3 }];

describe('pullAllBy', () => {
  bench('es-toolkit/compat/pullAllBy', () => {
    pullAllByToolkitCompat(array, [{ x: 1 }, { x: 3 }], 'x');
  });

  bench('lodash/pullAllBy', () => {
    pullAllByLodash(array, [{ x: 1 }, { x: 3 }], 'x');
  });
});
