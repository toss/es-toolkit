import { bench, describe } from 'vitest';
import { bindAll as bindAllToolkit_ } from 'es-toolkit/compat';
import { bindAll as bindAllLodash_ } from 'lodash';

const bindAllToolkit = bindAllToolkit_;
const bindAllLodash = bindAllLodash_;

const object = {
  greet() {
    return 'hello ' + this.name;
  },
  farewell() {
    return 'goodbye ' + this.name;
  },
  name: 'John',
};

describe('bindAll - single method', () => {
  bench('es-toolkit/bindAll - single method', () => {
    bindAllToolkit(object, 'greet');
  });

  bench('lodash/bindAll - single method', () => {
    bindAllLodash(object, 'greet');
  });
});

describe('bindAll - multiple methods', () => {
  bench('es-toolkit/bindAll - multiple methods', () => {
    bindAllToolkit(object, ['greet', 'farewell']);
  });

  bench('lodash/bindAll - multiple methods', () => {
    bindAllLodash(object, ['greet', 'farewell']);
  });
});
