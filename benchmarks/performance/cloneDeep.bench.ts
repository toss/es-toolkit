import { bench, describe } from 'vitest';
import { cloneDeep as cloneDeepToolkit } from 'es-toolkit';
import { cloneDeep as cloneDeepCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import createRfdc from 'rfdc';

const { cloneDeep: cloneDeepLodash } = lodash;
const rfdcWithCircle = createRfdc({
  circles: true,
});
const rfdc = createRfdc();

const obj = {
  number: 29,
  string: 'es-toolkit',
  boolean: true,
  array: [1, 2, 3],
  object: { a: 1, b: 'es-toolkit' },
  date: new Date(),
  regex: /abc/g,
  instance: new (class Test {
    value = 1;
  })(),
  nested: { a: [1, 2, 3], b: { c: 'es-toolkit' }, d: new Date() },
  nested2: { a: { b: { c: { d: { e: { f: { g: 'es-toolkit' } } } } } } },
};

describe('cloneDeep', () => {
  bench('es-toolkit/cloneDeep', () => {
    cloneDeepToolkit(obj);
  });

  bench('es-toolkit/compat/cloneDeep', () => {
    cloneDeepCompatToolkit(obj);
  });

  bench('lodash/cloneDeep', () => {
    cloneDeepLodash(obj);
  });

  bench('node/JSON.parse', () => {
    JSON.parse(JSON.stringify(obj));
  });

  bench('node/structuredClone', () => {
    structuredClone(obj);
  });

  bench('rfdc without circle', () => {
    rfdc(obj);
  });

  bench('rfdc with circle', () => {
    rfdcWithCircle(obj);
  });
});

class Tagged {
  value = 1;
  nested = { a: 1, b: 'es-toolkit' };
}
(Tagged.prototype as any)[Symbol.toStringTag] = 'Tagged';

// A class instance with a writable custom `Symbol.toStringTag`. This is the path where the tag
// has to be resolved before the value can be classified.
const taggedObj = {
  instance: new Tagged(),
  nested: { instance: new Tagged() },
};

// Branded built-ins define a read-only or accessor `Symbol.toStringTag`. They measure the added
// classification cost on values that must continue to be returned by reference.
const brandedObj = {
  url: new URL('https://es-toolkit.dev/reference/object/cloneDeep.html'),
  promise: Promise.resolve(1),
  formatter: new Intl.NumberFormat(),
};

describe('cloneDeep (custom Symbol.toStringTag)', () => {
  bench('es-toolkit/cloneDeep', () => {
    cloneDeepToolkit(taggedObj);
  });

  bench('es-toolkit/compat/cloneDeep', () => {
    cloneDeepCompatToolkit(taggedObj);
  });

  bench('lodash/cloneDeep', () => {
    cloneDeepLodash(taggedObj);
  });
});

describe('cloneDeep (branded built-ins)', () => {
  bench('es-toolkit/cloneDeep', () => {
    cloneDeepToolkit(brandedObj);
  });

  bench('es-toolkit/compat/cloneDeep', () => {
    cloneDeepCompatToolkit(brandedObj);
  });

  bench('lodash/cloneDeep', () => {
    cloneDeepLodash(brandedObj);
  });
});
