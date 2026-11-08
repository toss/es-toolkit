import { omitBy as omitByToolkit } from 'es-toolkit';
import { omitBy as omitByToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('omitBy', () => {
  const obj = { a: 1, b: 'omit', c: 3, d: 'test', e: 0 };
  const shouldOmit = (value: number | string) => typeof value === 'string';

  bench('es-toolkit/omitBy', () => {
    omitByToolkit(obj, shouldOmit);
  });

  bench('es-toolkit/compat/omitBy', () => {
    omitByToolkitCompat(obj, shouldOmit);
  });

  bench('lodash/omitBy', () => {
    lodash.omitBy(obj, shouldOmit);
  });
});
