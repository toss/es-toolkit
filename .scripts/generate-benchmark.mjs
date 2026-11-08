import { execFileSync, execSync } from 'child_process';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

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

const fpGroups = ['pipe/map', 'pipe/filter + map', 'pipe/uniq'];

const RUNS = 5;

const filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(filename), '..');
const PERFORMANCE_DIR = path.join(ROOT, 'benchmarks', 'performance');
const OUT_JSON = path.join(ROOT, 'docs', 'data', 'benchmark-results.json');
const FP_OUT_JSON = path.join(ROOT, 'docs', 'data', 'fp-benchmark-results.json');

async function main() {
  const packageJson = JSON.parse(await fs.readFile(path.join(ROOT, 'package.json'), 'utf8'));
  const environment = getEnvironment();

  const data = {};
  for (const funcName of funcNames) {
    console.log(`Running benchmark: ${funcName}`);
    const results = runBenchmark(`${funcName}.bench.ts`);
    const firstGroup = results.filter(result => result.group === results[0].group && !result.name.includes('compat'));

    data[funcName] = {
      esToolkit: toOpsPerSecond(firstGroup.find(result => result.name.includes('es-toolkit'))),
      lodash: toOpsPerSecond(firstGroup.find(result => result.name.includes('lodash'))),
    };
  }

  await writeJson(OUT_JSON, {
    labels: {
      esToolkit: `es-toolkit@${packageJson.version}`,
      lodash: `lodash@${getLodashVersion()}`,
    },
    environment,
    data,
  });

  console.log('Running benchmark: fp/pipe');
  const fpResults = runBenchmark('fp/pipe.bench.ts');
  const fpData = {};
  for (const group of fpGroups) {
    const groupResults = fpResults.filter(result => result.group === group);
    fpData[group] = {
      esToolkit: toOpsPerSecond(groupResults.find(result => result.name === 'es-toolkit/fp')),
      remeda: toOpsPerSecond(groupResults.find(result => result.name === 'remeda')),
    };
  }

  await writeJson(FP_OUT_JSON, {
    labels: {
      esToolkit: 'es-toolkit/fp',
      remeda: 'remeda',
    },
    environment,
    data: fpData,
  });
}

function runBenchmark(file) {
  const runs = [];
  for (let i = 0; i < RUNS; i++) {
    const args = [...process.execArgv, '--disable-warning=MODULE_TYPELESS_PACKAGE_JSON', 'run.ts', file, '--json'];
    const stdout = execFileSync(process.execPath, args, {
      cwd: PERFORMANCE_DIR,
      encoding: 'utf8',
    });
    runs.push(JSON.parse(stdout.trim().split('\n').at(-1)).results);
  }

  return runs[0].map((result, index) => ({ ...result, ns: median(runs.map(run => run[index].ns)) }));
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 1) {
    return sorted[middle];
  }
  return (sorted[middle - 1] + sorted[middle]) / 2;
}

function toOpsPerSecond(result) {
  return Math.round(1e9 / result.ns);
}

function getEnvironment() {
  const cpus = os.cpus();

  return {
    node: process.version,
    platform: `${os.platform()} ${os.arch()}`,
    cpu: cpus[0]?.model || 'Unknown',
    cpuCores: cpus.length,
    memory: `${(os.totalmem() / 1024 ** 3).toFixed(2)} GB`,
  };
}

function getLodashVersion() {
  try {
    const stdout = execSync('yarn info lodash version --json', {
      cwd: path.join(ROOT, 'benchmarks'),
      encoding: 'utf8',
    });
    return JSON.parse(stdout).children.Version;
  } catch {
    console.warn('Could not detect lodash version, using "unknown"');
    return 'unknown';
  }
}

async function writeJson(file, value) {
  await fs.writeFile(file, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
