import { delay as delayToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('delay', () => {
  bench('es-toolkit/compat/delay', () => {
    delayToolkitCompat(() => {}, 1000);
  });

  bench('lodash/delay', () => {
    lodash.delay(() => {}, 1000);
  });
});
