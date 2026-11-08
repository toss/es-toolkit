import { identity as identityToolkit } from 'es-toolkit';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('identity', () => {
  bench('es-toolkit/identity', () => {
    identityToolkit(5);
    identityToolkit('hello');
    identityToolkit({ key: 'value' });
    identityToolkit([1, 2, 3]);
    identityToolkit(true);
    identityToolkit(false);
  });

  bench('lodash/identity', () => {
    lodash.identity(5);
    lodash.identity('hello');
    lodash.identity({ key: 'value' });
    lodash.identity([1, 2, 3]);
    lodash.identity(true);
    lodash.identity(false);
  });
});
