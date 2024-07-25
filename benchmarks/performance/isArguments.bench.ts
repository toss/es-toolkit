import { bench, describe } from 'vitest';
import { isArguments as isArgumentsToolkit } from 'es-toolkit';
import { isArguments as isArgumentsLodash } from 'lodash';

describe('isArguments', () => {
  bench('es-toolkit/isArguments', () => {
    isArgumentsToolkit([1, 2, 3]);
    isArgumentsToolkit(true);
    isArgumentsToolkit(new Date());
    isArgumentsToolkit(new Error());
    isArgumentsToolkit(1);
    isArgumentsToolkit(/x/);
    isArgumentsToolkit('a');
  });

  bench('lodash/isArguments', () => {
    isArgumentsLodash([1, 2, 3]);
    isArgumentsLodash(true);
    isArgumentsLodash(new Date());
    isArgumentsLodash(new Error());
    isArgumentsLodash(1);
    isArgumentsLodash(/x/);
    isArgumentsLodash('a');
  });
});
