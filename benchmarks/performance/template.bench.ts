import { template as templateToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('template (interpolate)', () => {
  bench('es-toolkit/template', () => {
    const compiled = templateToolkit('hello <%= user %>!');

    compiled({ user: 'fred' });
    compiled({ user: 'pebbles' });
  });

  bench('lodash/template', () => {
    const compiled = lodash.template('hello <%= user %>!');
    compiled({ user: 'fred' });
    compiled({ user: 'pebbles' });
  });
});

group('template (evaluate)', () => {
  bench('es-toolkit/template', () => {
    const compiled = templateToolkit('<% if (user === "fred") { %>hello fred!<% } else { %>hello pebbles!<% } %>');
    compiled({ user: 'fred' });
    compiled({ user: 'pebbles' });
  });

  bench('lodash/template', () => {
    const compiled = lodash.template('<% if (user === "fred") { %>hello fred!<% } else { %>hello pebbles!<% } %>');
    compiled({ user: 'fred' });
    compiled({ user: 'pebbles' });
  });
});

group('template (escape)', () => {
  bench('es-toolkit/template', () => {
    const compiled = templateToolkit('<%- user %>');

    compiled({ user: '<script>' });
    compiled({ user: '<script type="text/javascript">alert("xss");</script>' });
  });

  bench('lodash/template', () => {
    const compiled = lodash.template('<%- user %>');
    compiled({ user: '<script>' });
    compiled({ user: '<script type="text/javascript">alert("xss");</script>' });
  });
});
