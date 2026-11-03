import { beforeAll, describe, expect, it } from 'vitest';
import { execa } from 'execa';
import fs from 'node:fs';
import path from 'node:path';
import { Fixture, type FixturePlugin } from '@fixture-kit/core';
import { createPackageTarball } from './utils/createPackageTarball';

// Entrypoints that can be loaded from the package.
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

interface InstalledPackage {
  fixture: Fixture;
  /** `node_modules/es-toolkit` inside the fixture. */
  packageDir: string;
}

/**
 * Installs the packed `es-toolkit` tarball into a fresh fixture directory, so that `run` can load
 * the package exactly as users do: through npm, `node_modules`, and the published `exports`.
 * The fixture directory is removed afterwards, even if `run` fails.
 * (`await using` is not used because Prettier's import-sorting plugin cannot parse it yet.)
 */
async function withPackage<T>(tarballPath: string, run: (installed: InstalledPackage) => Promise<T>) {
  const fixture = await Fixture.create(
    {
      'package.json': JSON.stringify({ dependencies: { 'es-toolkit': tarballPath } }, null, 2),
    },
    { plugins: [npmInstall()] }
  );

  try {
    return await run({ fixture, packageDir: path.join(fixture.root, 'node_modules', 'es-toolkit') });
  } finally {
    await fixture.cleanup();
  }
}

function npmInstall(): FixturePlugin {
  return {
    async setup({ root }) {
      await execa('npm', ['install'], { cwd: root });
    },
  };
}

/**
 * Writes a script into the fixture and runs it with plain Node.js. Yarn's PnP hooks (injected
 * through NODE_OPTIONS under `yarn vitest`) are dropped so that resolution behaves as it does for
 * users. The script must print a single JSON value, which is returned parsed.
 */
async function runScript(fixture: Fixture, filename: string, source: string) {
  const scriptPath = path.join(fixture.root, filename);
  await fs.promises.writeFile(scriptPath, source.trim());

  const { stdout } = await execa('node', [scriptPath], { cwd: fixture.root, env: { NODE_OPTIONS: '' } });

  return JSON.parse(stdout);
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

  return path.posix.join('es-toolkit', entrypoint.replace('*', module.name.slice(0, -'.mjs'.length)));
}

