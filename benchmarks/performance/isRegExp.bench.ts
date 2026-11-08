import { isRegExp as isRegExpToolkit } from 'es-toolkit';
import { isRegExp as isRegExpToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isRegExp', () => {
  bench('es-toolkit/isRegExp', () => {
    isRegExpToolkit(new RegExp(''));
    isRegExpToolkit(/abc/);
    isRegExpToolkit('/abc/');
  });

  bench('es-toolkit/compat/isRegExp', () => {
    isRegExpToolkitCompat(new RegExp(''));
    isRegExpToolkitCompat(/abc/);
    isRegExpToolkitCompat('/abc/');
  });

  bench('lodash/isRegExp', () => {
    lodash.isRegExp(new RegExp(''));
    lodash.isRegExp(/abc/);
    lodash.isRegExp('/abc/');
  });
});
