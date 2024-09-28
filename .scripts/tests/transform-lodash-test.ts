import type { API, FileInfo } from 'jscodeshift';
import { formatBrokenSyntax } from './_internal/formatter/brokenSyntax';
import { transformImport } from './_internal/transform/import';
import { transformLodashStable } from './_internal/transform/lodashStable';
import { transformAssert } from './_internal/transform/assert';

export default function transform(file: FileInfo, { jscodeshift }: API) {
  try {
    const root = jscodeshift(formatBrokenSyntax(file.source));
    transformLodashStable(root, jscodeshift);
    transformImport(root, jscodeshift);
    transformAssert(root, jscodeshift);

    return root.toSource();
  } catch (error) {
    if (error instanceof Error) {
      console.error(`File Path: ${file.path}`);
      console.error(`Error Messaging: ${error.message}`);
      console.error('Please resolve the error before continuing.');
      console.error('If you need help, please open an issue on GitHub.');
    }
  }
}
