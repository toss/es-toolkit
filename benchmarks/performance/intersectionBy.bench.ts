import { intersectionBy as intersectionByToolkit } from 'es-toolkit';
import { intersectionBy as intersectionByCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('intersectionBy', () => {
  bench('es-toolkit/intersectionBy', () => {
    const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const array2 = [{ id: 2 }, { id: 4 }];
    const mapper = item => item.id;
    intersectionByToolkit(array1, array2, mapper);
  });

  bench('es-toolkit/compat/intersectionBy', () => {
    const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const array2 = [{ id: 2 }, { id: 4 }];
    const mapper = item => item.id;
    intersectionByCompatToolkit(array1, array2, mapper);
  });

  bench('lodash/intersectionBy', () => {
    const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const array2 = [{ id: 2 }, { id: 4 }];
    const mapper = item => item.id;
    lodash.intersectionBy(array1, array2, mapper);
  });
});

group('intersectionBy/largeArrays', () => {
  const array1 = Array.from({ length: 10000 }, (_, i) => ({ id: i }));
  const array2 = Array.from({ length: 10000 }, (_, i) => ({ id: i + 5000 }));
  const mapper = item => item.id;

  bench('es-toolkit/intersectionBy', () => {
    intersectionByToolkit(array1, array2, mapper);
  });

  bench('es-toolkit/compat/intersectionBy', () => {
    intersectionByCompatToolkit(array1, array2, mapper);
  });

  bench('lodash/intersectionBy', () => {
    lodash.intersectionBy(array1, array2, mapper);
  });
});
