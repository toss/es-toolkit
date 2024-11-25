import { bench, describe } from 'vitest';
import { isElement as isElementCompatToolkit_ } from 'es-toolkit/compat';
import { isElement as isElementLodash_ } from 'lodash';

const isElementToolkit = isElementCompatToolkit_;
const isElementLodash = isElementLodash_;

class ElementLike {
  nodeType = 1;
}

const NotElementLike = { nodeType: 1 };

describe('isElement - true', () => {
  bench('es-toolkit/isElement', () => {
    isElementToolkit(ElementLike);
  });

  bench('lodash/isElement', () => {
    isElementLodash(ElementLike);
  });
});

describe('isElement - false', () => {
  bench('es-toolkit/isElement', () => {
    isElementToolkit(NotElementLike);
  });

  bench('lodash/isElement', () => {
    isElementLodash(NotElementLike);
  });
});
