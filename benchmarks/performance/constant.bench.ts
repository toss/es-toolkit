import { constant as constantToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('constant', () => {
  bench(
    'es-toolkit/compat/constant',
    () => {
      do_not_optimize(constantToolkitCompat([1, 2, 3]));
      do_not_optimize(constantToolkitCompat({ a: 1 }));
      do_not_optimize(constantToolkitCompat(1));
      do_not_optimize(constantToolkitCompat('a'));
    },
    {
      time: 50,
    }
  );

  bench(
    'lodash/constant',
    () => {
      do_not_optimize(lodash.constant([1, 2, 3]));
      do_not_optimize(lodash.constant({ a: 1 }));
      do_not_optimize(lodash.constant(1));
      do_not_optimize(lodash.constant('a'));
    },
    {
      time: 50,
    }
  );
});
