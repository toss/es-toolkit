import { bench, describe } from 'vitest';
import { isJSONString as isJSONStringToolkit } from 'es-toolkit';

describe('isJSONString', () => {
  bench('es-toolkit/isJSONString', () => {
    isJSONStringToolkit('{"name": "John", "age": 30}');
    isJSONStringToolkit('[1, 2, 3]');
    isJSONStringToolkit({ name: 'John', age: 30 });
    isJSONStringToolkit(undefined);
    isJSONStringToolkit('1');
  });
});
