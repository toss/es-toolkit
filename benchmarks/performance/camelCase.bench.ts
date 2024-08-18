import { bench, describe } from 'vitest';
import { camelCase as camelCaseToolkit } from 'es-toolkit';
import { camelCase as camelCaseLodash } from 'lodash';

describe('camelCase', () => {
  bench('es-toolkit/camelCase', () => {
    const str = 'kebab-case';
    camelCaseToolkit(str);
  });

  bench('lodash/camelCase', () => {
    const str = 'kebab-case';
    camelCaseLodash(str);
  });
});
