import { bindAll as bindAllToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

const object = {
  greet() {
    return 'hello ' + this.name;
  },
  farewell() {
    return 'goodbye ' + this.name;
  },
  name: 'John',
};

group('bindAll - single method', () => {
  bench('es-toolkit/bindAll - single method', () => {
    bindAllToolkit(object, 'greet');
  });

  bench('lodash/bindAll - single method', () => {
    lodash.bindAll(object, 'greet');
  });
});

group('bindAll - multiple methods', () => {
  bench('es-toolkit/bindAll - multiple methods', () => {
    bindAllToolkit(object, ['greet', 'farewell']);
  });

  bench('lodash/bindAll - multiple methods', () => {
    lodash.bindAll(object, ['greet', 'farewell']);
  });
});
