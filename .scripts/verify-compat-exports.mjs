import { readdirSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const compatDir = new URL('../compat/', import.meta.url);

const names = readdirSync(compatDir)
  .filter(file => file.endsWith('.mjs'))
  .map(file => file.slice(0, -'.mjs'.length));

const broken = [];

for (const name of names) {
  try {
    const mod = await import(new URL(`${name}.mjs`, compatDir).href);
    if (mod.default === undefined) {
      broken.push(`compat/${name}.mjs: default export is undefined`);
    }
  } catch (error) {
    broken.push(`compat/${name}.mjs: ${error.message.split('\n')[0]}`);
  }

  try {
    if (require(`../compat/${name}.js`) === undefined) {
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
