import { map as mapToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

const generateArray = (length: number) => Array.from({ length }, (_, i) => i);
const generateObject = (length: number) => Object.fromEntries(generateArray(length).map(i => [`key${i}`, i]));

group('map/array', () => {
  const array = [1, 2, 3, 4, 5];

  bench('es-toolkit/map', () => {
    do_not_optimize(mapToolkit(array, value => value * 2));
  });

  bench('lodash/map', () => {
    do_not_optimize(lodash.map(array, value => value * 2));
  });
});

group('map/object', () => {
  const obj = {
    key1: 1,
    key2: 2,
    key3: 3,
    key4: 4,
    key5: 5,
  };

  bench('es-toolkit/map', () => {
    do_not_optimize(mapToolkit(obj, value => value * 2));
  });

  bench('lodash/map', () => {
    do_not_optimize(lodash.map(obj, value => value * 2));
  });
});

group('map/largeArray', () => {
  const largeArray = generateArray(10000);

  bench('es-toolkit/map', () => {
    do_not_optimize(mapToolkit(largeArray, value => value * 2));
  });

  bench('lodash/map', () => {
    do_not_optimize(lodash.map(largeArray, value => value * 2));
  });
});

group('map/largeObject', () => {
  const largeObject = generateObject(10000);

  bench('es-toolkit/map', () => {
    do_not_optimize(mapToolkit(largeObject, value => value * 2));
  });

  bench('lodash/map', () => {
    do_not_optimize(lodash.map(largeObject, value => value * 2));
  });
});
