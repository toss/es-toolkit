import { bindKey as bindKeyToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

const object = {
  user: 'fred',
  greet: function (greeting: string) {
    return `${this.user} says: ${greeting}`;
  },
};

group('bindKey - without placeholder', () => {
  bench('es-toolkit/bindKey - without placeholder', () => {
    bindKeyToolkit(object, 'greet', 'hi');
  });

  bench('lodash/bindKey - without placeholder', () => {
    lodash.bindKey(object, 'greet', 'hi');
  });
});

group('bindKey - with placeholder', () => {
  bench('es-toolkit/bindKey - with placeholder', () => {
    bindKeyToolkit(object, 'greet', bindKeyToolkit.placeholder);
  });

  bench('lodash/bindKey - with placeholder', () => {
    lodash.bindKey(object, 'greet', lodash.bindKey.placeholder);
  });
});
