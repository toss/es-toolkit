import { isElement as isElementToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

class ElementLike {
  nodeType = 1;
}

const NotElementLike = { nodeType: 1 };

group('isElement - true', () => {
  bench('es-toolkit/isElement', () => {
    isElementToolkit(ElementLike);
  });

  bench('lodash/isElement', () => {
    lodash.isElement(ElementLike);
  });
});

group('isElement - false', () => {
  bench('es-toolkit/isElement', () => {
    isElementToolkit(NotElementLike);
  });

  bench('lodash/isElement', () => {
    lodash.isElement(NotElementLike);
  });
});
