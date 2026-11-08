import { constant as constantToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('constant', () => {
  bench(
    'es-toolkit/compat/constant',
    () => {
      constantToolkitCompat([1, 2, 3]);
      constantToolkitCompat({ a: 1 });
      constantToolkitCompat(1);
      constantToolkitCompat('a');
    },
    {
      time: 50,
    }
  );

  bench(
    'lodash/constant',
    () => {
      lodash.constant([1, 2, 3]);
      lodash.constant({ a: 1 });
      lodash.constant(1);
      lodash.constant('a');
    },
    {
      time: 50,
    }
  );
});
