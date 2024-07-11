import { bench, describe } from 'vitest';
import { clone } from 'es-toolkit';
import { clone as lodashClone } from 'lodash';

const obj = {
  number: 42,
  string: 'es-toolkit',
  boolean: true,
  array: [1, 2, 3],
  object: { a: 1, b: 'es-toolkit' },
  date: new Date(),
  regex: /abc/g,
  nested: { a: [1, 2, 3], b: { c: 'es-toolkit' }, d: new Date() },
};

describe('clone', () => {
  bench('es-toolkit/clone', () => {
    clone(obj);
  });
  bench('lodash/clone', () => {
    lodashClone(obj);
  });
});
