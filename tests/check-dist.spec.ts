import { beforeAll, describe, expect, it } from 'vitest';
import { execa } from 'execa';
import fs from 'node:fs';
import path from 'node:path';
import { Readable } from 'node:stream';
import { createPackageTarball } from './utils/createPackageTarball';
import { createTmpDir } from './utils/createTmpDir';
import { parseTar } from './utils/parseTar';
import { streamToBuffer } from './utils/streamToBuffer';

async function getPackageJsonOfTarball(tarballPath: string) {
  for await (const entry of parseTar(await fs.promises.readFile(tarballPath))) {
    if (entry.path === 'package/package.json') {
      const json = (await streamToBuffer(entry as unknown as Readable)).toString('utf-8');

      return JSON.parse(json);
    }
  }

  throw new Error(`package.json not found.`);
}

/**
 * Picks one module served by a wildcard entrypoint such as `./array/*`, e.g. `es-toolkit/array/chunk`,
 * by looking at the files that its ESM target (e.g. `./dist/array/*.mjs`) points to.
 */
async function pickWildcardModule(packageDir: string, esmTarget: string, entrypoint: string) {
  const targetDir = path.join(packageDir, path.dirname(esmTarget));
  const files = await fs.promises.readdir(targetDir, { withFileTypes: true });
  const module = files.find(file => file.isFile() && file.name.endsWith('.mjs') && file.name !== 'index.mjs');

  if (module == null) {
    throw new Error(`No module found for ${entrypoint} in ${targetDir}.`);
  }

  return path.join('es-toolkit', entrypoint.replace('*', module.name.slice(0, -'.mjs'.length)));
}

const ENTRYPOINTS = [
  '.',
  './array',
  './array/*',
  './bigint',
  './bigint/*',
  './compat',
  './compat/*',
  './server',
  './error',
  './error/*',
  './fp',
  './fp/iterator',
  './function',
  './function/*',
  './iterator',
  './iterator/*',
  './map',
  './map/*',
  './math',
  './math/*',
  './object',
  './object/*',
  './predicate',
  './predicate/*',
  './promise',
  './promise/*',
  './query-string',
  './set',
  './set/*',
  './string',
  './string/*',
  './types',
  './types/*',
  './util',
  './util/*',
  './util/hash',
];

// Internal subdirectories are excluded from the package with a `null` export.
// These are disjoint from ENTRYPOINTS, which only lists what can be loaded.
const BLOCKED_ENTRYPOINTS = ['./iterator/_internal/*', './util/hash/*', './util/serialize/*'];

// One module under each blocked subpath. They exist in `dist`, but must not be resolvable.
const BLOCKED_MODULES = [
  'es-toolkit/iterator/_internal/iterator',
  'es-toolkit/util/hash/node',
  'es-toolkit/util/serialize/serialize',
];

