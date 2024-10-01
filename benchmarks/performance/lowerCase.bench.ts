import { bench, describe } from 'vitest';
import { lowerCase as lowerCaseToolkit_ } from 'es-toolkit';
import { lowerCase as lowerCaseToolkitCompat_ } from 'es-toolkit/compat';
import { lowerCase as lowerCaseLodash_ } from 'lodash';

const lowerCaseToolkit = lowerCaseToolkit_;
const lowerCaseToolkitCompat = lowerCaseToolkitCompat_;
const lowerCaseLodash = lowerCaseLodash_;

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
