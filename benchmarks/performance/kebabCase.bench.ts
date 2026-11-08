import { kebabCase as kebabCaseToolkit } from 'es-toolkit';
import { kebabCase as kebabCaseToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('kebabCase', () => {
  bench('es-toolkit/kebabCase', () => {
    do_not_optimize(kebabCaseToolkit('hello world'));
    do_not_optimize(kebabCaseToolkit('--foo--bar__baz 123'));
    do_not_optimize(kebabCaseToolkit('123numericValues'));
    do_not_optimize(kebabCaseToolkit('XMLHttpRequest'));
    do_not_optimize(kebabCaseToolkit('hello-World_of XML_httpRequest'));
  });

  bench('es-toolkit/compat/kebabCase', () => {
    do_not_optimize(kebabCaseToolkitCompat('hello world'));
    do_not_optimize(kebabCaseToolkitCompat('--foo--bar__baz 123'));
    do_not_optimize(kebabCaseToolkitCompat('123numericValues'));
    do_not_optimize(kebabCaseToolkitCompat('XMLHttpRequest'));
    do_not_optimize(kebabCaseToolkitCompat('hello-World_of XML_httpRequest'));
  });

  bench('lodash/kebabCase', () => {
    do_not_optimize(lodash.kebabCase('hello world'));
    do_not_optimize(lodash.kebabCase('--foo--bar__baz 123'));
    do_not_optimize(lodash.kebabCase('123numericValues'));
    do_not_optimize(lodash.kebabCase('XMLHttpRequest'));
    do_not_optimize(lodash.kebabCase('hello-World_of XML_httpRequest'));
  });
});
