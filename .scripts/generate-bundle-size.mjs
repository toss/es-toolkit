import esbuild from 'esbuild';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const funcNames = ['sample', 'difference', 'sum', 'debounce', 'throttle', 'pick', 'zip'];

const filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(filename), '..');
const OUT_JSON = path.join(ROOT, 'docs', 'data', 'bundle-size.json');

async function getSize(pkg, funcName) {
  const script = `import { ${funcName} } from "${pkg}"; console.log(${funcName})`;

  const bundled = await esbuild.build({
    stdin: {
      contents: script,
      resolveDir: ROOT,
      sourcefile: path.resolve(ROOT, 'tmp', 'test.js'),
      loader: 'js',
    },
    write: false,
    minify: true,
    bundle: true,
  });

  const buf = Buffer.from(bundled.outputFiles[0].contents);
  return buf.byteLength;
}

async function main() {
  const result = { labels: {}, data: {} };

  // detect labels: read root package.json for es-toolkit version
  try {
    const esPkgPath = path.join(ROOT, 'package.json');
    const esContent = await fs.readFile(esPkgPath, 'utf8');
    const esJson = JSON.parse(esContent);
    result.labels['esToolkit'] = `es-toolkit@${esJson.version}`;
  } catch {
    result.labels['esToolkit'] = 'es-toolkit@unknown';
  }

  // detect lodash-es version if installed in node_modules
  try {
    const lodashPkgPath = path.join(ROOT, 'node_modules', 'lodash-es', 'package.json');
    const lodashContent = await fs.readFile(lodashPkgPath, 'utf8');
    const lodashJson = JSON.parse(lodashContent);
    result.labels['lodash'] = `lodash-es@${lodashJson.version}`;
  } catch {
    result.labels['lodash'] = 'lodash-es@unknown';
  }

  for (const name of funcNames) {
    console.log('Bundling', name);
    const lodashSize = await getSize('lodash-es', name).catch(e => {
      console.error('failed lodash for', name, e.message);
      return 0;
    });
    const esSize = await getSize('es-toolkit', name).catch(e => {
      console.error('failed es-toolkit for', name, e.message);
      return 0;
    });

    result.data[name] = { lodash: lodashSize, esToolkit: esSize };
  }

  await fs.mkdir(path.dirname(OUT_JSON), { recursive: true });
  await fs.writeFile(OUT_JSON, JSON.stringify(result, null, 2), 'utf8');
  console.log('Wrote', OUT_JSON);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
