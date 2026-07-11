import { bench, describe } from 'vitest';
import { forIn as forInToolkitCompat, times } from 'es-toolkit/compat';
import lodash from 'lodash';

const { forIn: forInLodash } = lodash;

describe('forIn', () => {
  const bigObject = Object.fromEntries(times(1000, i => [i, i]));
  const iteratee = (value: number, key: string, object: typeof bigObject) => [value, key, object];

  bench('es-toolkit/compat/forIn', () => {
    forInToolkitCompat(bigObject, iteratee);
  });

  bench('lodash/forIn', () => {
    forInLodash(bigObject, iteratee);
  });
});
