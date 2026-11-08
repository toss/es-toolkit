import { overSome as overSomeToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('overSome', () => {
  bench('es-toolkit/overSome', () => {
    const isValid = overSomeToolkit(
      value => typeof value === 'string',
      value => typeof value === 'number'
    );
    isValid(1);
  });

  bench('lodash/overSome', () => {
    const isValid = lodash.overSome(
      value => typeof value === 'string',
      value => typeof value === 'number'
    );
    isValid(1);
  });
});
