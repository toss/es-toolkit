import { bench, describe } from 'vitest';
import { bindKey as bindKeyToolkit } from 'es-toolkit';
import { bindKey as bindKeyLodash } from 'lodash';

const object = {
  user: 'fred',
  greet: function (greeting: string) {
    return `${this.user} says: ${greeting}`;
  },
};

describe('bindKey', () => {
  bench('es-toolkit/bindKey - without placeholder', () => {
    bindKeyToolkit(object, 'greet', 'hi');
  });

  bench('lodash/bindKey - without placeholder', () => {
    bindKeyLodash(object, 'greet', 'hi');
  });

  bench('es-toolkit/bindKey - with placeholder', () => {
    bindKeyToolkit(object, 'greet', bindKeyToolkit.placeholder);
  });

  bench('lodash/bindKey - with placeholder', () => {
    bindKeyLodash(object, 'greet', bindKeyLodash.placeholder);
  });
});
