import esbuild from 'esbuild';
import path from 'path';

export async function getBundleSize(pkg: 'lodash-es' | 'es-toolkit' | 'es-toolkit/compat', funcName: string) {
  const script = `import { ${funcName} } from "${pkg}"; console.log(${funcName})`;

  const bundled = await esbuild.build({
    stdin: {
      contents: script,
      resolveDir: import.meta.dirname,
      sourcefile: path.resolve(import.meta.dirname, 'test.js'),
      loader: 'js',
    },
    write: false,
    minify: true,
    bundle: true,
  });

  return Buffer.from(bundled.outputFiles![0].contents).byteLength;
}
