import { isError as isErrorToolkit } from 'es-toolkit';
import { isError as isErrorCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isError', () => {
  bench('es-toolkit/isError', () => {
    isErrorToolkit(new Error());
    isErrorToolkit(1);
    isErrorToolkit('Error');
    isErrorToolkit({ name: 'Error', message: '' });
  });

  bench('es-toolkit/compat/isError', () => {
    isErrorCompatToolkit(new Error());
    isErrorCompatToolkit(1);
    isErrorCompatToolkit('Error');
    isErrorCompatToolkit({ name: 'Error', message: '' });
  });

  bench('lodash/isError', () => {
    lodash.isError(new Error());
    lodash.isError(1);
    lodash.isError('Error');
    lodash.isError({ name: 'Error', message: '' });
  });
});
