import { bench, describe } from 'vitest';
import { set as setToolkitCompat_ } from 'es-toolkit/compat';
import { set as lodashSet_ } from 'lodash';

const setToolkitCompat = setToolkitCompat_;
const lodashSet = lodashSet_;

describe('set - dot', () => {
  bench('es-toolkit/set', () => {
    setToolkitCompat({}, 'a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z', 1);
  });

  bench('lodash/set', () => {
    lodashSet({}, 'a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z', 1);
  });
});

describe('set - array', () => {
  bench('es-toolkit/set', () => {
    setToolkitCompat({}, 'a[0][1][2][3][4][5][6]', 1);
  });
  bench('lodash/set', () => {
    lodashSet({}, 'a[0][1][2][3][4][5][6]', 1);
  });
});
