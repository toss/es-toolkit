import { deepStrictEqual, doesNotThrow } from 'node:assert';
import path from 'node:path';
import { describe, test } from 'node:test';
import { createRequire } from 'node:module';

const rootDir = path.resolve(import.meta.dirname, '..');
const require = createRequire(import.meta.url);
const { publishConfig } = require('../package.json');

const entrypoints = getEntrypoints(rootDir, publishConfig.exports);

test('all entrypoints are configured', () => {
  deepStrictEqual(
    entrypoints.map(entry => entry.name),
    [
      'es-toolkit',
      'es-toolkit/array',
      'es-toolkit/compat',
      'es-toolkit/function',
      'es-toolkit/math',
      'es-toolkit/object',
      'es-toolkit/predicate',
      'es-toolkit/promise',
      'es-toolkit/string',
    ]
  );
});

for (const { name, importFullPath, requireFullPath } of entrypoints) {
  describe(`entrypoint: ${name}`, () => {
    test(`can import esm`, async () => {
      doesNotThrow(async () => await import(importFullPath));
    });

    test(`can require cjs`, async () => {
      doesNotThrow(() => require(requireFullPath));
    });

    test(`identical esm and cjs export names`, async () => {
      const esm = await import(importFullPath);
      const cjs = require(requireFullPath);
      const esmMap = objTypeMap(esm);
      const cjsMap = objTypeMap(cjs);
      deepStrictEqual(esmMap, cjsMap);
    });
  });
}

function getEntrypoints(baseDir = '', exports = {}) {
  const entrypoints = [];
  for (const [key, config] of Object.entries(exports)) {
    if (
      key.includes('.json') ||
      typeof config?.import?.default !== 'string' ||
      typeof config?.require?.default !== 'string'
    ) {
      continue;
    }

    entrypoints.push({
      name: key.replace(/^\./, 'es-toolkit'),
      importFullPath: path.resolve(baseDir, config.import.default),
      requireFullPath: path.resolve(baseDir, config.require.default),
    });
  }

  entrypoints.sort((a, b) => (a.name > b.name ? 1 : -1));
  return entrypoints;
}

function objTypeMap(obj) {
  return Object.fromEntries(
    Object.keys(obj)
      .sort()
      .map(key => [key, typeof obj[key]])
  );
}
