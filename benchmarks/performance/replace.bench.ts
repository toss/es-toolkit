import { replace as replaceToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('replace', () => {
  bench('es-toolkit/compat/replace', () => {
    do_not_optimize(replaceToolkitCompat('abc', 'de', '123'));
    do_not_optimize(replaceToolkitCompat('abc', /[bd]/g, '-'));
    do_not_optimize(replaceToolkitCompat('abc', 'de', substring => substring.toUpperCase()));
    do_not_optimize(replaceToolkitCompat('abc', /[bd]/g, substring => substring.toUpperCase()));
  });

  bench('lodash/replace', () => {
    do_not_optimize(lodash.replace('abc', 'de', '123'));
    do_not_optimize(lodash.replace('abc', /[bd]/g, '-'));
    do_not_optimize(lodash.replace('abc', 'de', substring => substring.toUpperCase()));
    do_not_optimize(lodash.replace('abc', /[bd]/g, substring => substring.toUpperCase()));
  });
});
