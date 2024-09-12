import { bench, describe } from 'vitest';
import { kebabCase as kebabCaseToolkit } from 'es-toolkit';
import { kebabCase as kebabCaseToolkitCompat } from 'es-toolkit/compat';
import { kebabCase as kebabCaseLodash } from 'lodash';

describe('kebabCase', () => {
  bench('es-toolkit/kebabCase', () => {
    kebabCaseToolkit('hello world');
    kebabCaseToolkit('--foo--bar__baz 123');
    kebabCaseToolkit('123numericValues');
    kebabCaseToolkit('XMLHttpRequest');
    kebabCaseToolkit('hello-World_of XML_httpRequest');
  });

  bench('es-toolkit/comapt/kebabCase', () => {
    kebabCaseToolkitCompat('hello world');
    kebabCaseToolkitCompat('--foo--bar__baz 123');
    kebabCaseToolkitCompat('123numericValues');
    kebabCaseToolkitCompat('XMLHttpRequest');
    kebabCaseToolkitCompat('hello-World_of XML_httpRequest');
  });

  bench('lodash/kebabCase', () => {
    kebabCaseLodash('hello world');
    kebabCaseLodash('--foo--bar__baz 123');
    kebabCaseLodash('123numericValues');
    kebabCaseLodash('XMLHttpRequest');
    kebabCaseLodash('hello-World_of XML_httpRequest');
  });
});
