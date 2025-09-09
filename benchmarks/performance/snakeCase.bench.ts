import { bench, describe } from 'vitest';
import { snakeCase as snakeCaseToolkit_ } from 'es-toolkit';
import { snakeCase as snakeCaseToolkitCompat_ } from 'es-toolkit/compat';
import { snakeCase as snakeCaseLodash_ } from 'lodash';

const snakeCaseToolkit = snakeCaseToolkit_;
const snakeCaseToolkitCompat = snakeCaseToolkitCompat_;
const snakeCaseLodash = snakeCaseLodash_;

describe('snakeCase', () => {
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
    snakeCaseLodash('hello world');
    snakeCaseLodash('--foo--bar__baz 123');
    snakeCaseLodash('123numericValues');
    snakeCaseLodash('XMLHttpRequest');
    snakeCaseLodash('hello-World_of XML_httpRequest');
  });
});
