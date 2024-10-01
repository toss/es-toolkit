import { once as onceToolkit_ } from 'es-toolkit';
import { once as onceLodash_ } from 'lodash';
import { bench, describe } from 'vitest';

const onceToolkit = onceToolkit_;
const onceLodash = onceLodash_;

describe('once', () => {
  bench('es-toolkit/once', () => {
    onceToolkit(() => undefined);
  });

  bench('lodash/once', () => {
    onceLodash(() => undefined);
  });
});
