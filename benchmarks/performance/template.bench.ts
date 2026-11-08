import { template as templateToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('template (interpolate)', () => {
  bench('es-toolkit/template', () => {
    const compiled = templateToolkit('hello <%= user %>!');

    do_not_optimize(compiled({ user: 'fred' }));
    do_not_optimize(compiled({ user: 'pebbles' }));
  });

  bench('lodash/template', () => {
    const compiled = lodash.template('hello <%= user %>!');
    do_not_optimize(compiled({ user: 'fred' }));
    do_not_optimize(compiled({ user: 'pebbles' }));
  });
});

group('template (evaluate)', () => {
  bench('es-toolkit/template', () => {
    const compiled = templateToolkit('<% if (user === "fred") { %>hello fred!<% } else { %>hello pebbles!<% } %>');
    do_not_optimize(compiled({ user: 'fred' }));
    do_not_optimize(compiled({ user: 'pebbles' }));
  });

  bench('lodash/template', () => {
    const compiled = lodash.template('<% if (user === "fred") { %>hello fred!<% } else { %>hello pebbles!<% } %>');
    do_not_optimize(compiled({ user: 'fred' }));
    do_not_optimize(compiled({ user: 'pebbles' }));
  });
});

group('template (escape)', () => {
  bench('es-toolkit/template', () => {
    const compiled = templateToolkit('<%- user %>');

    do_not_optimize(compiled({ user: '<script>' }));
    do_not_optimize(compiled({ user: '<script type="text/javascript">alert("xss");</script>' }));
  });

  bench('lodash/template', () => {
    const compiled = lodash.template('<%- user %>');
    do_not_optimize(compiled({ user: '<script>' }));
    do_not_optimize(compiled({ user: '<script type="text/javascript">alert("xss");</script>' }));
  });
});
