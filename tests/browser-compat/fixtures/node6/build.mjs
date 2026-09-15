// Node.js 6 fixture for es-toolkit/compat.
//
// es-toolkit/compat is published for Node.js 6+ as-is: no transpilation and
// no polyfills (docs/browser-support.md). The dist therefore runs untouched;
// only the generated cases are transpiled (their @example sources use modern
// syntax) so that Node.js 6 can parse them.
//
// Output: dist-fixtures/node6/{cases,manual-cases,assert}.cjs, consumed by
// run.cjs, which must be executed with a real Node.js 6 binary.
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import babel from '@babel/core';
import presetEnv from '@babel/preset-env';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(import.meta.dirname, '../..');
const OUT_DIR = path.join(ROOT, 'dist-fixtures/node6');

fs.rmSync(OUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

function transpile(file, rewrite = source => source) {
  const source = rewrite(fs.readFileSync(file, 'utf8'));
  const { code } = babel.transformSync(source, {
    filename: file,
    babelrc: false,
    configFile: false,
    compact: false,
    presets: [[presetEnv, { targets: { node: '6' }, modules: 'commonjs' }]],
  });
  return code;
}

// Only the compat namespace is loaded on Node.js 6; the main library is not
// supported there, so its namespaces become empty objects (their cases are
// filtered out by run.cjs anyway).
const compatEntry = path.relative(OUT_DIR, path.join(ROOT, '../../compat.js'));
const casesSource = transpile(path.join(ROOT, 'generated/cases-legacy.mjs'), source =>
  source.replace(/^import \* as (\w+) from '\.\.\/\.\.\/\.\.\/dist\/([^']+)\.mjs';$/gm, (_, id, entry) =>
    entry === 'compat/index' ? `const ${id} = require(${JSON.stringify(compatEntry)});` : `const ${id} = {};`
  )
);

fs.writeFileSync(path.join(OUT_DIR, 'cases.cjs'), casesSource);
fs.writeFileSync(path.join(OUT_DIR, 'manual-cases.cjs'), transpile(path.join(ROOT, 'manual-cases.mjs')));
fs.writeFileSync(path.join(OUT_DIR, 'assert.cjs'), transpile(path.join(ROOT, 'harness/assert.mjs')));
fs.copyFileSync(path.join(ROOT, 'skip-list.json'), path.join(OUT_DIR, 'skip-list.json'));
fs.copyFileSync(path.join(import.meta.dirname, 'run.cjs'), path.join(OUT_DIR, 'run.cjs'));

// Sanity check: the transpiled cases must still be parseable by the current Node.
require(path.join(OUT_DIR, 'assert.cjs'));
console.log(`node6 fixture written to ${path.relative(ROOT, OUT_DIR)}`);
