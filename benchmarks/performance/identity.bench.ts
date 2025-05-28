import { bench, describe } from 'vitest';
import { identity as identityToolkit } from 'es-toolkit';
import { identity as identityLodash } from 'lodash';

describe('identity', () => {
  bench('es-toolkit/identity', () => {
    identityToolkit(5);
    identityToolkit('hello');
    identityToolkit({ key: 'value' });
    identityToolkit([1, 2, 3]);
    identityToolkit(true);
    identityToolkit(false);
  });

  bench('lodash/identity', () => {
    identityLodash(5);
    identityLodash('hello');
    identityLodash({ key: 'value' });
    identityLodash([1, 2, 3]);
    identityLodash(true);
    identityLodash(false);
  });
});
