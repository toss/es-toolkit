import { reduceRight as reduceRightToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

const array = [1, 2, 3, 4, 5];

group('reduceRight', () => {
  bench('es-toolkit/compat/reduceRight', () => {
    do_not_optimize(reduceRightToolkitCompat(array, (acc, x) => acc + x, 0));
  });

  bench('lodash/reduceRight', () => {
    do_not_optimize(lodash.reduceRight(array, (acc, x) => acc + x, 0));
  });
});

group('reduceRight - large array', () => {
  const largeArray = Array.from({ length: 1e6 }, (_, i) => i);

  bench('es-toolkit/compat/reduceRight', () => {
    do_not_optimize(reduceRightToolkitCompat(largeArray, (acc, x) => acc + x, 0));
  });

  bench('lodash/reduceRight', () => {
    do_not_optimize(lodash.reduceRight(largeArray, (acc, x) => acc + x, 0));
  });
});
