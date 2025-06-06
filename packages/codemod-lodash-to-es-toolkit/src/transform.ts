import type { API, Collection, FileInfo, JSCodeshift } from 'jscodeshift';

export default function transform(file: FileInfo, api: API): string | null {
  const { jscodeshift: j } = api;

  try {
    const root = j(file.source);
    let hasChanges = false;

    // 모든 lodash 관련 import 변환
    hasChanges = transformLodashImports(root, j) || hasChanges;

    // 원본 코드에서 사용한 quote 스타일 감지
    const quoteStyle = detectQuoteStyle(file.source);

    return hasChanges ? root.toSource({ quote: quoteStyle }) : null;
  } catch (error) {
    console.error(`Error transforming file ${file.path}:`, error);
    return null;
  }
}

function detectQuoteStyle(source: string): 'single' | 'double' {
  // import 문에서 사용된 quote 스타일을 감지
  const singleQuoteMatches = source.match(/import.*from\s+'/g) || [];
  const doubleQuoteMatches = source.match(/import.*from\s+"/g) || [];

  // 더 많이 사용된 스타일을 반환, 기본값은 single
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

  // 3. import { pipe, map } from 'lodash/fp' → import { pipe, map } from 'es-toolkit/compat'
  const lodashFpImports = root.find(j.ImportDeclaration, {
    source: { value: 'lodash/fp' },
  });

  if (lodashFpImports.length > 0) {
    lodashFpImports.replaceWith(path => {
      const { node } = path;

      // lodash/fp의 named imports를 그대로 es-toolkit/compat으로 변경
      if (node.specifiers) {
        return j.importDeclaration(node.specifiers, j.literal('es-toolkit/compat'));
      }
      return node;
    });
    hasChanges = true;
  }

  // 4. import debounce from 'lodash/debounce' → import { debounce } from 'es-toolkit/compat'
  // (lodash/fp와 lodash-es는 이미 처리했으므로 제외)
  const lodashFunctionImports = root.find(j.ImportDeclaration).filter(path => {
    const source = path.node.source.value;
    return typeof source === 'string' && source.startsWith('lodash/') && source !== 'lodash/fp';
  });

  if (lodashFunctionImports.length > 0) {
    lodashFunctionImports.replaceWith(path => {
      const { node } = path;
      const modulePath = node.source.value as string;
      const functionName = modulePath.replace('lodash/', '');

      if (node.specifiers && node.specifiers[0] && node.specifiers[0].local) {
        const localIdentifier = node.specifiers[0].local;
        const importedName = localIdentifier.type === 'Identifier' ? localIdentifier.name : localIdentifier.toString();

        // 함수명이 다르면 alias 사용
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
