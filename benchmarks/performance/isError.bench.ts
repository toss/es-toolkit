import { isError as isErrorToolkit } from 'es-toolkit';
import { isError as isErrorCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('isError', () => {
  bench('es-toolkit/isError', () => {
    do_not_optimize(isErrorToolkit(new Error()));
    do_not_optimize(isErrorToolkit(1));
    do_not_optimize(isErrorToolkit('Error'));
    do_not_optimize(isErrorToolkit({ name: 'Error', message: '' }));
  });

  bench('es-toolkit/compat/isError', () => {
    do_not_optimize(isErrorCompatToolkit(new Error()));
    do_not_optimize(isErrorCompatToolkit(1));
    do_not_optimize(isErrorCompatToolkit('Error'));
    do_not_optimize(isErrorCompatToolkit({ name: 'Error', message: '' }));
  });

  bench('lodash/isError', () => {
    do_not_optimize(lodash.isError(new Error()));
    do_not_optimize(lodash.isError(1));
    do_not_optimize(lodash.isError('Error'));
    do_not_optimize(lodash.isError({ name: 'Error', message: '' }));
  });
});
