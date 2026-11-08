import { snakeCase as snakeCaseToolkit } from 'es-toolkit';
import { snakeCase as snakeCaseToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, do_not_optimize, group } from './harness.ts';

group('snakeCase', () => {
  bench('es-toolkit/snakeCase', () => {
    do_not_optimize(snakeCaseToolkit('hello world'));
    do_not_optimize(snakeCaseToolkit('--foo--bar__baz 123'));
    do_not_optimize(snakeCaseToolkit('123numericValues'));
    do_not_optimize(snakeCaseToolkit('XMLHttpRequest'));
    do_not_optimize(snakeCaseToolkit('hello-World_of XML_httpRequest'));
  });

  bench('es-toolkit/compat/snakeCase', () => {
    do_not_optimize(snakeCaseToolkitCompat('hello world'));
    do_not_optimize(snakeCaseToolkitCompat('--foo--bar__baz 123'));
    do_not_optimize(snakeCaseToolkitCompat('123numericValues'));
    do_not_optimize(snakeCaseToolkitCompat('XMLHttpRequest'));
    do_not_optimize(snakeCaseToolkitCompat('hello-World_of XML_httpRequest'));
  });

  bench('lodash/snakeCase', () => {
    do_not_optimize(lodash.snakeCase('hello world'));
    do_not_optimize(lodash.snakeCase('--foo--bar__baz 123'));
    do_not_optimize(lodash.snakeCase('123numericValues'));
    do_not_optimize(lodash.snakeCase('XMLHttpRequest'));
    do_not_optimize(lodash.snakeCase('hello-World_of XML_httpRequest'));
  });
});
