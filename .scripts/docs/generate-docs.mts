import { doc } from '@deno/doc';
import { groupBy } from '@es-toolkit/es-toolkit';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { toDocumentationItem } from './operations/toDocumentationItem.ts';
import { render as renderEN } from './operations/createDocumentationFile/en.ts';
import { render as renderKO } from './operations/createDocumentationFile/ko.ts';
import { render as renderZH } from './operations/createDocumentationFile/zh_hans.ts';
import { render as renderJA } from './operations/createDocumentationFile/ja.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const basePath = path.resolve(__dirname, '..', '..', 'src');
const docsRoot = path.resolve(__dirname, '..', '..', 'docs');

async function run() {
  const result = await doc(`file:${path.join(basePath, 'index.ts')}`);

  for (const [name, entries] of Object.entries(groupBy(result, x => x.name))) {
    if (name.trim() === '') {
      continue;
    }

    const filePath = fileURLToPath(entries[0].location.filename);
    const relativePath = path.relative(basePath, filePath);
    const docPath = relativePath.replace(/.ts$/g, '.md');

    const enPath = path.join(docsRoot, 'reference', docPath);
    const hasEnDoc = await Deno.stat(enPath).catch(() => false);

    if (!hasEnDoc) {
      // const item = toDocumentationItem(name, entries);
      // console.log(item);
    }

    const koPath = path.join(docsRoot, 'ko', 'reference', docPath);
    console.log(koPath);
    const hasKoDoc = await Deno.stat(koPath).catch(() => false);

    if (!hasKoDoc) {
      const item = toDocumentationItem(name, entries);
      console.log(item);
    }
  }
}

run();
