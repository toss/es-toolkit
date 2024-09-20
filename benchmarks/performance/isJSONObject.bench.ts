import { bench, describe } from 'vitest';
import { isJSONObject as isJSONObjectToolkit } from 'es-toolkit';

describe('isJSONObject', () => {
  bench('es-toolkit/isJSONObject', () => {
    isJSONObjectToolkit({ nested: { boolean: true, array: [1, 2, 3], string: 'test', null: null } });
    isJSONObjectToolkit({ date: new Date() });
    isJSONObjectToolkit({ nested: { a: function* () {} } });
    isJSONObjectToolkit(undefined);
    isJSONObjectToolkit(/test/);
  });
});
