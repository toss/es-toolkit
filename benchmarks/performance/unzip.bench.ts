import { unzip as unzipToolkit } from 'es-toolkit';
import { unzip as unzipToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('unzip, small arrays', () => {
  bench('es-toolkit/unzip', () => {
    unzipToolkit([
      ['a', 1, true],
      ['b', 2, false],
    ]);
  });

  bench('es-toolkit/compat/unzip', () => {
    unzipToolkitCompat([
      ['a', 1, true],
      ['b', 2, false],
    ]);
  });

  bench('lodash/unzip', () => {
    lodash.unzip([
      ['a', 1, true],
      ['b', 2, false],
    ]);
  });
});

group('unzip, large arrays', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => ['a', i, true]);

  bench('es-toolkit/unzip', () => {
    unzipToolkit(largeArray);
  });

  bench('es-toolkit/compat/unzip', () => {
    unzipToolkitCompat(largeArray);
  });

  bench('lodash/unzip', () => {
    lodash.unzip(largeArray);
  });
});
