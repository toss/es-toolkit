import { measure } from 'mitata';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { benchmarks } from './harness.ts';

const [file, index] = process.argv.slice(2);

await import(pathToFileURL(resolve(file)).href);

const stats = await measure(benchmarks[Number(index)].fn);

console.log(JSON.stringify({ ns: stats.avg }));
