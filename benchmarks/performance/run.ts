import { execFileSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { join, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { benchmarks } from './harness.ts';

interface Result {
  group: string;
  name: string;
  ns: number;
}

const root = fileURLToPath(new URL('.', import.meta.url));
const runFile = fileURLToPath(new URL('./run-file.ts', import.meta.url));
const args = process.argv.slice(2);
const isJson = args.includes('--json');
const filters = args.filter(arg => arg !== '--json');

const files = findFiles(filters);

if (files.length === 0) {
  console.error(`No benchmark file matches: ${filters.join(' ')}`);
  process.exit(1);
}

for (const file of files) {
  const results = await runFileBenchmarks(file);

  if (isJson) {
    console.log(JSON.stringify({ file, results }));
  } else {
    printFile(file, results);
  }
}

function findFiles(patterns: string[]) {
  const all = readdirSync(root, { recursive: true, encoding: 'utf8' })
    .filter(file => file.endsWith('.bench.ts'))
    .map(file => file.split(sep).join('/'))
    .sort();

  if (patterns.length === 0) {
    return all;
  }

  return all.filter(file =>
    patterns.some(pattern => {
      if (all.includes(pattern)) {
        return file === pattern;
      }
      return file.includes(pattern);
    })
  );
}

async function runFileBenchmarks(file: string): Promise<Result[]> {
  const start = benchmarks.length;
  try {
    await import(pathToFileURL(join(root, file)).href);
  } catch (error) {
    console.error(`Failed to load ${file}:`, error);
    process.exitCode = 1;
    return [];
  }

  const results: Result[] = [];
  for (const [offset, { group, name }] of benchmarks.slice(start).entries()) {
    try {
      const stdout = execFileSync(process.execPath, [...process.execArgv, runFile, file, String(offset)], {
        cwd: root,
        encoding: 'utf8',
      });
      results.push({ group, name, ns: JSON.parse(stdout).ns });
    } catch {
      console.error(`Failed: ${file} > ${group} > ${name}`);
      process.exitCode = 1;
    }
  }
  return results;
}

function printFile(file: string, results: Result[]) {
  console.log(`\n${file}`);

  const groups = new Map<string, Result[]>();
  for (const result of results) {
    groups.set(result.group, [...(groups.get(result.group) ?? []), result]);
  }

  for (const [group, groupResults] of groups) {
    const fastest = Math.min(...groupResults.map(result => result.ns));
    const nameWidth = Math.max(...groupResults.map(result => result.name.length));

    console.log(`  ${group}`);
    for (const result of groupResults) {
      const time = formatTime(result.ns).padStart(12);
      console.log(`    ${result.name.padEnd(nameWidth)}  ${time}  ${formatRelative(result.ns / fastest)}`);
    }
  }
}

function formatRelative(ratio: number) {
  if (ratio === 1) {
    return 'fastest';
  }
  return `${ratio.toFixed(2)}x slower`;
}

function formatTime(ns: number) {
  if (ns < 1e3) {
    return `${ns.toFixed(2)} ns`;
  }
  if (ns < 1e6) {
    return `${(ns / 1e3).toFixed(2)} µs`;
  }
  if (ns < 1e9) {
    return `${(ns / 1e6).toFixed(2)} ms`;
  }
  return `${(ns / 1e9).toFixed(2)} s`;
}
