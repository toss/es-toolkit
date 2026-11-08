import { zipObjectDeep as zipObjectDeepToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('zipObjectDeep', () => {
  bench('es-toolkit/zipObjectDeep', () => {
    zipObjectDeepToolkit(['a.b[0].c', 'a.b[1].d'], [1, 2]);
  });

  bench('lodash/zipObjectDeep', () => {
    lodash.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
  });
});

group('zipObjectDeep/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => `a.b[${i}].c${i}`);

  bench('es-toolkit/zipObjectDeep', () => {
    zipObjectDeepToolkit(largeArray, largeArray);
  });

  bench('lodash/zipObjectDeep', () => {
    lodash.zipObjectDeep(largeArray, largeArray);
  });
});
