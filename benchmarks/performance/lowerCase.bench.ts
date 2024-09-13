import { bench, describe } from 'vitest';
import { lowerCase as lowerCaseToolkit } from 'es-toolkit';
import { lowerCase as lowerCaseToolkitCompat } from 'es-toolkit/compat';
import { lowerCase as lowerCaseLodash } from 'lodash';

describe('lowerCase - short string', () => {
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
    lowerCaseLodash(str);
  });
});

describe('lowerCase - long string', () => {
  const LONG_STR = 'camelCaseLongString'.repeat(1000);
  bench('es-toolkit/lowerCase', () => {
    lowerCaseToolkit(LONG_STR);
  });

  bench('es-toolkit/compat/lowerCase', () => {
    lowerCaseToolkitCompat(LONG_STR);
  });

  bench('lodash/lowerCase', () => {
    lowerCaseLodash(LONG_STR);
  });
});
