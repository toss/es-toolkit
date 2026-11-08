import { bench, describe } from 'vitest';
import { debounce as debounceToolkit } from 'es-toolkit';
import { debounce as debounceCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { debounce: debounceLodash } = lodash;

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

describe('debounce: repeated calls', () => {
  const debouncedToolkit = debounceToolkit(() => undefined, 1000);
  const debouncedCompatToolkit = debounceCompatToolkit(() => undefined, 1000);
  const debouncedLodash = debounceLodash(() => undefined, 1000);

  bench('es-toolkit/debounce', () => {
    debouncedToolkit();
  });

  bench('es-toolkit/compat/debounce', () => {
    debouncedCompatToolkit();
  });

  bench('lodash/debounce', () => {
    debouncedLodash();
  });
});
