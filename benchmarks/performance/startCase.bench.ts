import { startCase as startCaseToolkit } from 'es-toolkit';
import { startCase as startCaseToolkitCompat } from 'es-toolkit/compat';
import lodash from 'lodash';
import { bench, group } from './harness.ts';

group('startCase', () => {
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
    lodash.startCase('hello world');
    lodash.startCase('--foo--bar__baz 123');
    lodash.startCase('123numericValues');
    lodash.startCase('XMLHttpRequest');
    lodash.startCase('hello-World_of XML_httpRequest');
  });
});
