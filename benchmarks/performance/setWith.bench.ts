import { setWith as setWithToolkitCompat } from 'es-toolkit/compat';
import { isObject } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('setWith - simple path', () => {
  bench('es-toolkit/setWith', () => {
    setWithToolkitCompat({}, 'a.b.c', 1);
  });

  bench('lodash/setWith', () => {
    lodash.setWith({}, 'a.b.c', 1);
  });
});

group('setWith - with customizer', () => {
  const customizer = (value: unknown) => (isObject(value) ? undefined : {});

  bench('es-toolkit/setWith', () => {
    setWithToolkitCompat({}, '[0][1][2]', 3, customizer);
  });

  bench('lodash/setWith', () => {
    lodash.setWith({}, '[0][1][2]', 3, customizer);
  });
});

group('setWith - complex path', () => {
  bench('es-toolkit/setWith', () => {
    setWithToolkitCompat({}, 'a[0].b.c[0][1].d', 4);
  });

  bench('lodash/setWith', () => {
    lodash.setWith({}, 'a[0].b.c[0][1].d', 4);
  });
});
