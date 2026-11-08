import { debounce as debounceToolkit } from 'es-toolkit';
import { debounce as debounceCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('debounce', () => {
  bench('es-toolkit/debounce', () => {
    do_not_optimize(debounceToolkit(() => undefined, 1000)());
  });

  bench('es-toolkit/compat/debounce', () => {
    do_not_optimize(debounceCompatToolkit(() => undefined, 1000)());
  });

  bench('lodash/debounce', () => {
    do_not_optimize(lodash.debounce(() => undefined, 1000)());
  });
});
