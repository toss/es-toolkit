import { bench, describe } from 'vitest';
import { toPlainObject as toPlainObjectCompatToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { toPlainObject: toPlainObjectLodash } = lodash;

describe('toPlainObject', () => {
  class Foo {
    b = 2;
  }
  (Foo.prototype as any).c = 3;
  const foo = new Foo();

  bench('es-toolkit/compat/toPlainObject', () => {
    toPlainObjectCompatToolkit(foo);
  });

  bench('lodash/toPlainObject', () => {
    toPlainObjectLodash(foo);
  });
});
