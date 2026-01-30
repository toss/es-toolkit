import { bench, describe } from 'vitest';
import { omit as omitToolkit_ } from 'es-toolkit';
import { omit as omitToolkitCompat_ } from 'es-toolkit/compat';
import { omit as omitLodash_ } from 'lodash';
import { omit as omitLodash_es } from 'lodash-es';

const omitToolkit = omitToolkit_;
const omitToolkitCompat = omitToolkitCompat_;
const omitLodash = omitLodash_;
const omitLodashEs = omitLodash_es;

describe('omit: simple', () => {
  bench('es-toolkit/omit', () => {
    omitToolkit({ foo: 1, bar: 2, baz: 3 }, ['foo', 'bar']);
  });

  bench('es-toolkit/compat/omit', () => {
    omitToolkitCompat({ foo: 1, bar: 2, baz: 3 }, ['foo', 'bar']);
  });

  bench('lodash/omit', () => {
    omitLodash({ foo: 1, bar: 2, baz: 3 }, ['foo', 'bar']);
  });

  bench('lodash-es/omit', () => {
    omitLodashEs({ foo: 1, bar: 2, baz: 3 }, ['foo', 'bar']);
  });
});

describe('omit: complex', () => {
  bench('es-toolkit/compat/omit', () => {
    omitToolkitCompat({ foo: { bar: { baz: 1 } }, quux: 2, a: { b: 3 } }, ['foo.bar.baz', 'quux']);
  });

  bench('lodash/omit', () => {
    omitLodash({ foo: { bar: { baz: 1 } }, quux: 2, a: { b: 3 } }, ['foo.bar.baz', 'quux']);
  });

  bench('lodash-es/omit', () => {
    omitLodashEs({ foo: { bar: { baz: 1 } }, quux: 2, a: { b: 3 } }, ['foo.bar.baz', 'quux']);
  });
});
