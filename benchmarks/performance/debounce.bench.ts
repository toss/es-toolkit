import { debounce as debounceToolkit } from 'es-toolkit';
import { debounce as debounceCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('debounce', () => {
  bench('es-toolkit/debounce', () => {
    debounceToolkit(() => undefined, 1000)();
  });

  bench('es-toolkit/compat/debounce', () => {
    debounceCompatToolkit(() => undefined, 1000)();
  });

  bench('lodash/debounce', () => {
    lodash.debounce(() => undefined, 1000)();
  });
});
