/**
 * Browser test harness. Runs every case and POSTs the results back to the
 * orchestrating server (run.mjs) at `/__results`.
 *
 * Kept intentionally free of APIs newer than ES2015 so that harness failures
 * can always be attributed to es-toolkit, not the harness itself.
 */
import { assertEq } from './assert.mjs';
import { manualCases } from '../manual-cases.mjs';

var TIMEOUT_MS = 10000;

function post(payload) {
  return new Promise(function (resolve) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/__results', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = resolve;
    xhr.onerror = resolve;
    xhr.send(JSON.stringify(payload));
  });
}

function runCase(testCase, namespaces) {
  return new Promise(function (resolve) {
    var settled = false;
    var timer = setTimeout(function () {
      if (!settled) {
        settled = true;
        resolve({ id: testCase.id, ok: false, error: 'timed out after ' + TIMEOUT_MS + 'ms' });
      }
    }, TIMEOUT_MS);
    var finish = function (result) {
      if (!settled) {
        settled = true;
        clearTimeout(timer);
        resolve(result);
      }
    };
    try {
      var value = testCase.run(namespaces, assertEq);
      if (value != null && typeof value.then === 'function') {
        value.then(
          function () {
            finish({ id: testCase.id, ok: true });
          },
          function (error) {
            finish({ id: testCase.id, ok: false, error: String(error) });
          }
        );
      } else {
        finish({ id: testCase.id, ok: true });
      }
    } catch (error) {
      finish({ id: testCase.id, ok: false, error: String(error) });
    }
  });
}

export function start(suite) {
  var namespaces = suite.namespaces;
  // nodeOnly cases need runtime features (e.g. native Iterator helpers) that
  // the browsers under test do not have; they are validated by node-check.mjs.
  var allCases = suite.cases.concat(manualCases).filter(function (testCase) {
    return !testCase.nodeOnly;
  });
  var results = [];
  var index = 0;

  function next() {
    if (index >= allCases.length) {
      var failed = results.filter(function (r) {
        return !r.ok;
      });
      return post({
        fixture: window.__FIXTURE__,
        userAgent: navigator.userAgent,
        total: results.length,
        failed: failed,
        done: true,
      });
    }
    var testCase = allCases[index++];
    return runCase(testCase, namespaces).then(function (result) {
      results.push(result);
      // Yield to the event loop periodically to keep old browsers responsive.
      if (index % 50 === 0) {
        return new Promise(function (resolve) {
          setTimeout(resolve, 0);
        }).then(next);
      }
      return next();
    });
  }

  return next();
}
