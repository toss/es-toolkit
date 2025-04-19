import { bench, describe } from 'vitest';
import { hasIn as hasInToolkit_ } from 'es-toolkit/compat';
import { hasIn as hasInLodash_ } from 'lodash';

const hasInToolkit = hasInToolkit_;
const hasInLodash = hasInLodash_;

describe('hasIn with string', () => {
  bench('es-toolkit/hasIn', () => {
    hasInToolkit({ a: { b: 3 } }, 'a.b');
  });

  bench('lodash/hasIn', () => {
    hasInLodash({ a: { b: 3 } }, 'a.b');
  });
});

describe('hasIn with string array', () => {
  bench('es-toolkit/hasIn', () => {
    hasInToolkit({ a: { b: 3 } }, ['a', 'b']);
  });

  bench('lodash/hasIn', () => {
    hasInLodash({ a: { b: 3 } }, ['a', 'b']);
  });
});

describe('hasIn with inherited property (string)', () => {
  function Rectangle() {}
  Rectangle.prototype.area = function () {
    return 0;
  };
  const rect = new Rectangle();

  bench('es-toolkit/hasIn', () => {
    hasInToolkit(rect, 'area');
  });

  bench('lodash/hasIn', () => {
    hasInLodash(rect, 'area');
  });
});

describe('hasIn with inherited property (array)', () => {
  function Rectangle() {}
  Rectangle.prototype.dimensions = { width: 10, height: 5 };
  const rect = new Rectangle();

  bench('es-toolkit/hasIn', () => {
    hasInToolkit(rect, ['dimensions', 'width']);
  });

  bench('lodash/hasIn', () => {
    hasInLodash(rect, ['dimensions', 'width']);
  });
});
