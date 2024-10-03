import { bench, describe } from 'vitest';
import { camelCase as camelCaseToolkit_ } from 'es-toolkit';
import { camelCase as camelCaseToolkitCompat_ } from 'es-toolkit/compat';
import { camelCase as camelCaseLodash_ } from 'lodash';

const camelCaseToolkit = camelCaseToolkit_;
const camelCaseToolkitCompat = camelCaseToolkitCompat_;
const camelCaseLodash = camelCaseLodash_;

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
