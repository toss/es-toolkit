import { reduceRight as reduceRightToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

const array = [1, 2, 3, 4, 5];

group('reduceRight', () => {
  bench('es-toolkit/compat/reduceRight', () => {
    reduceRightToolkitCompat(array, (acc, x) => acc + x, 0);
  });

  bench('lodash/reduceRight', () => {
    lodash.reduceRight(array, (acc, x) => acc + x, 0);
  });
});

group('reduceRight - large array', () => {
  const largeArray = Array.from({ length: 1e6 }, (_, i) => i);

  bench('es-toolkit/compat/reduceRight', () => {
    reduceRightToolkitCompat(largeArray, (acc, x) => acc + x, 0);
  });

  bench('lodash/reduceRight', () => {
    lodash.reduceRight(largeArray, (acc, x) => acc + x, 0);
  });
});
