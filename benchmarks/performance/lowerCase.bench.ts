import { lowerCase as lowerCaseToolkit } from 'es-toolkit';
import { lowerCase as lowerCaseToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('lowerCase - short string', () => {
  bench('es-toolkit/lowerCase', () => {
    const str = 'camelCase';
    lowerCaseToolkit(str);
  });

  bench('es-toolkit/compat/lowerCase', () => {
    const str = 'camelCase';
    lowerCaseToolkitCompat(str);
  });

  bench('lodash/lowerCase', () => {
    const str = 'camelCase';
    lodash.lowerCase(str);
  });
});

group('lowerCase - long string', () => {
  const LONG_STR = 'camelCaseLongString'.repeat(1000);
  bench('es-toolkit/lowerCase', () => {
    lowerCaseToolkit(LONG_STR);
  });

  bench('es-toolkit/compat/lowerCase', () => {
    lowerCaseToolkitCompat(LONG_STR);
  });

  bench('lodash/lowerCase', () => {
    lodash.lowerCase(LONG_STR);
  });
});
