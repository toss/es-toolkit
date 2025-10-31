import { bench, describe } from 'vitest';
import { functionsIn as functionsInToolkitCompat_ } from 'es-toolkit/compat';
import { functionsIn as functionsInLodash_ } from 'lodash';

const functionsInToolkitCompat = functionsInToolkitCompat_;
const functionsInLodash = functionsInLodash_;

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
