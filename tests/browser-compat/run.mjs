/**
 * Orchestrates a browser-compat run:
 *
 *   1. serves the built fixtures (dist-fixtures/<name>/) over HTTP,
 *   2. launches a browser pointed at one fixture,
 *   3. waits for the harness to POST its results to /__results,
 *   4. exits 0 only when every case passed.
 *
 * Browsers:
 *   --browser chromium        spawn $CHROME_PATH directly (no driver)
 *   --browser docker-webkit   run WebKit via Playwright inside $DOCKER_IMAGE
 *   --browser none            just serve (open the URL manually)
 *
 * Usage:
 *   node run.mjs --fixture native --browser chromium
 *   node run.mjs --fixture vite-polyfill --browser docker-webkit
 *   node run.mjs --fixture native --browser none
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';

const args = process.argv.slice(2);
const getArg = name => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] : undefined;
};

const fixture = getArg('fixture') ?? 'native';
const browser = getArg('browser') ?? 'none';
const port = Number(getArg('port') ?? 8765);
const timeoutMs = Number(getArg('timeout') ?? 300_000);

const FIXTURES_DIR = path.resolve(import.meta.dirname, 'dist-fixtures');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

/** @type {{ done: boolean, payload: object | null, loadErrors: string[] }} */
const state = { done: false, payload: null, loadErrors: [] };

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  if (req.method === 'POST' && url.pathname === '/__results') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        if (payload.done) {
          state.done = true;
          state.payload = payload;
        } else if (payload.loadError != null) {
          state.loadErrors.push(payload.loadError);
        }
      } catch {
        state.loadErrors.push(`unparseable result payload: ${body.slice(0, 200)}`);
      }
      res.writeHead(204).end();
    });
    return;
  }
  if (req.method === 'GET' && url.pathname === '/__status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ done: state.done }));
    return;
  }
  // Static files: /<fixture>/... → dist-fixtures/<fixture>/...
  const relative = url.pathname.replace(/^\//, '') || `${fixture}/index.html`;
  const filePath = path.join(FIXTURES_DIR, relative.endsWith('/') ? `${relative}index.html` : relative);
  if (!filePath.startsWith(FIXTURES_DIR) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    const indexPath = path.join(filePath, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.writeHead(200, { 'Content-Type': MIME['.html'] });
      res.end(fs.readFileSync(indexPath));
      return;
    }
    res.writeHead(404).end('not found');
    return;
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] ?? 'application/octet-stream' });
  res.end(fs.readFileSync(filePath));
});

function launchChromium(url) {
  const chromePath = process.env.CHROME_PATH;
  if (!chromePath) {
    throw new Error('CHROME_PATH must point at a Chrome/Chromium binary for --browser chromium');
  }
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'browser-compat-chrome-'));
  const child = spawn(
    chromePath,
    [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      '--no-first-run',
      '--disable-dev-shm-usage',
      `--user-data-dir=${profile}`,
      url,
    ],
    { stdio: 'ignore' }
  );
  return () => child.kill('SIGKILL');
}

function launchDocker(url, mode) {
  const image = process.env.DOCKER_IMAGE;
  if (!image) {
    throw new Error('DOCKER_IMAGE must be set for docker browsers');
  }
  const dockerArgs = [
    'run',
    '--rm',
    '--network',
    'host',
    '--ipc',
    'host',
    '-e',
    `HARNESS_URL=${url}`,
    '-e',
    `PLAYWRIGHT_VERSION=${process.env.PLAYWRIGHT_VERSION ?? ''}`,
    '-v',
    `${path.resolve(import.meta.dirname, 'launch.cjs')}:/launch.cjs:ro`,
  ];
  if (mode === 'chrome') {
    const chromeDir = process.env.CHROME_DIR;
    if (!chromeDir) {
      throw new Error('CHROME_DIR must point at an unpacked chrome-linux directory for --browser docker-chromium');
    }
    dockerArgs.push(
      '-e',
      'BROWSER=chrome',
      '-e',
      'CHROME_PATH=/chrome-linux/chrome',
      '-v',
      `${chromeDir}:/chrome-linux:ro`
    );
  }
  dockerArgs.push(image, 'node', '/launch.cjs');
  const child = spawn('docker', dockerArgs, { stdio: 'inherit' });
  return () => child.kill('SIGKILL');
}

server.listen(port, async () => {
  const url = `http://localhost:${port}/${fixture}/`;
  console.log(`serving dist-fixtures at http://localhost:${port}/ (fixture: ${fixture}, browser: ${browser})`);

  let stop = () => {};
  if (browser === 'chromium') {
    stop = launchChromium(url);
  } else if (browser === 'docker-webkit') {
    stop = launchDocker(url, 'webkit');
  } else if (browser === 'docker-chromium') {
    stop = launchDocker(url, 'chrome');
  } else {
    console.log(`open ${url} manually to run the harness`);
  }

  const started = Date.now();
  while (!state.done && Date.now() - started < timeoutMs) {
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  stop();
  server.close();

  if (!state.done) {
    console.error(`TIMEOUT: no results after ${timeoutMs}ms`);
    if (state.loadErrors.length > 0) {
      console.error(`page load errors:\n  ${state.loadErrors.join('\n  ')}`);
    }
    process.exit(1);
  }

  const { total, failed, userAgent } = state.payload;
  console.log(`\nuserAgent: ${userAgent}`);
  console.log(`${total - failed.length}/${total} cases passed in browser (fixture: ${fixture})`);
  if (state.loadErrors.length > 0) {
    console.error(`page load errors:\n  ${state.loadErrors.join('\n  ')}`);
  }
  if (failed.length > 0) {
    console.error(`\nfailed cases:`);
    for (const failure of failed) {
      console.error(`  ${failure.id}: ${failure.error}`);
    }
    process.exit(1);
  }
  if (state.loadErrors.length > 0) {
    process.exit(1);
  }
});
