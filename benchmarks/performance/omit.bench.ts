import { bench, describe } from 'vitest';
import { omit as omitToolkit } from 'es-toolkit';
import { omit as omitToolkitCompat } from 'es-toolkit/compat';
import { omit as omitLodash } from 'lodash';

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
});

describe('omit: complex', () => {
  bench('es-toolkit/compat/omit', () => {
    omitToolkitCompat({ foo: { bar: { baz: 1 } }, quux: 2, a: { b: 3 } }, ['foo.bar.baz', 'quux']);
  });

  bench('lodash/omit', () => {
    omitLodash({ foo: { bar: { baz: 1 } }, quux: 2, a: { b: 3 } }, ['foo.bar.baz', 'quux']);
  });
});
