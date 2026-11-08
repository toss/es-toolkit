import { zipObject as zipObjectToolkit } from 'es-toolkit';
import { zipObject as zipObjectToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('zipObject', () => {
  bench('es-toolkit/zipObject', () => {
    zipObjectToolkit([1, 2, 3, 4], ['a', 'b', 'c', 'd']);
  });

  bench('es-toolkit/compat/zipObject', () => {
    zipObjectToolkitCompat([1, 2, 3, 4], ['a', 'b', 'c', 'd']);
  });

  bench('lodash/zipObject', () => {
    lodash.zipObject([1, 2, 3, 4], ['a', 'b', 'c', 'd']);
  });
});

group('zipObject/largeArray', () => {
  const largeArray = Array.from({ length: 10000 }, (_, i) => i);

  bench('es-toolkit/zipObject', () => {
    zipObjectToolkit(largeArray, largeArray);
  });

  bench('es-toolkit/compat/zipObject', () => {
    zipObjectToolkitCompat(largeArray, largeArray);
  });

  bench('lodash/zipObject', () => {
    lodash.zipObject(largeArray, largeArray);
  });
});
