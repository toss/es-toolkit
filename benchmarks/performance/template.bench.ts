import { bench, describe } from 'vitest';
import { template as templateToolkit } from 'es-toolkit/compat';
import lodash from 'lodash';

const { template: templateLodash } = lodash;

describe('template (interpolate)', () => {
  bench('es-toolkit/template', () => {
    const compiled = templateToolkit('hello <%= user %>!');

    compiled({ user: 'fred' });
    compiled({ user: 'pebbles' });
  });

  bench('lodash/template', () => {
    const compiled = templateLodash('hello <%= user %>!');
    compiled({ user: 'fred' });
    compiled({ user: 'pebbles' });
  });
});

describe('template (evaluate)', () => {
  bench('es-toolkit/template', () => {
    const compiled = templateToolkit('<% if (user === "fred") { %>hello fred!<% } else { %>hello pebbles!<% } %>');
    compiled({ user: 'fred' });
    compiled({ user: 'pebbles' });
  });

  bench('lodash/template', () => {
    const compiled = templateLodash('<% if (user === "fred") { %>hello fred!<% } else { %>hello pebbles!<% } %>');
    compiled({ user: 'fred' });
    compiled({ user: 'pebbles' });
  });
});

describe('template (escape)', () => {
  bench('es-toolkit/template', () => {
    const compiled = templateToolkit('<%- user %>');

    compiled({ user: '<script>' });
    compiled({ user: '<script type="text/javascript">alert("xss");</script>' });
  });

  bench('lodash/template', () => {
    const compiled = templateLodash('<%- user %>');
    compiled({ user: '<script>' });
    compiled({ user: '<script type="text/javascript">alert("xss");</script>' });
  });
});
