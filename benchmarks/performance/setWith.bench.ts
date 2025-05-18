import { bench, describe } from 'vitest';
import { setWith as setWithToolkitCompat_ } from 'es-toolkit/compat';
import { isObject } from 'es-toolkit/compat';
import { setWith as setWithLodash_ } from 'lodash';

const setWithToolkitCompat = setWithToolkitCompat_;
const setWithLodash = setWithLodash_;

describe('setWith - simple path', () => {
  bench('es-toolkit/setWith', () => {
    setWithToolkitCompat({}, 'a.b.c', 1);
  });

  bench('lodash/setWith', () => {
    setWithLodash({}, 'a.b.c', 1);
  });
});

describe('setWith - with customizer', () => {
  const customizer = (value: unknown) => (isObject(value) ? undefined : {});

  bench('es-toolkit/setWith', () => {
    setWithToolkitCompat({}, '[0][1][2]', 3, customizer);
  });

  bench('lodash/setWith', () => {
    setWithLodash({}, '[0][1][2]', 3, customizer);
  });
});

describe('setWith - complex path', () => {
  bench('es-toolkit/setWith', () => {
    setWithToolkitCompat({}, 'a[0].b.c[0][1].d', 4);
  });

  bench('lodash/setWith', () => {
    setWithLodash({}, 'a[0].b.c[0][1].d', 4);
  });
});
