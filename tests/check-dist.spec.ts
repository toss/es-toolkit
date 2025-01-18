import { describe, expect, it } from 'vitest';
import { execa } from 'execa';
import fs from 'node:fs';
import path from 'node:path';
import { Readable } from 'node:stream';
import { createPackageTarball } from './utils/createPackageTarball';
import { createTmpDir } from './utils/createTmpDir';
import { parseTar } from './utils/parseTar';
import { streamToBuffer } from './utils/streamToBuffer';

async function getPackageJsonOfTarball() {
  const tarball = await createPackageTarball();

  for await (const entry of parseTar(await fs.promises.readFile(tarball.path))) {
    if (entry.path === 'package/package.json') {
      const json = (await streamToBuffer(entry as unknown as Readable)).toString('utf-8');

      return JSON.parse(json);
    }
  }

  throw new Error(`package.json not found.`);
}

const ENTRYPOINTS = [
  '.',
  './array',
  './compat',
  './error',
  './function',
  './math',
  './object',
  './predicate',
  './promise',
  './string',
  './util',
];

describe(`es-toolkit's package tarball`, () => {
  it(
    'configures all entrypoints correctly',
    async () => {
      const packageJson = await getPackageJsonOfTarball();
      const entrypoints = Object.keys(packageJson.exports);

      expect(entrypoints).toEqual([...ENTRYPOINTS, './package.json']);
    },
    { timeout: 120_000 }
  );

  it(
    'exports identical functions in CJS and ESM',
    async () => {
      const tarball = await createPackageTarball();
      const tmpdir = await createTmpDir();

      const packageJson = {
        dependencies: {
          'es-toolkit': tarball.path,
        },
      };

      await fs.promises.writeFile(path.join(tmpdir, 'package.json'), JSON.stringify(packageJson, null, 2));
      await execa('npm', ['install'], { cwd: tmpdir });

      for (const entrypoint of ENTRYPOINTS) {
        const cjsScript = `
const toolkit = require("${path.join('es-toolkit', entrypoint)}");

const exported = Object.entries(toolkit)
  .map(([k, v]) => [k, typeof v])
  .sort((x, y) => x[0].localeCompare(y[0]));

console.log("${path.join('es-toolkit', entrypoint)}");
console.log(exported);
      `.trim();
        const cjsScriptPath = path.join(tmpdir, 'script.cjs');

        const esmScript = `
const toolkit = await import("${path.join('es-toolkit', entrypoint)}");

const exported = Object.entries(toolkit)
  .map(([k, v]) => [k, typeof v])
  .sort((x, y) => x[0].localeCompare(y[0]));

console.log("${path.join('es-toolkit', entrypoint)}");
console.log(exported);
      `.trim();
        const esmScriptPath = path.join(tmpdir, 'script.mjs');

        await fs.promises.writeFile(cjsScriptPath, cjsScript);
        await fs.promises.writeFile(esmScriptPath, esmScript);

        const cjsResult = await execa('node', [cjsScriptPath]);
        const esmResult = await execa('node', [esmScriptPath]);

        expect(cjsResult.stdout).toEqual(esmResult.stdout);
      }
    },
    { timeout: 60_000 }
  );
});
