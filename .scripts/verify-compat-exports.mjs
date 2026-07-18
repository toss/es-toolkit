import { readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const compatDir = path.resolve('compat');
const names = readdirSync(compatDir)
  .filter(file => file.endsWith('.mjs'))
  .map(file => file.slice(0, -'.mjs'.length));

const require = createRequire(import.meta.url);
const broken = [];

for (const name of names) {
  try {
    const mod = await import(pathToFileURL(path.join(compatDir, `${name}.mjs`)));
    if (mod.default === undefined) {
      broken.push(`compat/${name}.mjs: default export is undefined`);
    }
  } catch (error) {
    broken.push(`compat/${name}.mjs: ${error.message.split('\n')[0]}`);
  }

  try {
    const value = require(path.join(compatDir, `${name}.js`));
    if (value === undefined) {
      broken.push(`compat/${name}.js: module.exports is undefined`);
    }
  } catch (error) {
    broken.push(`compat/${name}.js: ${error.message.split('\n')[0]}`);
  }
}

if (broken.length > 0) {
  console.error(`Found ${broken.length} broken compat entry point(s):`);
  console.error(broken.join('\n'));
  process.exit(1);
}

console.log(`Verified ${names.length} compat entry points (ESM + CJS).`);
