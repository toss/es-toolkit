import { bench, describe } from 'vitest';
import { forInRight as forInToolkitCompat_, times } from 'es-toolkit/compat';
import { forInRight as forInLodash_ } from 'lodash';

const forInToolkitCompat = forInToolkitCompat_;
const forInLodash = forInLodash_;

describe('forInRight', () => {
  const bigObject = Object.fromEntries(times(1000, i => [i, i]));
  const iteratee = (value: number, key: string, object: typeof bigObject) => [value, key, object];

  bench('es-toolkit/compat/forInRight', () => {
    forInToolkitCompat(bigObject, iteratee);
  });

  bench('lodash/forInRight', () => {
    forInLodash(bigObject, iteratee);
  });
});
