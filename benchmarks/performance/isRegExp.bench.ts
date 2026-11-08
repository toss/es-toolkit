import { isRegExp as isRegExpToolkit } from 'es-toolkit';
import { isRegExp as isRegExpToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isRegExp', () => {
  bench('es-toolkit/isRegExp', () => {
    do_not_optimize(isRegExpToolkit(new RegExp('')));
    do_not_optimize(isRegExpToolkit(/abc/));
    do_not_optimize(isRegExpToolkit('/abc/'));
  });

  bench('es-toolkit/compat/isRegExp', () => {
    do_not_optimize(isRegExpToolkitCompat(new RegExp('')));
    do_not_optimize(isRegExpToolkitCompat(/abc/));
    do_not_optimize(isRegExpToolkitCompat('/abc/'));
  });

  bench('lodash/isRegExp', () => {
    do_not_optimize(lodash.isRegExp(new RegExp('')));
    do_not_optimize(lodash.isRegExp(/abc/));
    do_not_optimize(lodash.isRegExp('/abc/'));
  });
});
