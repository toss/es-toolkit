import { isDate as isDateToolkit } from 'es-toolkit';
import { isDate as isDateToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isDate', () => {
  bench('es-toolkit/isDate', () => {
    do_not_optimize(isDateToolkit(new Date()));
    do_not_optimize(isDateToolkit('2024-01-01'));
    do_not_optimize(isDateToolkit({ year: 2024, month: 1, day: 1 }));
  });

  bench('es-toolkit/compat/isDate', () => {
    do_not_optimize(isDateToolkitCompat(new Date()));
    do_not_optimize(isDateToolkitCompat('2024-01-01'));
    do_not_optimize(isDateToolkitCompat({ year: 2024, month: 1, day: 1 }));
  });

  bench('lodash/isDate', () => {
    do_not_optimize(lodash.isDate(new Date()));
    do_not_optimize(lodash.isDate('2024-01-01'));
    do_not_optimize(lodash.isDate({ year: 2024, month: 1, day: 1 }));
  });
});
