import { bench, describe } from 'vitest';
import { identity as identityToolkit_ } from 'es-toolkit';
import { identity as identityLodash_ } from 'lodash';

const identityToolkit = identityToolkit_;
const identityLodash = identityLodash_;

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
