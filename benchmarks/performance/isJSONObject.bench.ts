import { isJSONObject as isJSONObjectToolkit } from 'es-toolkit';
import { bench, do_not_optimize, group } from './harness.ts';

group('isJSONObject', () => {
  bench('es-toolkit/isJSONObject', () => {
    do_not_optimize(isJSONObjectToolkit({ nested: { boolean: true, array: [1, 2, 3], string: 'test', null: null } }));
    do_not_optimize(isJSONObjectToolkit({ date: new Date() }));
    do_not_optimize(isJSONObjectToolkit({ nested: { a: function* () {} } }));
    do_not_optimize(isJSONObjectToolkit(undefined));
    do_not_optimize(isJSONObjectToolkit(/test/));
  });
});
