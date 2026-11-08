import { uniqWith as uniqWithToolkit } from 'es-toolkit';
import { uniqWith as uniqWithToolkitCompat } from 'es-toolkit/compat';
import { randomInt } from 'crypto';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('uniqWith, small arrays', () => {
  bench('es-toolkit/uniqWith', () => {
    uniqWithToolkit([2.1, 1.2, 2.3], (x, y) => Math.floor(x) === Math.floor(y));
  });

  bench('es-toolkit/compat/uniqWith', () => {
    uniqWithToolkitCompat([2.1, 1.2, 2.3], (x, y) => Math.floor(x) === Math.floor(y));
  });

  bench('lodash/uniqWith', () => {
    lodash.uniqWith([2.1, 1.2, 2.3], (x, y) => Math.floor(x) === Math.floor(y));
  });
});

group('uniqWith, large arrays', () => {
  const array = Array.from({ length: 10000 }, () => randomInt(0, 10000));
  const comparator = (x: number, y: number) => Math.floor(x) === Math.floor(y);

  bench('es-toolkit/uniqWith', () => {
    uniqWithToolkit(array, comparator);
  });

  bench('es-toolkit/compat/uniqWith', () => {
    uniqWithToolkitCompat(array, comparator);
  });

  bench('lodash/uniqWith', () => {
    lodash.uniqWith(array, comparator);
  });
});
