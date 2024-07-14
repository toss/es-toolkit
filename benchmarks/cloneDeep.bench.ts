import { bench, describe } from 'vitest';
import { cloneDeep } from 'es-toolkit';
import { cloneDeep as lodashCloneDeep } from 'lodash';

const obj = {
  number: 29,
  string: 'es-toolkit',
  boolean: true,
  array: [1, 2, 3],
  object: { a: 1, b: 'es-toolkit' },
  date: new Date(),
  regex: /abc/g,
  nested: { a: [1, 2, 3], b: { c: 'es-toolkit' }, d: new Date() },
};

describe('cloneDeep', () => {
  bench('es-toolkit/cloneDeep', () => {
    cloneDeep(obj);
  });
  bench('lodash/cloneDeep', () => {
    lodashCloneDeep(obj);
  });
  bench('JSON.parse', () => {
    JSON.parse(JSON.stringify(obj));
  });
});
