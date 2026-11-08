import { bindAll as bindAllToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

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
    do_not_optimize(bindAllToolkit(object, 'greet'));
  });

  bench('lodash/bindAll - single method', () => {
    do_not_optimize(lodash.bindAll(object, 'greet'));
  });
});

group('bindAll - multiple methods', () => {
  bench('es-toolkit/bindAll - multiple methods', () => {
    do_not_optimize(bindAllToolkit(object, ['greet', 'farewell']));
  });

  bench('lodash/bindAll - multiple methods', () => {
    do_not_optimize(lodash.bindAll(object, ['greet', 'farewell']));
  });
});
