import { set as setToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('set - dot', () => {
  bench('es-toolkit/set', () => {
    setToolkitCompat({}, 'a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z', 1);
  });

  bench('lodash/set', () => {
    lodash.set({}, 'a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z', 1);
  });
});

group('set - array', () => {
  bench('es-toolkit/set', () => {
    setToolkitCompat({}, 'a[0][1][2][3][4][5][6]', 1);
  });
  bench('lodash/set', () => {
    lodash.set({}, 'a[0][1][2][3][4][5][6]', 1);
  });
});
