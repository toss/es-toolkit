import { bench, describe } from 'vitest';
import { upperCase as upperCaseToolkit } from 'es-toolkit';
import { upperCase as upperCaseToolkitCompat } from 'es-toolkit/compat';
import { upperCase as upperCaseLodash } from 'lodash';

describe('upperCase', () => {
  describe('short string', () => {
    bench('es-toolkit/upperCase', () => {
      const str = 'camelCase';
      upperCaseToolkit(str);
    });

    bench('es-toolkit/compat/upperCase', () => {
      const str = 'camelCase';
      upperCaseToolkitCompat(str);
    });

    bench('lodash/upperCase', () => {
      const str = 'camelCase';
      upperCaseLodash(str);
    });
  });

  describe('long string', () => {
    const LONG_STR = 'camelCaseLongString'.repeat(1000);
    bench('es-toolkit/upperCase', () => {
      upperCaseToolkit(LONG_STR);
    });

    bench('es-toolkit/compat/upperCase', () => {
      upperCaseToolkitCompat(LONG_STR);
    });

    bench('lodash/upperCase', () => {
      upperCaseLodash(LONG_STR);
    });
  });
});
