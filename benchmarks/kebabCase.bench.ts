import { bench, describe } from 'vitest';
import { kebabCase as kebabCaseToolkit } from 'es-toolkit';
import { kebabCase as kebabCaseLodash } from 'lodash';

describe('kebabCase', () => {
  describe('short string', () => {
    bench('es-toolkit/kebabCase', () => {
      const str = 'camelCase';
      kebabCaseToolkit(str);
    });

    bench('lodash/kebabCase', () => {
      const str = 'camelCase';
      kebabCaseLodash(str);
    });
  });

  describe('long string', () => {
    const LONG_STR = 'camelCaseLongString'.repeat(100);

    bench('es-toolkit/kebabCase', () => {
      kebabCaseToolkit(LONG_STR);
    });

    bench('lodash/kebabCase', () => {
      kebabCaseLodash(LONG_STR);
    });
  });
});
