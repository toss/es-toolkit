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

const FP_FILE = 'fp/pipe.bench.ts';
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
  const rounds = runRounds([...funcNames.map(funcName => `${funcName}.bench.ts`), FP_FILE]);

  const data = {};
  for (const funcName of funcNames) {
    const file = `${funcName}.bench.ts`;
    const group = rounds[0].get(file)[0].group;
    const esToolkit = collect(rounds, file, group, name => name.includes('es-toolkit') && !name.includes('compat'));
    const lodash = collect(rounds, file, group, name => name.includes('lodash'));

    data[funcName] = { esToolkit: toOpsPerSecond(median(esToolkit)), lodash: toOpsPerSecond(median(lodash)) };
    logRatio(funcName, esToolkit, lodash);
  }

  await writeJson(OUT_JSON, {
    labels: {
      esToolkit: `es-toolkit@${packageJson.version}`,
      lodash: `lodash@${getLodashVersion()}`,
    },
    environment,
    data,
  });

  const fpData = {};
  for (const group of fpGroups) {
    const esToolkit = collect(rounds, FP_FILE, group, name => name === 'es-toolkit/fp');
    const remeda = collect(rounds, FP_FILE, group, name => name === 'remeda');

    fpData[group] = { esToolkit: toOpsPerSecond(median(esToolkit)), remeda: toOpsPerSecond(median(remeda)) };
    logRatio(group, esToolkit, remeda);
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

function runRounds(files) {
  const rounds = [];
  for (let round = 1; round <= RUNS; round++) {
    console.log(`Round ${round}/${RUNS}`);
    const args = [...process.execArgv, '--disable-warning=MODULE_TYPELESS_PACKAGE_JSON', 'run.ts', '--json', ...files];
    const stdout = execFileSync(process.execPath, args, { cwd: PERFORMANCE_DIR, encoding: 'utf8' });
    const lines = stdout
      .trim()
      .split('\n')
      .map(line => JSON.parse(line));
    rounds.push(new Map(lines.map(({ file, results }) => [file, results])));
  }
  return rounds;
}

function collect(rounds, file, group, matches) {
  return rounds.map(round => round.get(file).find(result => result.group === group && matches(result.name)).ns);
}

function logRatio(label, esToolkit, other) {
  const ratios = esToolkit.map((ns, index) => other[index] / ns);
  const min = Math.min(...ratios).toFixed(2);
  const max = Math.max(...ratios).toFixed(2);
  console.log(`${label}: ${median(ratios).toFixed(2)}x faster (${min}x - ${max}x across ${RUNS} runs)`);
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 1) {
    return sorted[middle];
  }
  return (sorted[middle - 1] + sorted[middle]) / 2;
}

function toOpsPerSecond(ns) {
  return Math.round(1e9 / ns);
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
