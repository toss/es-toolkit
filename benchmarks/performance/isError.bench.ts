import { isError as isErrorToolkit } from 'es-toolkit';
import { isError as isErrorLodash } from 'lodash';
import { bench, describe } from '../bench';

describe('isError', () => {
  bench('es-toolkit/isError', () => {
    isErrorToolkit(new Error());
    isErrorToolkit(1);
    isErrorToolkit('Error');
    isErrorToolkit({ name: 'Error', message: '' });
  });

  bench('lodash/isError', () => {
    isErrorLodash(new Error());
    isErrorLodash(1);
    isErrorLodash('Error');
    isErrorLodash({ name: 'Error', message: '' });
  });
});
