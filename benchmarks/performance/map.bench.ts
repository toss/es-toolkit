import { bench, describe } from 'vitest';
import { map as mapToolkit } from 'es-toolkit/compat';
import { map as mapLodash } from 'lodash';

const generateArray = (length: number) => Array.from({ length }, (_, i) => i);
const generateObject = (length: number) => Object.fromEntries(generateArray(length).map(i => [`key${i}`, i]));

describe('map/array', () => {
  const array = generateArray(10000);

  bench('es-toolkit/map', () => {
    mapToolkit(array, value => value * 2);
  });

  bench('lodash/map', () => {
    mapLodash(array, value => value * 2);
  });
});

describe('map/object', () => {
  const obj = generateObject(10000);

  bench('es-toolkit/map', () => {
    mapToolkit(obj, value => value * 2);
  });

  bench('lodash/map', () => {
    mapLodash(obj, value => value * 2);
  });
});
