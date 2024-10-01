import { startCase as startCaseToolkit_ } from 'es-toolkit';
import { startCase as startCaseToolkitCompat_ } from 'es-toolkit/compat';
import { startCase as startCaseLodash_ } from 'lodash';
import { bench, describe } from 'vitest';

const startCaseToolkit = startCaseToolkit_;
const startCaseToolkitCompat = startCaseToolkitCompat_;
const startCaseLodash = startCaseLodash_;

describe('startCase', () => {
  bench('es-toolkit/startCase', () => {
    startCaseToolkit('hello world');
    startCaseToolkit('--foo--bar__baz 123');
    startCaseToolkit('123numericValues');
    startCaseToolkit('XMLHttpRequest');
    startCaseToolkit('hello-World_of XML_httpRequest');
  });

  bench('es-toolkit/compat/startCase', () => {
    startCaseToolkitCompat('hello world');
    startCaseToolkitCompat('--foo--bar__baz 123');
    startCaseToolkitCompat('123numericValues');
    startCaseToolkitCompat('XMLHttpRequest');
    startCaseToolkitCompat('hello-World_of XML_httpRequest');
  });

  bench('lodash/startCase', () => {
    startCaseLodash('hello world');
    startCaseLodash('--foo--bar__baz 123');
    startCaseLodash('123numericValues');
    startCaseLodash('XMLHttpRequest');
    startCaseLodash('hello-World_of XML_httpRequest');
  });
});
