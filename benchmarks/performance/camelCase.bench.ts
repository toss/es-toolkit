import { camelCase as camelCaseToolkit } from 'es-toolkit';
import { camelCase as camelCaseToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('camelCase', () => {
  bench('es-toolkit/camelCase', () => {
    const str = 'kebab-case';
    do_not_optimize(camelCaseToolkit(str));
  });

  bench('es-toolkit/compat/camelCase', () => {
    const str = 'kebab-case';
    do_not_optimize(camelCaseToolkitCompat(str));
  });

  bench('lodash/camelCase', () => {
    const str = 'kebab-case';
    do_not_optimize(lodash.camelCase(str));
  });
});
