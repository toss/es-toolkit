import { bench, describe } from 'vitest';
import { debounce as debounceToolkit_ } from 'es-toolkit';
import { debounce as debounceCompatToolkit_ } from 'es-toolkit/compat';
import { debounce as debounceLodash_ } from 'lodash';

const debounceToolkit = debounceToolkit_;
const debounceCompatToolkit = debounceCompatToolkit_;
const debounceLodash = debounceLodash_;

describe('debounce', () => {
  bench('es-toolkit/debounce', () => {
    debounceToolkit(() => undefined, 1000)();
  });

  bench('es-toolkit/compat/debounce', () => {
    debounceCompatToolkit(() => undefined, 1000)();
  });

  bench('lodash/debounce', () => {
    debounceLodash(() => undefined, 1000)();
  });
});
