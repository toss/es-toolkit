// Runs es-toolkit/compat on Node.js 6. Execute this file with a Node.js 6
// binary after `yarn workspace browser-compat-tests build:node6`:
//
//   node tests/browser-compat/dist-fixtures/node6/run.cjs
//
// Written in ES2015-compatible CommonJS on purpose, so that any failure can be
// attributed to es-toolkit rather than to this runner.
//
// 1. Loads every `compat/<name>.js` entry point and the `es-toolkit/compat`
//    root, which pulls in the whole compat dependency graph. A SyntaxError or
//    ReferenceError here means a file in that graph uses syntax or a global
//    that Node.js 6 does not have.
// 2. Runs every generated `@example` case of the compat namespace against the
//    untranspiled dist.
'use strict';

var fs = require('fs');
var path = require('path');

var PACKAGE_ROOT = path.resolve(__dirname, '../../../..');
var TIMEOUT_MS = 5000;

var major = Number(process.versions.node.split('.')[0]);
if (major !== 6) {
  console.error('This runner must be executed with Node.js 6 (got ' + process.version + ').');
  process.exit(1);
}

// --- 1. entry points ------------------------------------------------------

var entryFailures = [];
var compatDir = path.join(PACKAGE_ROOT, 'compat');
var entries = fs.readdirSync(compatDir).filter(function (name) {
  return /\.js$/.test(name);
});

entries.forEach(function (name) {
  try {
    if (require(path.join(compatDir, name)) === undefined) {
      entryFailures.push({ entry: name, error: 'module.exports is undefined' });
    }
  } catch (error) {
    entryFailures.push({ entry: name, error: String(error).split('\n')[0] });
  }
});

try {
  require(path.join(PACKAGE_ROOT, 'compat.js'));
} catch (error) {
  entryFailures.push({ entry: 'compat.js', error: String(error).split('\n')[0] });
}

if (entryFailures.length > 0) {
  console.error(
    entryFailures.length +
      ' of ' +
      (entries.length + 1) +
      ' compat entry points failed to load on ' +
      process.version +
      ':'
  );
  entryFailures.forEach(function (failure) {
    console.error('  ' + failure.entry + ': ' + failure.error);
  });
  process.exit(1);
}
console.log('All ' + (entries.length + 1) + ' compat entry points load on ' + process.version + '.');

// --- 2. @example cases ----------------------------------------------------

var generated = require('./cases.cjs');
var manualCases = require('./manual-cases.cjs').manualCases;
var assertEq = require('./assert.cjs').assertEq;
var skipList = require('./skip-list.json');

var cases = generated.cases.concat(manualCases).filter(function (testCase) {
  if (!/^(compat:|manual:compat)/.test(testCase.id)) {
    return false;
  }
  if (testCase.browserOnly) {
    return false;
  }
  return skipList.node6Skip == null || skipList.node6Skip[testCase.id] == null;
});

var results = [];
var index = 0;

function runNext() {
  if (index >= cases.length) {
    return report();
  }

  var testCase = cases[index++];
  var settled = false;
  var timer = setTimeout(function () {
    finish(false, 'timed out after ' + TIMEOUT_MS + 'ms');
  }, TIMEOUT_MS);

  function finish(ok, error) {
    if (settled) {
      return;
    }
    settled = true;
    clearTimeout(timer);
    results.push({ id: testCase.id, ok: ok, error: error });
    runNext();
  }

  try {
    var value = testCase.run(generated.namespaces, assertEq);
    if (value != null && typeof value.then === 'function') {
      value.then(
        function () {
          finish(true);
        },
        function (error) {
          finish(false, String(error).split('\n')[0]);
        }
      );
    } else {
      finish(true);
    }
  } catch (error) {
    finish(false, String(error).split('\n')[0]);
  }
}

function report() {
  var failures = results.filter(function (result) {
    return !result.ok;
  });

  console.log(
    results.length - failures.length + '/' + results.length + ' compat cases passed on ' + process.version + '.'
  );

  if (failures.length > 0) {
    failures.forEach(function (failure) {
      console.error('FAIL ' + failure.id + '\n  ' + failure.error);
    });
    process.exit(1);
  }
}

// Examples that intentionally fire delayed callbacks can throw after their
// case has completed; report those instead of crashing the whole run.
process.on('uncaughtException', function (error) {
  console.error('ASYNC-FAIL: ' + String(error).split('\n')[0]);
  process.exitCode = 1;
});

runNext();
