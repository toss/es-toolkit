import { bench, describe } from 'vitest';
import { upperSnakeCase as upperSnakeCaseToolkit_ } from 'es-toolkit';
import { snakeCase as snakeCaseLodash_ } from 'lodash';

const upperSnakeCaseToolkit = upperSnakeCaseToolkit_;
const snakeCaseLodash = snakeCaseLodash_;

describe('upperSnakeCase', () => {
  bench('es-toolkit/upperSnakeCase', () => {
    upperSnakeCaseToolkit('hello world');
    upperSnakeCaseToolkit('--foo--bar__baz 123');
    upperSnakeCaseToolkit('123numericValues');
    upperSnakeCaseToolkit('XMLHttpRequest');
    upperSnakeCaseToolkit('hello-World_of XML_httpRequest');
    upperSnakeCaseToolkit('camelCase');
    upperSnakeCaseToolkit('PascalCase');
    upperSnakeCaseToolkit('some whitespace');
    upperSnakeCaseToolkit('hyphen-text');
    upperSnakeCaseToolkit('HTTPRequest');
  });

  bench('lodash/snakeCase + toUpperCase', () => {
    snakeCaseLodash('hello world').toUpperCase();
    snakeCaseLodash('--foo--bar__baz 123').toUpperCase();
    snakeCaseLodash('123numericValues').toUpperCase();
    snakeCaseLodash('XMLHttpRequest').toUpperCase();
    snakeCaseLodash('hello-World_of XML_httpRequest').toUpperCase();
    snakeCaseLodash('camelCase').toUpperCase();
    snakeCaseLodash('PascalCase').toUpperCase();
    snakeCaseLodash('some whitespace').toUpperCase();
    snakeCaseLodash('hyphen-text').toUpperCase();
    snakeCaseLodash('HTTPRequest').toUpperCase();
  });
});
