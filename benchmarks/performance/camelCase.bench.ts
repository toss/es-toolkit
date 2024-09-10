import { bench, describe } from 'vitest';
import { camelCase as camelCaseToolkit } from 'es-toolkit';
import { camelCase as camelCaseToolkitCompat } from 'es-toolkit/compat';
import { camelCase as camelCaseLodash } from 'lodash';

describe('camelCase', () => {
  bench('es-toolkit/camelCase', () => {
    const str = 'kebab-case';
    camelCaseToolkit(str);
  });

  bench('es-toolkit/compat/camelCase', () => {
    const str = 'kebab-case';
    camelCaseToolkitCompat(str);
  });

  bench('lodash/camelCase', () => {
    const str = 'kebab-case';
    camelCaseLodash(str);
  });
});
