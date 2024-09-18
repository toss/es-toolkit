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
        const expectArguments =
          node.arguments.length === 3 ? [node.arguments[0], node.arguments[2]] : [node.arguments[0]];
        const expect = jscodeshift.callExpression(jscodeshift.identifier('expect'), expectArguments);

        switch (node.callee.property.name) {
          case 'deepStrictEqual':
            return jscodeshift.memberExpression(
              expect,
              jscodeshift.callExpression(jscodeshift.identifier('toEqual'), [node.arguments[1]])
            );
          case 'deepEqual':
            return jscodeshift.memberExpression(
              expect,
              jscodeshift.callExpression(jscodeshift.identifier('toEqual'), [node.arguments[1]])
            );
          case 'strictEqual':
            return jscodeshift.memberExpression(
              expect,
              jscodeshift.callExpression(jscodeshift.identifier('toBe'), [node.arguments[1]])
            );
          case 'notEqual':
            return jscodeshift.memberExpression(
              expect,
              jscodeshift.callExpression(jscodeshift.identifier('not.toBe'), [node.arguments[1]])
            );
          case 'notStrictEqual':
            return jscodeshift.memberExpression(
              expect,
              jscodeshift.callExpression(jscodeshift.identifier('not.toBe'), [node.arguments[1]])
            );
        }
      }
      return node;
    });
}
