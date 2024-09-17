import type { Collection, JSCodeshift } from 'jscodeshift';

export function transformAssert(root: Collection, jscodeshift: JSCodeshift): void {
  // Change `assert.deepStrictEqual(a, b, c)` to `expect(a, c).toEqual(b)`
  root
    .find(jscodeshift.CallExpression, {
      callee: {
        type: 'MemberExpression',
        object: {
          name: 'assert',
        },
        property: {
          type: 'Identifier',
        },
      },
    })
    .replaceWith(({ node }) => {
      if (node.callee.type === 'MemberExpression' && node.callee.property.type === 'Identifier') {
        if (node.callee.property.name === 'deepStrictEqual') {
          const expectArguments =
            node.arguments.length === 3 ? [node.arguments[0], node.arguments[2]] : [node.arguments[0]];

          return jscodeshift.memberExpression(
            jscodeshift.callExpression(jscodeshift.identifier('expect'), expectArguments),
            jscodeshift.callExpression(jscodeshift.identifier('toEqual'), [node.arguments[1]])
          );
        }
      }
      return node;
    });
}
