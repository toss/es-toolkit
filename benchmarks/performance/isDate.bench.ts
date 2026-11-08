import { isDate as isDateToolkit } from 'es-toolkit';
import { isDate as isDateToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isDate', () => {
  bench('es-toolkit/isDate', () => {
    isDateToolkit(new Date());
    isDateToolkit('2024-01-01');
    isDateToolkit({ year: 2024, month: 1, day: 1 });
  });

  bench('es-toolkit/compat/isDate', () => {
    isDateToolkitCompat(new Date());
    isDateToolkitCompat('2024-01-01');
    isDateToolkitCompat({ year: 2024, month: 1, day: 1 });
  });

  bench('lodash/isDate', () => {
    lodash.isDate(new Date());
    lodash.isDate('2024-01-01');
    lodash.isDate({ year: 2024, month: 1, day: 1 });
  });
});
