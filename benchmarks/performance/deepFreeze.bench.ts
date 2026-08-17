import { bench, describe } from 'vitest';
import { deepFreeze as deepFreezeToolkit } from 'es-toolkit';
import { deepFreeze as deepFreezeEs6 } from 'deep-freeze-es6';

// Freezing mutates the object, so each iteration needs a fresh one.
// Object creation cost is included equally in every case.
const createObject = () => ({
  number: 29,
  string: 'es-toolkit',
  boolean: true,
  array: [1, 2, 3],
  object: { a: 1, b: 'es-toolkit' },
  nested: { a: [1, 2, 3], b: { c: 'es-toolkit' } },
  nested2: { a: { b: { c: { d: { e: { f: { g: 'es-toolkit' } } } } } } },
});

describe('deepFreeze', () => {
  bench('es-toolkit/deepFreeze', () => {
    deepFreezeToolkit(createObject());
  });

  bench('deep-freeze-es6/deepFreeze', () => {
    deepFreezeEs6(createObject());
  });
});
