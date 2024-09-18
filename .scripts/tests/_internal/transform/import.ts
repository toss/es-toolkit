import type { Collection, JSCodeshift } from 'jscodeshift';

export function transformImport(root: Collection, jscodeshift: JSCodeshift): void {
  const astPath = root.getAST()[0];

  // Change `import {a, b} from './utils'` to `import {a} from '../_internal/a';\n import {b} from '../_internal/b';`
  root
    .find(jscodeshift.ImportDeclaration, {
      source: {
        value: './utils',
      },
    })
    .forEach(({ node }) => {
      if (node.specifiers) {
        const excludes = ['_']; // Exclude lodash
        const dirnames = '../_internal/';

        node.specifiers
          .filter(specifier => specifier.type === 'ImportSpecifier')
          .forEach(specifier => {
            if (specifier.type !== 'ImportSpecifier' || excludes.includes(specifier.imported.name)) {
              return;
            }

            // Add new import to the top of the file
            astPath.value.program.body.unshift(
              jscodeshift.importDeclaration(
                [jscodeshift.importSpecifier(jscodeshift.identifier(specifier.imported.name))],
                jscodeshift.literal(`${dirnames}${specifier.imported.name}`)
              )
            );
          });
      }
    })
    .remove();

  // Add import { describe, it, expect } from 'vitest';
  const vitestImport = root.find(jscodeshift.ImportDeclaration, {
    source: {
      value: 'vitest',
    },
    specifiers: [
      {
        type: 'ImportSpecifier',
        imported: {
          name: 'describe',
        },
      },
      {
        type: 'ImportSpecifier',
        imported: {
          name: 'it',
        },
      },
      {
        type: 'ImportSpecifier',
        imported: {
          name: 'expect',
        },
      },
    ],
  });

  if (!vitestImport.length) {
    astPath.value.program.body.unshift(
      jscodeshift.importDeclaration(
        [
          jscodeshift.importSpecifier(jscodeshift.identifier('describe')),
          jscodeshift.importSpecifier(jscodeshift.identifier('it')),
          jscodeshift.importSpecifier(jscodeshift.identifier('expect')),
        ],
        jscodeshift.literal('vitest')
      )
    );
  }

  // Remove import from 'lodash'
  root
    .find(jscodeshift.ImportDeclaration, {
      source: {
        value: 'lodash',
      },
    })
    .remove();

  // Change '../src/merge' to '../index'
  const methodSet = new Set<string>();
  root
    .find(jscodeshift.ImportDeclaration, {
      source: {
        value: (value: string) => value.startsWith('../src/'),
      },
    })
    .forEach(({ node }) => {
      if (node.specifiers && node.specifiers[0].type === 'ImportDefaultSpecifier' && node.specifiers[0].local) {
        methodSet.add(node.specifiers[0].local.name);
      }
    })
    .remove();

  if (methodSet.size) {
    const methodImport = jscodeshift.importDeclaration(
      Array.from(methodSet).map(method => jscodeshift.importSpecifier(jscodeshift.identifier(method))),
      jscodeshift.literal('../index')
    );

    astPath.value.program.body.unshift(methodImport);
  }
}
