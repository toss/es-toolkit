import { nthArg as nthArgToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('nthArg', () => {
  const array = [1, 2, 3];

  bench('es-toolkit/compat/nthArg', () => {
    nthArgToolkitCompat(0)(...array);
    nthArgToolkitCompat(-1)(...array);
  });

  bench('lodash/nthArg', () => {
    lodash.nthArg(0)(...array);
    lodash.nthArg(-1)(...array);
  });
});

group('nthArg/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/compat/nthArg', () => {
    nthArgToolkitCompat(0)(...largeArray);
    nthArgToolkitCompat(-1)(...largeArray);
  });

  bench('lodash/nthArg', () => {
    lodash.nthArg(0)(...largeArray);
    lodash.nthArg(-1)(...largeArray);
  });
});