describe(`es-toolkit's package tarball`, () => {
  let tarball: { path: string };

  beforeAll(async () => {
    tarball = await createPackageTarball();
  }, 300000);

  it('configures all entrypoints correctly', { timeout: 240_000 }, async () => {
    await withPackage(tarball.path, async ({ packageDir }) => {
      const packageJson = JSON.parse(await fs.promises.readFile(path.join(packageDir, 'package.json'), 'utf-8'));
      const entrypoints = Object.keys(packageJson.exports);

      const exported = entrypoints.filter(entrypoint => packageJson.exports[entrypoint] !== null);
      const blocked = entrypoints.filter(entrypoint => packageJson.exports[entrypoint] === null);

      expect(exported).toEqual([...ENTRYPOINTS, './package.json']);
      expect(blocked).toEqual(BLOCKED_ENTRYPOINTS);
    });
  });

  it('can be required and imported from every entrypoint', { timeout: 120_000 }, async () => {
    await withPackage(tarball.path, async ({ fixture, packageDir }) => {
      const packageJson = JSON.parse(await fs.promises.readFile(path.join(packageDir, 'package.json'), 'utf-8'));
      const specifiers: string[] = [];

      for (const entrypoint of ENTRYPOINTS) {
        // `./types` and `./types/*` are declaration-only (no runtime export), so they can't be
        // required or imported. `./compat/*` is served by generated shims whose CJS build exports the
        // function itself (checked by .scripts/check-compat-entrypoints-loadable.mjs at build time),
        // so it can't be compared the same way.
        if (entrypoint.startsWith('./types') || entrypoint === './compat/*') {
          continue;
        }

        // Wildcard entrypoints are exercised through one module that they expose.
        specifiers.push(
          entrypoint.includes('*')
            ? await pickWildcardModule(packageDir, packageJson.exports[entrypoint].import.default, entrypoint)
            : path.posix.join('es-toolkit', entrypoint)
        );
      }

      // Both scripts print `{ [specifier]: [[exportName, typeof export], ...] }`.
      const describeExports = `
  const exported = Object.entries(toolkit)
    .map(([k, v]) => [k, typeof v])
    .sort((x, y) => x[0].localeCompare(y[0]));
      `;

      const cjsExports = await runScript(
        fixture,
        'entrypoints.cjs',
        `
  const result = {};
  for (const specifier of ${JSON.stringify(specifiers)}) {
    const toolkit = require(specifier);
    ${describeExports}
    result[specifier] = exported;
  }
  console.log(JSON.stringify(result));
        `
      );

      const esmExports = await runScript(
        fixture,
        'entrypoints.mjs',
        `
  const result = {};
  for (const specifier of ${JSON.stringify(specifiers)}) {
    const toolkit = await import(specifier);
    ${describeExports}
    result[specifier] = exported;
  }
  console.log(JSON.stringify(result));
        `
      );

      for (const specifier of specifiers) {
        expect(cjsExports[specifier], `${specifier} should export something`).not.toEqual([]);
        expect(cjsExports[specifier], `${specifier} should export the same in CJS and ESM`).toEqual(
          esmExports[specifier]
        );
      }
    });
  });

  it('does not expose internal modules through blocked subpaths', { timeout: 120_000 }, async () => {
    await withPackage(tarball.path, async ({ fixture, packageDir }) => {
      // The modules must exist on disk, so that failing to resolve them proves the `null` export works.
      for (const specifier of BLOCKED_MODULES) {
        const distFile = path.join(packageDir, 'dist', `${specifier.slice('es-toolkit/'.length)}.mjs`);
        expect(fs.existsSync(distFile), `${distFile} should exist`).toBe(true);
      }

      // Both scripts print `{ [specifier]: "loaded" | errorCode }`.
      const cjsResult = await runScript(
        fixture,
        'blocked.cjs',
        `
  const result = {};
  for (const specifier of ${JSON.stringify(BLOCKED_MODULES)}) {
    try {
      require(specifier);
      result[specifier] = 'loaded';
    } catch (error) {
      result[specifier] = error.code;
    }
  }
  console.log(JSON.stringify(result));
        `
      );

      const esmResult = await runScript(
        fixture,
        'blocked.mjs',
        `
  const result = {};
  for (const specifier of ${JSON.stringify(BLOCKED_MODULES)}) {
    try {
      await import(specifier);
      result[specifier] = 'loaded';
    } catch (error) {
      result[specifier] = error.code;
    }
  }
  console.log(JSON.stringify(result));
        `
      );

      const expected = Object.fromEntries(
        BLOCKED_MODULES.map(specifier => [specifier, 'ERR_PACKAGE_PATH_NOT_EXPORTED'])
      );

      expect(cjsResult).toEqual(expected);
      expect(esmResult).toEqual(expected);
    });
  });

  it('does not reach util/hash from any other entrypoint', { timeout: 120_000 }, async () => {
    await withPackage(tarball.path, async ({ fixture, packageDir }) => {
      // Static check: dist modules are unbundled 1:1 with static import strings,
      // so no dist file outside dist/util/hash may reference util/hash.
      const distDir = path.join(packageDir, 'dist');
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
      const loaded = await runScript(
        fixture,
        'isolation.cjs',
        `
  const path = require('node:path');

  require('es-toolkit');
  require('es-toolkit/util');

  const loaded = Object.keys(require.cache).map((p) => p.split(path.sep).join('/'));
  console.log(JSON.stringify(loaded.filter((p) => p.includes('dist/util/hash'))));
        `
      );

      expect(loaded).toEqual([]);
    });
  });
});
