import { bench, describe } from 'vitest';
import { nthArg as nthArgToolkitCompat_ } from 'es-toolkit/compat';
import { nthArg as nthArgLodash_ } from 'lodash';

const nthArgToolkitCompat = nthArgToolkitCompat_;
const nthArgLodash = nthArgLodash_;

describe('nthArg', () => {
  const array = [1, 2, 3];

  bench('es-toolkit/compat/nthArg', () => {
    nthArgToolkitCompat(0)(...array);
    nthArgToolkitCompat(-1)(...array);
  });

  bench('lodash/nthArg', () => {
    nthArgLodash(0)(...array);
    nthArgLodash(-1)(...array);
  });
});

describe('nthArg/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/compat/nthArg', () => {
    nthArgToolkitCompat(0)(...largeArray);
    nthArgToolkitCompat(-1)(...largeArray);
  });

  bench('lodash/nthArg', () => {
    nthArgLodash(0)(...largeArray);
    nthArgLodash(-1)(...largeArray);
  });
});
