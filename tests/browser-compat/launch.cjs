/**
 * Runs inside a `mcr.microsoft.com/playwright` container to open the harness
 * page in the container's bundled WebKit and wait for the run to finish.
 *
 * Written as CommonJS targeting the Node version shipped in the oldest image
 * we use (v1.9.2-focal ships Node 14) — no optional chaining, no ESM.
 *
 * Environment:
 *   HARNESS_URL  page to open (the host serves it; container uses host network)
 */
'use strict';

const url = process.env.HARNESS_URL;
if (!url) {
  console.error('HARNESS_URL is required');
  process.exit(1);
}

const statusUrl = new URL('/__status', url).toString();
const TIMEOUT_MS = 240000;

function fetchStatus() {
  return new Promise(function (resolve) {
    const http = require('http');
    const req = http.get(statusUrl, function (res) {
      let body = '';
      res.on('data', function (chunk) {
        body += chunk;
      });
      res.on('end', function () {
        try {
          resolve(JSON.parse(body).done === true);
        } catch (e) {
          resolve(false);
        }
      });
    });
    req.on('error', function () {
      resolve(false);
    });
  });
}

function waitForDone() {
  const started = Date.now();
  return new Promise(function (resolve) {
    function poll() {
      fetchStatus().then(function (done) {
        if (done) {
          resolve(true);
        } else if (Date.now() - started > TIMEOUT_MS) {
          resolve(false);
        } else {
          setTimeout(poll, 1000);
        }
      });
    }
    poll();
  });
}

function loadPlaywright() {
  const candidates = ['playwright', '/usr/lib/node_modules/playwright', '/usr/local/lib/node_modules/playwright'];
  for (let i = 0; i < candidates.length; i++) {
    try {
      return require(candidates[i]);
    } catch (e) {
      // try next
    }
  }
  // The image bundles the browsers (PLAYWRIGHT_BROWSERS_PATH=/ms-playwright)
  // but may not expose the npm package; install it without browser downloads.
  const version = process.env.PLAYWRIGHT_VERSION || 'latest';
  console.log('installing playwright@' + version + ' inside the container...');
  const childProcess = require('child_process');
  const result = childProcess.spawnSync(
    'npm',
    ['install', '--no-save', '--prefix', '/tmp/pwpkg', 'playwright-core@' + version],
    {
      stdio: 'inherit',
      env: Object.assign({}, process.env, { PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD: '1' }),
    }
  );
  if (result.status !== 0) {
    throw new Error('failed to install playwright-core@' + version);
  }
  return require('/tmp/pwpkg/node_modules/playwright-core');
}

async function runWebkit() {
  const playwright = loadPlaywright();
  const browser = await playwright.webkit.launch();
  const page = await browser.newPage();
  page.on('pageerror', function (error) {
    console.error('[pageerror]', String(error));
  });
  console.log('webkit version:', browser.version());
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  const done = await waitForDone();
  await browser.close();
  return done;
}

async function runChrome() {
  // Chrome/Chromium binary mounted into the container at $CHROME_PATH.
  const childProcess = require('child_process');
  const commonArgs = [
    // Surface in-page console output (including uncaught errors) on stderr.
    '--enable-logging=stderr',
    '--disable-gpu',
    '--no-sandbox',
    '--no-first-run',
    '--disable-dev-shm-usage',
    '--user-data-dir=/tmp/browser-compat-profile',
    url,
  ];
  let command = process.env.CHROME_PATH;
  let args;
  if (process.env.CHROME_XVFB === '1') {
    // Pre-59 Chrome has no headless mode; run it headed under Xvfb.
    args = ['-a', command].concat(commonArgs);
    command = 'xvfb-run';
  } else {
    // Old-style headless exits right after page load unless a debugging
    // server keeps it alive.
    args = ['--headless', '--remote-debugging-port=0'].concat(commonArgs);
  }
  const child = childProcess.spawn(command, args, { stdio: 'inherit' });
  const done = await waitForDone();
  child.kill('SIGKILL');
  return done;
}

async function main() {
  const done = process.env.BROWSER === 'chrome' ? await runChrome() : await runWebkit();
  if (!done) {
    console.error('timed out waiting for harness results');
    process.exit(1);
  }
}

main().catch(function (error) {
  console.error(String(error));
  process.exit(1);
});
