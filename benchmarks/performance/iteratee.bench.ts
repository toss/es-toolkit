import { bench, describe } from 'vitest';
import { iteratee as iterateeToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { iteratee: iterateeLodash } = lodash;

describe('iteratee', () => {
  bench('es-toolkit/compat/iteratee', () => {
    iterateeToolkit(1);
    iterateeToolkit([1, 2]);
    iterateeToolkit({ a: 1 });
    iterateeToolkit(() => {});
  });

  bench('lodash/compat/iteratee', () => {
    iterateeLodash(1);
    iterateeLodash([1, 2]);
    iterateeLodash({ a: 1 });
    iterateeLodash(() => {});
  });
});
