import { bench, describe } from 'vitest';
import { functions as functionsToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { functions: functionsLodash } = lodash;

describe('functions', () => {
  const testObject = {
    a: 'a',
    b: () => 'b',
    c: /x/,
    d: function () {},
    e: 123,
  };

  bench('es-toolkit/functions', () => {
    functionsToolkit(testObject);
  });

  bench('lodash/functions', () => {
    functionsLodash(testObject);
  });
});

describe('functions/largeObject', () => {
  const largeObject = Object.fromEntries(
    Array.from({ length: 1000 }, (_, i) => [`key${i}`, i % 2 === 0 ? () => i : i])
  );

  bench('es-toolkit/functions', () => {
    functionsToolkit(largeObject);
  });

  bench('lodash/functions', () => {
    functionsLodash(largeObject);
  });
});
