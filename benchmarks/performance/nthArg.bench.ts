import { nthArg as nthArgToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('nthArg', () => {
  const array = [1, 2, 3];

  bench('es-toolkit/compat/nthArg', () => {
    do_not_optimize(nthArgToolkitCompat(0)(...array));
    do_not_optimize(nthArgToolkitCompat(-1)(...array));
  });

  bench('lodash/nthArg', () => {
    do_not_optimize(lodash.nthArg(0)(...array));
    do_not_optimize(lodash.nthArg(-1)(...array));
  });
});

group('nthArg/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/compat/nthArg', () => {
    do_not_optimize(nthArgToolkitCompat(0)(...largeArray));
    do_not_optimize(nthArgToolkitCompat(-1)(...largeArray));
  });

  bench('lodash/nthArg', () => {
    do_not_optimize(lodash.nthArg(0)(...largeArray));
    do_not_optimize(lodash.nthArg(-1)(...largeArray));
  });
});
