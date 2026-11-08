import { isArguments as isArgumentsToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isArguments', () => {
  bench('es-toolkit/isArguments', () => {
    do_not_optimize(isArgumentsToolkit([1, 2, 3]));
    do_not_optimize(isArgumentsToolkit(true));
    do_not_optimize(isArgumentsToolkit(new Date()));
    do_not_optimize(isArgumentsToolkit(new Error()));
    do_not_optimize(isArgumentsToolkit(1));
    do_not_optimize(isArgumentsToolkit(/x/));
    do_not_optimize(isArgumentsToolkit('a'));
  });

  bench('lodash/isArguments', () => {
    do_not_optimize(lodash.isArguments([1, 2, 3]));
    do_not_optimize(lodash.isArguments(true));
    do_not_optimize(lodash.isArguments(new Date()));
    do_not_optimize(lodash.isArguments(new Error()));
    do_not_optimize(lodash.isArguments(1));
    do_not_optimize(lodash.isArguments(/x/));
    do_not_optimize(lodash.isArguments('a'));
  });
});
