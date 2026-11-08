import { snakeCase as snakeCaseToolkit } from 'es-toolkit';
import { snakeCase as snakeCaseToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('snakeCase', () => {
  bench('es-toolkit/snakeCase', () => {
    snakeCaseToolkit('hello world');
    snakeCaseToolkit('--foo--bar__baz 123');
    snakeCaseToolkit('123numericValues');
    snakeCaseToolkit('XMLHttpRequest');
    snakeCaseToolkit('hello-World_of XML_httpRequest');
  });

  bench('es-toolkit/compat/snakeCase', () => {
    snakeCaseToolkitCompat('hello world');
    snakeCaseToolkitCompat('--foo--bar__baz 123');
    snakeCaseToolkitCompat('123numericValues');
    snakeCaseToolkitCompat('XMLHttpRequest');
    snakeCaseToolkitCompat('hello-World_of XML_httpRequest');
  });

  bench('lodash/snakeCase', () => {
    lodash.snakeCase('hello world');
    lodash.snakeCase('--foo--bar__baz 123');
    lodash.snakeCase('123numericValues');
    lodash.snakeCase('XMLHttpRequest');
    lodash.snakeCase('hello-World_of XML_httpRequest');
  });
});
