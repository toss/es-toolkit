import { uniqWith as uniqWithToolkit } from 'es-toolkit';
import { uniqWith as uniqWithToolkitCompat } from 'es-toolkit/compat';
import { randomInt } from 'crypto';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('uniqWith, small arrays', () => {
  bench('es-toolkit/uniqWith', () => {
    do_not_optimize(uniqWithToolkit([2.1, 1.2, 2.3], (x, y) => Math.floor(x) === Math.floor(y)));
  });

  bench('es-toolkit/compat/uniqWith', () => {
    do_not_optimize(uniqWithToolkitCompat([2.1, 1.2, 2.3], (x, y) => Math.floor(x) === Math.floor(y)));
  });

  bench('lodash/uniqWith', () => {
    do_not_optimize(lodash.uniqWith([2.1, 1.2, 2.3], (x, y) => Math.floor(x) === Math.floor(y)));
  });
});

group('uniqWith, large arrays', () => {
  const array = Array.from({ length: 10000 }, () => randomInt(0, 10000));
  const comparator = (x: number, y: number) => Math.floor(x) === Math.floor(y);

  bench('es-toolkit/uniqWith', () => {
    do_not_optimize(uniqWithToolkit(array, comparator));
  });

  bench('es-toolkit/compat/uniqWith', () => {
    do_not_optimize(uniqWithToolkitCompat(array, comparator));
  });

  bench('lodash/uniqWith', () => {
    do_not_optimize(lodash.uniqWith(array, comparator));
  });
});
