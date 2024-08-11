import { startCase as startCaseToolkit } from 'es-toolkit';
import { startCase as startCaseLodash } from 'lodash';
import { bench, describe } from 'vitest';

describe('startCase', () => {
  bench('es-toolkit/startCase', () => {
    startCaseToolkit('hello world');
    startCaseToolkit('--foo--bar__baz 123');
    startCaseToolkit('123numericValues');
    startCaseToolkit('XMLHttpRequest');
    startCaseToolkit('hello-World_of XML_httpRequest');
  });

  bench('lodash/startCase', () => {
    startCaseLodash('hello world');
    startCaseLodash('--foo--bar__baz 123');
    startCaseLodash('123numericValues');
    startCaseLodash('XMLHttpRequest');
    startCaseLodash('hello-World_of XML_httpRequest');
  });
});
