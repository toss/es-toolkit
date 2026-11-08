import { startCase as startCaseToolkit } from 'es-toolkit';
import { startCase as startCaseToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('startCase', () => {
  bench('es-toolkit/startCase', () => {
    do_not_optimize(startCaseToolkit('hello world'));
    do_not_optimize(startCaseToolkit('--foo--bar__baz 123'));
    do_not_optimize(startCaseToolkit('123numericValues'));
    do_not_optimize(startCaseToolkit('XMLHttpRequest'));
    do_not_optimize(startCaseToolkit('hello-World_of XML_httpRequest'));
  });

  bench('es-toolkit/compat/startCase', () => {
    do_not_optimize(startCaseToolkitCompat('hello world'));
    do_not_optimize(startCaseToolkitCompat('--foo--bar__baz 123'));
    do_not_optimize(startCaseToolkitCompat('123numericValues'));
    do_not_optimize(startCaseToolkitCompat('XMLHttpRequest'));
    do_not_optimize(startCaseToolkitCompat('hello-World_of XML_httpRequest'));
  });

  bench('lodash/startCase', () => {
    do_not_optimize(lodash.startCase('hello world'));
    do_not_optimize(lodash.startCase('--foo--bar__baz 123'));
    do_not_optimize(lodash.startCase('123numericValues'));
    do_not_optimize(lodash.startCase('XMLHttpRequest'));
    do_not_optimize(lodash.startCase('hello-World_of XML_httpRequest'));
  });
});
