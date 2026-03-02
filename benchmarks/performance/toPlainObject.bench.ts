import { bench, describe } from 'vitest';
import { toPlainObject as toPlainObjectCompatToolkit_ } from 'es-toolkit/compat';
import { toPlainObject as toPlainObjectLodash_ } from 'lodash';

const toPlainObjectCompatToolkit = toPlainObjectCompatToolkit_;
const toPlainObjectLodash = toPlainObjectLodash_;

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
