import { kebabCase as kebabCaseToolkit } from 'es-toolkit';
import { kebabCase as kebabCaseToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('kebabCase', () => {
  bench('es-toolkit/kebabCase', () => {
    kebabCaseToolkit('hello world');
    kebabCaseToolkit('--foo--bar__baz 123');
    kebabCaseToolkit('123numericValues');
    kebabCaseToolkit('XMLHttpRequest');
    kebabCaseToolkit('hello-World_of XML_httpRequest');
  });

  bench('es-toolkit/compat/kebabCase', () => {
    kebabCaseToolkitCompat('hello world');
    kebabCaseToolkitCompat('--foo--bar__baz 123');
    kebabCaseToolkitCompat('123numericValues');
    kebabCaseToolkitCompat('XMLHttpRequest');
    kebabCaseToolkitCompat('hello-World_of XML_httpRequest');
  });

  bench('lodash/kebabCase', () => {
    lodash.kebabCase('hello world');
    lodash.kebabCase('--foo--bar__baz 123');
    lodash.kebabCase('123numericValues');
    lodash.kebabCase('XMLHttpRequest');
    lodash.kebabCase('hello-World_of XML_httpRequest');
  });
});