describe(`es-toolkit's package tarball`, () => {
  let tarball: { path: string };

  beforeAll(async () => {
    tarball = await createPackageTarball();
  }, 300000);

  it('configures all entrypoints correctly', { timeout: 240_000 }, async () => {
    const packageJson = await getPackageJsonOfTarball(tarball.path);
    const entrypoints = Object.keys(packageJson.exports);

    const exported = entrypoints.filter(entrypoint => packageJson.exports[entrypoint] !== null);
    const blocked = entrypoints.filter(entrypoint => packageJson.exports[entrypoint] === null);

    expect(exported).toEqual([...ENTRYPOINTS, './package.json']);
    expect(blocked).toEqual(BLOCKED_ENTRYPOINTS);
  });

  it('exports identical functions in CJS and ESM', { timeout: 120_000 }, async () => {
    const tmpdir = await createTmpDir();

    const packageJson = {
      dependencies: {
        'es-toolkit': tarball.path,
      },
    };

    await fs.promises.writeFile(path.join(tmpdir, 'package.json'), JSON.stringify(packageJson, null, 2));
    await execa('npm', ['install'], { cwd: tmpdir });

    const packageDir = path.join(tmpdir, 'node_modules', 'es-toolkit');
    const packageJsonOfTarball = await getPackageJsonOfTarball(tarball.path);

    for (const entrypoint of ENTRYPOINTS) {
      // `./types` and `./types/*` are declaration-only (no runtime export), so they can't be
      // required or imported. `./compat/*` is served by generated shims whose CJS build exports the
      // function itself (checked by .scripts/check-compat-entrypoints-loadable.mjs at build time),
      // so it can't be compared the same way.
      if (entrypoint.startsWith('./types') || entrypoint === './compat/*') {
        continue;
      }

      // Wildcard entrypoints are exercised through one module that they expose.
      const specifier = entrypoint.includes('*')
        ? await pickWildcardModule(packageDir, packageJsonOfTarball.exports[entrypoint].import.default, entrypoint)
        : path.join('es-toolkit', entrypoint);

      const cjsScript = `
const toolkit = require("${specifier}");

const exported = Object.entries(toolkit)
  .map(([k, v]) => [k, typeof v])
  .sort((x, y) => x[0].localeCompare(y[0]));

console.log("${specifier}");
console.log(exported);
      `.trim();
      const cjsScriptPath = path.join(tmpdir, 'script.cjs');

      const esmScript = `
const toolkit = await import("${specifier}");

const exported = Object.entries(toolkit)
  .map(([k, v]) => [k, typeof v])
  .sort((x, y) => x[0].localeCompare(y[0]));

console.log("${specifier}");
console.log(exported);
      `.trim();
      const esmScriptPath = path.join(tmpdir, 'script.mjs');

      await fs.promises.writeFile(cjsScriptPath, cjsScript);
      await fs.promises.writeFile(esmScriptPath, esmScript);

      const cjsResult = await execa('node', [cjsScriptPath]);
      const esmResult = await execa('node', [esmScriptPath]);

      expect(cjsResult.stdout).toEqual(esmResult.stdout);
    }
  });

  it('does not expose internal modules through blocked subpaths', { timeout: 120_000 }, async () => {
    const tmpdir = await createTmpDir();

    const packageJson = {
      dependencies: {
        'es-toolkit': tarball.path,
      },
    };

    await fs.promises.writeFile(path.join(tmpdir, 'package.json'), JSON.stringify(packageJson, null, 2));
    await execa('npm', ['install'], { cwd: tmpdir });

    const distDir = path.join(tmpdir, 'node_modules', 'es-toolkit', 'dist');

    // The modules must exist on disk, so that failing to resolve them proves the `null` export works.
    for (const specifier of BLOCKED_MODULES) {
      const distFile = path.join(distDir, `${specifier.slice('es-toolkit/'.length)}.mjs`);
      expect(fs.existsSync(distFile), `${distFile} should exist`).toBe(true);
    }

    const cjsScript = `
for (const specifier of ${JSON.stringify(BLOCKED_MODULES)}) {
  try {
    require(specifier);
    console.log(specifier + ": loaded");
  } catch (error) {
    console.log(specifier + ": " + error.code);
  }
}
    `.trim();
    const cjsScriptPath = path.join(tmpdir, 'blocked.cjs');

    const esmScript = `
for (const specifier of ${JSON.stringify(BLOCKED_MODULES)}) {
  try {
    await import(specifier);
    console.log(specifier + ": loaded");
  } catch (error) {
    console.log(specifier + ": " + error.code);
  }
}
    `.trim();
    const esmScriptPath = path.join(tmpdir, 'blocked.mjs');

    await fs.promises.writeFile(cjsScriptPath, cjsScript);
    await fs.promises.writeFile(esmScriptPath, esmScript);

    const expected = BLOCKED_MODULES.map(specifier => `${specifier}: ERR_PACKAGE_PATH_NOT_EXPORTED`).join('\n');

    // Yarn's PnP hooks (injected through NODE_OPTIONS under `yarn vitest`) report the failure as
    // MODULE_NOT_FOUND, so run plain Node.js to get the error code it gives to users.
    const options = { cwd: tmpdir, env: { NODE_OPTIONS: '' } };
    const cjsResult = await execa('node', [cjsScriptPath], options);
    const esmResult = await execa('node', [esmScriptPath], options);

    expect(cjsResult.stdout).toBe(expected);
    expect(esmResult.stdout).toBe(expected);
  });

  it('does not reach util/hash from any other entrypoint', { timeout: 120_000 }, async () => {
    const tmpdir = await createTmpDir();

    const packageJson = {
      dependencies: {
        'es-toolkit': tarball.path,
      },
    };

    await fs.promises.writeFile(path.join(tmpdir, 'package.json'), JSON.stringify(packageJson, null, 2));
    await execa('npm', ['install'], { cwd: tmpdir });

    // Static check: dist modules are unbundled 1:1 with static import strings,
    // so no dist file outside dist/util/hash may reference util/hash.
    const distDir = path.join(tmpdir, 'node_modules', 'es-toolkit', 'dist');
    const distFiles = (await fs.promises.readdir(distDir, { recursive: true })) as string[];

    for (const file of distFiles) {
      const posixPath = file.split(path.sep).join('/');

      if (posixPath.startsWith('util/hash/') || !/\.(js|mjs|cjs|d\.ts|d\.mts)$/.test(posixPath)) {
        continue;
      }

      const content = await fs.promises.readFile(path.join(distDir, file), 'utf-8');
      expect(content.includes('util/hash'), `dist/${posixPath} must not reference util/hash`).toBe(false);
    }

    // Runtime check: loading the main entrypoints must not load any module
    // under dist/util/hash.
    const script = `
const path = require('node:path');

require('es-toolkit');
require('es-toolkit/util');

const loaded = Object.keys(require.cache).map((p) => p.split(path.sep).join('/'));
if (loaded.some((p) => p.includes('dist/util/hash'))) {
  throw new Error('util/hash was loaded from a main entrypoint');
}
console.log('isolated');
    `.trim();
    const scriptPath = path.join(tmpdir, 'isolation.cjs');
    await fs.promises.writeFile(scriptPath, script);

    const result = await execa('node', [scriptPath], { cwd: tmpdir });
    expect(result.stdout).toBe('isolated');
  });
});
