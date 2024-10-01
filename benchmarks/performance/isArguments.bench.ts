import { bench, describe } from 'vitest';
import { isArguments as isArgumentsToolkit_ } from 'es-toolkit/compat';
import { isArguments as isArgumentsLodash_ } from 'lodash';

const isArgumentsToolkit = isArgumentsToolkit_;
const isArgumentsLodash = isArgumentsLodash_;

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
