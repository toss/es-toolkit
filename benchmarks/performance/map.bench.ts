import { bench, describe } from 'vitest';
import { map as mapToolkit_ } from 'es-toolkit/compat';
import { map as mapLodash_ } from 'lodash';

const mapToolkit = mapToolkit_;
const mapLodash = mapLodash_;

const generateArray = (length: number) => Array.from({ length }, (_, i) => i);
const generateObject = (length: number) => Object.fromEntries(generateArray(length).map(i => [`key${i}`, i]));

describe('map/array', () => {
  const array = [1, 2, 3, 4, 5];

  bench('es-toolkit/map', () => {
    mapToolkit(array, value => value * 2);
  });

  bench('lodash/map', () => {
    mapLodash(array, value => value * 2);
  });
});

describe('map/object', () => {
  const obj = {
    key1: 1,
    key2: 2,
    key3: 3,
    key4: 4,
    key5: 5,
  };

  bench('es-toolkit/map', () => {
    mapToolkit(obj, value => value * 2);
  });

  bench('lodash/map', () => {
    mapLodash(obj, value => value * 2);
  });
});

describe('map/largeArray', () => {
  const largeArray = generateArray(10000);

  bench('es-toolkit/map', () => {
    mapToolkit(largeArray, value => value * 2);
  });

  bench('lodash/map', () => {
    mapLodash(largeArray, value => value * 2);
  });
});

describe('map/largeObject', () => {
  const largeObject = generateObject(10000);

  bench('es-toolkit/map', () => {
    mapToolkit(largeObject, value => value * 2);
  });

  bench('lodash/map', () => {
    mapLodash(largeObject, value => value * 2);
  });
});
