import { lowerCase as lowerCaseToolkit } from 'es-toolkit';
import { lowerCase as lowerCaseToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('lowerCase - short string', () => {
  bench('es-toolkit/lowerCase', () => {
    const str = 'camelCase';
    do_not_optimize(lowerCaseToolkit(str));
  });

  bench('es-toolkit/compat/lowerCase', () => {
    const str = 'camelCase';
    do_not_optimize(lowerCaseToolkitCompat(str));
  });

  bench('lodash/lowerCase', () => {
    const str = 'camelCase';
    do_not_optimize(lodash.lowerCase(str));
  });
});

group('lowerCase - long string', () => {
  const LONG_STR = 'camelCaseLongString'.repeat(1000);
  bench('es-toolkit/lowerCase', () => {
    do_not_optimize(lowerCaseToolkit(LONG_STR));
  });

  bench('es-toolkit/compat/lowerCase', () => {
    do_not_optimize(lowerCaseToolkitCompat(LONG_STR));
  });

  bench('lodash/lowerCase', () => {
    do_not_optimize(lodash.lowerCase(LONG_STR));
  });
});
