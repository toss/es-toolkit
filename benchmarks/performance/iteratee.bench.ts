import { bench, describe } from 'vitest';
import { iteratee as iterateeToolkit_ } from 'es-toolkit/compat';
import { iteratee as iterateeLodash_ } from 'lodash';

const iterateeToolkit = iterateeToolkit_;
const iterateeLodash = iterateeLodash_;

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
