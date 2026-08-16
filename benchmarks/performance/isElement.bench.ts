import { bench, describe } from 'vitest';
import { isElement as isElementToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { isElement: isElementLodash } = lodash;

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
