import { isNil as isNilToolkit } from 'es-toolkit';
import { isNil as isNilCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('isNil', () => {
  bench('es-toolkit/isNil', () => {
    isNilToolkit(null);
    isNilToolkit(undefined);
    isNilToolkit(123);
    isNilToolkit([1, 2, 3]);
  });

  bench('es-toolkit/compat/isNil', () => {
    isNilCompatToolkit(null);
    isNilCompatToolkit(undefined);
    isNilCompatToolkit(123);
    isNilCompatToolkit([1, 2, 3]);
  });

  bench('lodash/isNil', () => {
    lodash.isNil(null);
    lodash.isNil(undefined);
    lodash.isNil(123);
    lodash.isNil([1, 2, 3]);
  });
});
