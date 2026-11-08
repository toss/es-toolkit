import { isElement as isElementToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

class ElementLike {
  nodeType = 1;
}

const NotElementLike = { nodeType: 1 };

group('isElement - true', () => {
  bench('es-toolkit/isElement', () => {
    do_not_optimize(isElementToolkit(ElementLike));
  });

  bench('lodash/isElement', () => {
    do_not_optimize(lodash.isElement(ElementLike));
  });
});

group('isElement - false', () => {
  bench('es-toolkit/isElement', () => {
    do_not_optimize(isElementToolkit(NotElementLike));
  });

  bench('lodash/isElement', () => {
    do_not_optimize(lodash.isElement(NotElementLike));
  });
});
