import { bench, describe } from 'vitest';
import { bindKey as bindKeyToolkit_ } from 'es-toolkit/compat';
import { bindKey as bindKeyLodash_ } from 'lodash';

const bindKeyToolkit = bindKeyToolkit_;
const bindKeyLodash = bindKeyLodash_;

const object = {
  user: 'fred',
  greet: function (greeting: string) {
    return `${this.user} says: ${greeting}`;
  },
};

describe('bindKey - without placeholder', () => {
  bench('es-toolkit/bindKey - without placeholder', () => {
    bindKeyToolkit(object, 'greet', 'hi');
  });

  bench('lodash/bindKey - without placeholder', () => {
    bindKeyLodash(object, 'greet', 'hi');
  });
});

describe('bindKey - with placeholder', () => {
  bench('es-toolkit/bindKey - with placeholder', () => {
    bindKeyToolkit(object, 'greet', bindKeyToolkit.placeholder);
  });

  bench('lodash/bindKey - with placeholder', () => {
    bindKeyLodash(object, 'greet', bindKeyLodash.placeholder);
  });
});
