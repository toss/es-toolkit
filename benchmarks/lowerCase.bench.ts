import { bench, describe } from 'vitest';
import { lowerCase as lowerCaseToolkit } from 'es-toolkit';
import { lowerCase as lowerCaseLodash } from 'lodash';

describe('lowerCase', () => {
  bench('es-toolkit/lowerCase', () => {
    const str = 'camelCase';
    lowerCaseToolkit(str);
  });

  bench('lodash/lowerCase', () => {
    const str = 'camelCase';
    lowerCaseLodash(str);
  });
});
