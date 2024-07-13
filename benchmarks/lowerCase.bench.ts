import { bench, describe } from 'vitest';
import { lowerCase as lowerCaseToolkit } from 'es-toolkit';
import { lowerCase as lowerCaseLodash } from 'lodash';

describe('lowerCase', () => {
  describe('short string', () => {
    bench('es-toolkit/lowerCase', () => {
      const str = 'camelCase';
      lowerCaseToolkit(str);
    });

    bench('lodash/lowerCase', () => {
      const str = 'camelCase';
      lowerCaseLodash(str);
    });
  });

  describe('long string', () => {
    const LONG_STR = 'camelCase'.repeat(100);
    bench('es-toolkit/lowerCase', () => {
      lowerCaseToolkit(LONG_STR);
    });

    bench('lodash/lowerCase', () => {
      lowerCaseLodash(LONG_STR);
    });
  });
});
