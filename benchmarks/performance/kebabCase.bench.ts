import { bench, describe } from 'vitest';
import { kebabCase as kebabCaseToolkit } from 'es-toolkit';
import { kebabCase as kebabCaseLodash } from 'lodash';

describe('kebabCase', () => {
  bench('es-toolkit/kebabCase', () => {
    const str = 'camelCase';
    kebabCaseToolkit(str);
  });

  bench('lodash/kebabCase', () => {
    const str = 'camelCase';
    kebabCaseLodash(str);
  });
});
