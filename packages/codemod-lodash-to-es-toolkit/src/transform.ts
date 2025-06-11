import type { API, Collection, FileInfo, JSCodeshift } from 'jscodeshift';

export default function transform(file: FileInfo, api: API): string | null {
  const { jscodeshift: j } = api;

  try {
    const root = j(file.source);
    let hasChanges = false;

    // Transform all lodash-related imports
    hasChanges = transformLodashImports(root, j) || hasChanges;

    // Detect quote style used in original code
    const quoteStyle = detectQuoteStyle(file.source);

    return hasChanges ? root.toSource({ quote: quoteStyle }) : null;
  } catch (error) {
    console.error(`Error transforming file ${file.path}:`, error);
    return null;
  }
}

function detectQuoteStyle(source: string): 'single' | 'double' {
  // Detect quote style used in import statements
  const singleQuoteMatches = source.match(/import.*from\s+'/g) || [];
  const doubleQuoteMatches = source.match(/import.*from\s+"/g) || [];

  // Return the more frequently used style, default is single
  return doubleQuoteMatches.length > singleQuoteMatches.length ? 'double' : 'single';
}

function transformLodashImports(root: Collection, j: JSCodeshift): boolean {
  let hasChanges = false;

  // 1. import _ from 'lodash' → import * as _ from 'es-toolkit/compat'
  const lodashImports = root.find(j.ImportDeclaration, {
    source: { value: 'lodash' },
  });

  if (lodashImports.length > 0) {
    lodashImports.replaceWith(path => {
      const { node } = path;

      if (node.specifiers) {
        const defaultSpecifier = node.specifiers.find(spec => spec.type === 'ImportDefaultSpecifier');

        if (defaultSpecifier && defaultSpecifier.local) {
          // import _ from 'lodash' → import * as _ from 'es-toolkit/compat'
          return j.importDeclaration(
            [j.importNamespaceSpecifier(defaultSpecifier.local)],
            j.literal('es-toolkit/compat')
          );
        } else {
          // import { foo, bar } from 'lodash' → import { foo, bar } from 'es-toolkit/compat'
          return j.importDeclaration(node.specifiers, j.literal('es-toolkit/compat'));
        }
      }
      return node;
    });
    hasChanges = true;
  }

  // 2. import { foo, bar } from 'lodash-es' → import { foo, bar } from 'es-toolkit/compat'
  const lodashEsImports = root.find(j.ImportDeclaration, {
    source: { value: 'lodash-es' },
  });

  if (lodashEsImports.length > 0) {
    lodashEsImports.replaceWith(path => {
      const { node } = path;

      if (node.specifiers) {
        return j.importDeclaration(node.specifiers, j.literal('es-toolkit/compat'));
      }
      return node;
    });
    hasChanges = true;
  }

  // 3. import debounce from 'lodash/debounce' → import { debounce } from 'es-toolkit/compat'
  // (lodash-es are already processed, so exclude them)
  const lodashFunctionImports = root.find(j.ImportDeclaration).filter(path => {
    const source = path.node.source.value;
    return typeof source === 'string' && source.startsWith('lodash/');
  });

  if (lodashFunctionImports.length > 0) {
    lodashFunctionImports.replaceWith(path => {
      const { node } = path;
      const modulePath = node.source.value as string;
      const functionName = modulePath.replace('lodash/', '');

      if (node.specifiers && node.specifiers[0] && node.specifiers[0].local) {
        const localIdentifier = node.specifiers[0].local;
        const importedName = localIdentifier.type === 'Identifier' ? localIdentifier.name : localIdentifier.toString();

        // Use alias if function name is different
        const specifier =
          functionName === importedName
            ? j.importSpecifier(j.identifier(functionName))
            : j.importSpecifier(j.identifier(functionName), j.identifier(importedName));

        return j.importDeclaration([specifier], j.literal('es-toolkit/compat'));
      }
      return node;
    });
    hasChanges = true;
  }

  return hasChanges;
}
