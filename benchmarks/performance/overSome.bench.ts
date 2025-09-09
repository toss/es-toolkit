import { bench, describe } from 'vitest';
import { overSome as overSomeToolkit_ } from 'es-toolkit/compat';
import { overSome as overSomeLodash_ } from 'lodash';

const overSomeToolkit = overSomeToolkit_;
const overSomeLodash = overSomeLodash_;

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
