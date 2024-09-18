import type { Collection, JSCodeshift } from 'jscodeshift';

export function transformLodashStable(root: Collection, jscodeshift: JSCodeshift): void {
  const astPath = root.getAST()[0];
  let needImportEsToolkit = false;

  root
    .find(jscodeshift.CallExpression, {
      callee: {
        type: 'MemberExpression',
        object: {
          name: 'lodashStable',
        },
        property: {
          type: 'Identifier',
        },
      },
    })
    .replaceWith(({ node }) => {
      // this condition is for type narrowing
      if (node.callee.type === 'MemberExpression' && node.callee.property.type === 'Identifier') {
        switch (node.callee.property.name) {
          case 'each':
            node.callee.property.name = 'forEach';
            node.callee.object = node.arguments[0] as any;
            return jscodeshift.callExpression(node.callee, node.arguments.slice(1));

          case 'map':
            node.callee.property.name = 'map';
            node.callee.object = node.arguments[0] as any;
            return jscodeshift.callExpression(node.callee, node.arguments.slice(1));
        }
        // Remove lodashStable from the callee
        node.callee.object = jscodeshift.identifier('esToolkit');
        needImportEsToolkit = true;
      }
      return node;
    });

  if (needImportEsToolkit) {
    const esToolkitImport = jscodeshift.importDeclaration(
      [jscodeshift.importNamespaceSpecifier(jscodeshift.identifier('esToolkit'))],
      jscodeshift.literal('../index')
    );

    astPath.value.program.body.unshift(esToolkitImport);
  }
}
