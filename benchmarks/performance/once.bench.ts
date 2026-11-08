import { once as onceToolkit } from 'es-toolkit';
import { once as onceToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('once', () => {
  bench('es-toolkit/once', () => {
    onceToolkit(() => undefined);
  });

  bench('es-toolkit/compat/once', () => {
    onceToolkitCompat(() => undefined);
  });

  bench('lodash/once', () => {
    lodash.once(() => undefined);
  });
});
