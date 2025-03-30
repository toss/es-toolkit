import { bench, describe } from 'vitest';
import { functionsIn as functionsInToolkitCompat_ } from 'es-toolkit/compat';
import { functionsIn as functionsInLodash_ } from 'lodash';

const functionsInToolkitCompat = functionsInToolkitCompat_;
const functionsInLodash = functionsInLodash_;

describe('functionsIn', () => {
  function Foo() {
    this.a = function () {
      return 'a';
    };
    this.b = function () {
      return 'b';
    };
  }

  Foo.prototype.c = function () {
    return 'c';
  };

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
