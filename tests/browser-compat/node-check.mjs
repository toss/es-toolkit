/**
 * Runs every generated case in Node before any browser is involved.
 *
 * This validates that the `@example` harvesting produced correct, runnable
 * assertions; a case that fails here indicates a generator bug, an outdated
 * example, or an environment-dependent example that belongs in
 * `skip-list.json`.
 */
import fs from 'node:fs';
import { cases as generatedCases, namespaces } from './generated/cases.mjs';
import { assertEq } from './harness/assert.mjs';
import { manualCases } from './manual-cases.mjs';

const cases = [...generatedCases, ...manualCases];

const TIMEOUT_MS = 5_000;

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(`timed out after ${ms}ms`)), ms).unref?.()),
  ]);
}

let failures = 0;
const slow = [];
const failureList = [];
let currentId = null;

// Examples that intentionally fire delayed callbacks can throw after their
// case has completed; capture those instead of crashing the whole run.
process.on('uncaughtException', error => {
  console.error(`ASYNC-FAIL (around ${currentId}): ${String(error).split('\n')[0]}`);
});
process.on('unhandledRejection', error => {
  console.error(`ASYNC-REJECT (around ${currentId}): ${String(error).split('\n')[0]}`);
});

let browserOnly = 0;

for (const testCase of cases) {
  currentId = testCase.id;
  if (testCase.browserOnly) {
    browserOnly++;
    continue;
  }
  if (process.env.DEBUG_CASES) {
    console.error(`RUN ${testCase.id}`);
  }
  const started = Date.now();
  try {
    if (testCase.async) {
      await withTimeout(testCase.run(namespaces, assertEq), TIMEOUT_MS);
    } else {
      testCase.run(namespaces, assertEq);
    }
    const elapsed = Date.now() - started;
    if (elapsed > 500) {
      slow.push({ id: testCase.id, elapsed });
    }
  } catch (error) {
    failures++;
    failureList.push({ id: testCase.id, error: String(error).split('\n')[0] });
    console.error(`FAIL ${testCase.id}\n  ${String(error).split('\n')[0]}`);
  }
}

fs.writeFileSync(
  new URL('./generated/node-check-failures.json', import.meta.url),
  JSON.stringify(failureList, null, 2)
);

// Completeness gate: every exported function of the public namespaces must be
// exercised by at least one case, or be explicitly listed with a reason in
// skip-list.json's `uncoveredExports`.
const skipList = JSON.parse(fs.readFileSync(new URL('./skip-list.json', import.meta.url), 'utf8'));
const bound = { main: new Set(), compat: new Set(), fp: new Set() };
for (const testCase of cases) {
  const source = testCase.run.toString();
  for (const match of source.matchAll(/const \{ ([^}]+) \} = __ns\.(\w+);/g)) {
    const nsName = match[2] === 'compat' ? 'compat' : match[2] === 'fp' ? 'fp' : 'main';
    for (const name of match[1].split(',').map(s => s.trim())) {
      bound[nsName].add(name);
    }
  }
}
const uncovered = [];
for (const nsName of ['main', 'compat', 'fp']) {
  const ns = namespaces[nsName];
  for (const exportName of Object.keys(ns)) {
    if (exportName === 'default' || typeof ns[exportName] !== 'function') {
      continue;
    }
    if (!bound[nsName].has(exportName) && skipList.uncoveredExports[`${nsName}:${exportName}`] == null) {
      uncovered.push(`${nsName}:${exportName}`);
    }
  }
}
if (uncovered.length > 0) {
  console.error(`\n${uncovered.length} exports have no test case (add a case or list them in skip-list.json):`);
  console.error(`  ${uncovered.join(' ')}`);
  process.exitCode = 1;
}

if (slow.length > 0) {
  console.log(`\nslow cases (>500ms):`);
  for (const s of slow) {
    console.log(`  ${s.id}: ${s.elapsed}ms`);
  }
}

console.log(
  `\n${cases.length - failures - browserOnly}/${cases.length - browserOnly} cases passed in Node (${browserOnly} browser-only skipped)`
);
if (failures > 0) {
  process.exitCode = 1;
}
