import { bench, describe } from 'vitest';
import { isError as isErrorToolkit_ } from 'es-toolkit';
import { isError as isErrorLodash_ } from 'lodash';

const isErrorToolkit = isErrorToolkit_;
const isErrorLodash = isErrorLodash_;

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
