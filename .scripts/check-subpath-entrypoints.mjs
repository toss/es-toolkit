// Imports every per-function entry point (`es-toolkit/<category>/<fn>`) in both ESM and CJS
// through the published "exports" map, and fails the build if any of them cannot be loaded,
// or exports a value that differs from the one in its category entry (`es-toolkit/<category>`).
// It also checks that the subdirectories of each category, which hold internal modules, are
// unreachable (excluded with a `null` export).
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const rootDir = fileURLToPath(new URL('..', import.meta.url));
const { publishConfig } = JSON.parse(readFileSync(path.join(rootDir, 'package.json'), 'utf8'));

// Lay out the package as it is published, so that specifiers resolve through
// `publishConfig.exports` rather than the source-pointing "exports" used in development.
const tempDir = mkdtempSync(path.join(tmpdir(), 'es-toolkit-subpaths-'));
const packageDir = path.join(tempDir, 'node_modules', 'es-toolkit');
const loaderPath = path.join(tempDir, 'loader.mjs');

mkdirSync(packageDir, { recursive: true });
writeFileSync(
  path.join(packageDir, 'package.json'),
  JSON.stringify({ name: 'es-toolkit', exports: publishConfig.exports })
);
symlinkSync(path.join(rootDir, 'dist'), path.join(packageDir, 'dist'), 'dir');
writeFileSync(loaderPath, 'export const load = specifier => import(specifier);\n');

const { load } = await import(pathToFileURL(loaderPath).href);
const require = createRequire(loaderPath);

const broken = [];
let count = 0;

try {
  for (const [key, target] of Object.entries(publishConfig.exports)) {
    const category = key.match(/^\.\/([^/]+)\/\*$/)?.[1];

    // Skip `compat/*` (served by generated shims, see check-compat-entrypoints-loadable.mjs)
    // and declaration-only categories such as `types`, which have nothing to load at runtime.
    if (category === undefined || target.import.default !== `./dist/${category}/*.mjs`) {
      continue;
    }

    const esmBarrel = await load(`es-toolkit/${category}`);
    const cjsBarrel = require(`es-toolkit/${category}`);

    const categoryDir = path.join(rootDir, 'dist', category);

    for (const entry of readdirSync(categoryDir, { withFileTypes: true })) {
      if (entry.isFile() && entry.name.endsWith('.mjs') && entry.name !== 'index.mjs') {
        await checkEntryPoint(`es-toolkit/${category}/${entry.name.slice(0, -'.mjs'.length)}`, esmBarrel, cjsBarrel);
      }

      // Subdirectories hold internal modules, which must be excluded with a `null` export.
      if (entry.isDirectory()) {
        const file = readdirSync(path.join(categoryDir, entry.name), { recursive: true }).find(file =>
          file.endsWith('.mjs')
        );
        await checkNotExported(`es-toolkit/${category}/${entry.name}/${file.slice(0, -'.mjs'.length)}`);
      }
    }
  }
} finally {
  rmSync(tempDir, { recursive: true, force: true });
}

if (broken.length > 0) {
  console.error(`Found ${broken.length} broken per-function entry point(s):`);
  console.error(broken.join('\n'));
  process.exit(1);
}

console.log(`Verified ${count} per-function entry points (ESM + CJS).`);

async function checkEntryPoint(specifier, esmBarrel, cjsBarrel) {
  count++;

  try {
    checkModule(await load(specifier), esmBarrel);
  } catch (error) {
    broken.push(`${specifier} (ESM): ${error.message.split('\n')[0]}`);
  }

  try {
    checkModule(require(specifier), cjsBarrel);
  } catch (error) {
    broken.push(`${specifier} (CJS): ${error.message.split('\n')[0]}`);
  }
}

async function checkNotExported(specifier) {
  for (const [format, loadModule] of [
    ['ESM', () => load(specifier)],
    ['CJS', () => require(specifier)],
  ]) {
    try {
      await loadModule();
      broken.push(`${specifier} (${format}): internal module is exported`);
    } catch (error) {
      // The module exists on disk, so failing to resolve it means it is not exported.
      // Yarn's PnP runtime (preloaded under `yarn build`) reports this as MODULE_NOT_FOUND.
      if (error.code !== 'ERR_PACKAGE_PATH_NOT_EXPORTED' && error.code !== 'MODULE_NOT_FOUND') {
        broken.push(`${specifier} (${format}): ${error.message.split('\n')[0]}`);
      }
    }
  }
}

function checkModule(mod, barrel) {
  // Some modules also export internal helpers (e.g. `partialImpl`), which the category entry
  // does not re-export. Only the public exports are compared.
  const keys = Object.keys(mod).filter(key => key in barrel);

  if (keys.length === 0) {
    throw new Error('exports nothing from the category entry');
  }

  for (const key of keys) {
    if (mod[key] !== barrel[key]) {
      throw new Error(`\`${key}\` differs from the category entry`);
    }
  }
}
