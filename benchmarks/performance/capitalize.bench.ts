import { capitalize as capitalizeToolkit } from 'es-toolkit';
import { capitalize as capitalizeToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('capitalize', () => {
  bench('es-toolkit/capitalize', () => {
    const str = 'camelCase';
    capitalizeToolkit(str);
  });

  bench('es-toolkit/compat/capitalize', () => {
    const str = 'camelCase';
    capitalizeToolkitCompat(str);
  });

  bench('lodash/capitalize', () => {
    const str = 'camelCase';
    lodash.capitalize(str);
  });
});
