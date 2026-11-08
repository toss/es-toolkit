import { capitalize as capitalizeToolkit } from 'es-toolkit';
import { capitalize as capitalizeToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('capitalize', () => {
  bench('es-toolkit/capitalize', () => {
    const str = 'camelCase';
    do_not_optimize(capitalizeToolkit(str));
  });

  bench('es-toolkit/compat/capitalize', () => {
    const str = 'camelCase';
    do_not_optimize(capitalizeToolkitCompat(str));
  });

  bench('lodash/capitalize', () => {
    const str = 'camelCase';
    do_not_optimize(lodash.capitalize(str));
  });
});
