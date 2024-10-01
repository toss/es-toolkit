import { bench, describe } from 'vitest';
import { capitalize as capitalizeToolkit_ } from 'es-toolkit';
import { capitalize as capitalizeLodash_ } from 'lodash';

const capitalizeToolkit = capitalizeToolkit_;
const capitalizeLodash = capitalizeLodash_;

describe('capitalize', () => {
  bench('es-toolkit/capitalize', () => {
    const str = 'camelCase';
    capitalizeToolkit(str);
  });

  bench('lodash/capitalize', () => {
    const str = 'camelCase';
    capitalizeLodash(str);
  });
});
