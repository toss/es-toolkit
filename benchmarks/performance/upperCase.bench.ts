import { bench, describe } from 'vitest';
import { upperCase as upperCaseToolkit_ } from 'es-toolkit';
import { upperCase as upperCaseToolkitCompat_ } from 'es-toolkit/compat';
import { upperCase as upperCaseLodash_ } from 'lodash';

const upperCaseToolkit = upperCaseToolkit_;
const upperCaseToolkitCompat = upperCaseToolkitCompat_;
const upperCaseLodash = upperCaseLodash_;

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
