import { bench, describe } from 'vitest';
import { isDate as isDateToolkit_ } from 'es-toolkit';
import { isDate as isDateLodash_ } from 'lodash';

const isDateToolkit = isDateToolkit_;
const isDateLodash = isDateLodash_;

describe('isDate', () => {
  bench('es-toolkit/isDate', () => {
    isDateToolkit(new Date());
    isDateToolkit('2024-01-01');
    isDateToolkit({ year: 2024, month: 1, day: 1 });
  });

  bench('lodash/isDate', () => {
    isDateLodash(new Date());
    isDateLodash('2024-01-01');
    isDateLodash({ year: 2024, month: 1, day: 1 });
  });
});
