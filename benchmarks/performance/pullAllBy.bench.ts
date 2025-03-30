import { bench, describe } from 'vitest';
import { pullAllBy as pullAllByToolkitCompat_ } from 'es-toolkit/compat';
import { pullAllBy as pullAllByLodash_ } from 'lodash';

const pullAllByToolkitCompat = pullAllByToolkitCompat_;
const pullAllByLodash = pullAllByLodash_;

const array = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }, { x: 2 }, { x: 3 }];

describe('pullAllBy', () => {
  bench('es-toolkit/compat/pullAllBy', () => {
    pullAllByToolkitCompat(array, [{ x: 1 }, { x: 3 }], 'x');
  });

  bench('lodash/pullAllBy', () => {
    pullAllByLodash(array, [{ x: 1 }, { x: 3 }], 'x');
  });
});
