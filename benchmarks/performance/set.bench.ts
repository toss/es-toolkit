import { bench, describe } from 'vitest';
import { set as setToolkitCompat } from 'es-toolkit/compat';
import { set as lodashSet } from 'lodash';

describe('set', () => {
  bench('es-toolkit/set-1', () => {
    setToolkitCompat({}, 'a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z', 1);
  });
  bench('es-toolkit/set-2', () => {
    setToolkitCompat({}, 'a[0][1][2][3][4][5][6]', 1);
  });

  bench('lodash/set-1', () => {
    lodashSet({}, 'a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z', 1);
  });
  bench('lodash/set-2', () => {
    lodashSet({}, 'a[0][1][2][3][4][5][6]', 1);
  });
});
