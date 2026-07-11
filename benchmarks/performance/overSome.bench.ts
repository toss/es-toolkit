import { bench, describe } from 'vitest';
import { overSome as overSomeToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { overSome: overSomeLodash } = lodash;

describe('overSome', () => {
  bench('es-toolkit/overSome', () => {
    const isValid = overSomeToolkit(
      value => typeof value === 'string',
      value => typeof value === 'number'
    );
    isValid(1);
  });

  bench('lodash/overSome', () => {
    const isValid = overSomeLodash(
      value => typeof value === 'string',
      value => typeof value === 'number'
    );
    isValid(1);
  });
});
