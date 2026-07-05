import { exec } from 'child_process';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const funcNames = [
  'omit',
  'pick',
  'differenceWith',
  'difference',
  'intersectionWith',
  'intersection',
  'unionBy',
  'union',
  'dropRightWhile',
  'groupBy',
];

const execAsync = promisify(exec);

const filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(filename), '..');
const TEMP_DIR = path.join(ROOT, '.temp');
const OUT_JSON = path.join(ROOT, 'docs', 'data', 'benchmark-results.json');

async function main() {
  await fs.mkdir(TEMP_DIR, { recursive: true });
  await fs.mkdir(path.dirname(OUT_JSON), { recursive: true });

  const packageJsonPath = path.join(ROOT, 'package.json');
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));

  let lodashVersion = 'unknown';
  try {
    const lodashPkgPath = path.join(ROOT, 'node_modules', 'lodash', 'package.json');
    const lodashContent = await fs.readFile(lodashPkgPath, 'utf8');
    const lodashJson = JSON.parse(lodashContent);
    lodashVersion = lodashJson.version;
  } catch {
    console.warn('Could not detect lodash version, using "unknown"');
  }
  const cpus = os.cpus();
  const totalMemoryGB = (os.totalmem() / 1024 ** 3).toFixed(2);

  const allResults = {
    labels: {
      esToolkit: `es-toolkit@${packageJson.version}`,
      lodash: `lodash@${lodashVersion}`,
    },
    environment: {
      node: process.version,
      platform: `${os.platform()} ${os.arch()}`,
      cpu: cpus[0]?.model || 'Unknown',
      cpuCores: cpus.length,
      memory: `${totalMemoryGB} GB`,
    },
    data: {},
  };

  for (const funcName of funcNames) {
    const benchFile = `benchmarks/performance/${funcName}.bench.ts`;
    const tempJsonPath = path.join(TEMP_DIR, `${funcName}.json`);

    console.log(`Running benchmark: ${funcName}`);

    try {
      await execAsync(`yarn vitest bench ${benchFile} --run --reporter=default --outputJson=${tempJsonPath}`, {
        cwd: ROOT,
        maxBuffer: 1024 * 1024 * 10,
      });

      const rawData = await fs.readFile(tempJsonPath, 'utf8');
      const benchData = JSON.parse(rawData);

      const funcData = {};

      if (benchData.files && benchData.files.length > 0) {
        for (const file of benchData.files) {
          if (file.groups && file.groups.length > 0) {
            const firstGroup = file.groups[0];
            for (const bench of firstGroup.benchmarks || []) {
              // skip compatibility benchmarks
              if (bench.name.includes('compat')) {
                continue;
              }

              if (bench.name.includes('lodash')) {
                funcData.lodash = Math.round(bench.hz);
              } else if (bench.name.includes('es-toolkit')) {
                funcData.esToolkit = Math.round(bench.hz);
              }
            }
          }
        }
      }

      allResults.data[funcName] = funcData;

      await fs.unlink(tempJsonPath);

      console.log(`✓ ${funcName} completed\n`);
    } catch (error) {
      console.error(`✗ Failed to run benchmark for ${funcName}:`, error.message);
      allResults.data[funcName] = { error: error.message };
    }
  }

  await fs.writeFile(OUT_JSON, JSON.stringify(allResults, null, 2), 'utf8');
}

main();
