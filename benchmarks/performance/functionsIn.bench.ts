import { bench, describe } from 'vitest';
import { functionsIn as functionsInToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';

const { functionsIn: functionsInLodash } = lodash;

describe('functionsIn', () => {
  class Foo {
    a = function () {
      return 'a';
    };

    b = function () {
      return 'b';
    };
    c() {
      return 'c';
    }
  }

  const foo = new Foo();
  const plainObject = {
    a: function () {
      return 'a';
    },
    b: function () {
      return 'b';
    },
  };

  bench('es-toolkit/compat/functionsIn', () => {
    functionsInToolkitCompat(foo);
    functionsInToolkitCompat(plainObject);
    functionsInToolkitCompat(null);
    functionsInToolkitCompat(undefined);
  });

  bench('lodash/functionsIn', () => {
    functionsInLodash(foo);
    functionsInLodash(plainObject);
    functionsInLodash(null);
    functionsInLodash(undefined);
  });
});
