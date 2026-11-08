import { isArguments as isArgumentsToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isArguments', () => {
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
    lodash.isArguments([1, 2, 3]);
    lodash.isArguments(true);
    lodash.isArguments(new Date());
    lodash.isArguments(new Error());
    lodash.isArguments(1);
    lodash.isArguments(/x/);
    lodash.isArguments('a');
  });
});
