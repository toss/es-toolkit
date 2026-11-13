/**
 * Project-specific lint rules for oxlint, loaded through `jsPlugins` in `.oxlintrc.json`.
 */

/** @type {import('oxlint').Plugin} */
const plugin = {
  meta: { name: 'es-toolkit' },
  rules: {
    'no-each': {
      meta: {
        type: 'suggestion',
        docs: {
          description:
            'Disallow it.each(), test.for(), describe.each() and their modifiers; write a separate it() that calls the function directly.',
        },
      },
      create(context) {
        return {
          MemberExpression(node) {
            if (node.property.type !== 'Identifier' || !['each', 'for'].includes(node.property.name)) {
              return;
            }
            // Unwrap `it.skip.each`, `it.skipIf(condition).each`, ... down to the test API identifier.
            let object = node.object;
            while (object != null) {
              if (object.type === 'Identifier') {
                if (['it', 'test', 'describe', 'suite'].includes(object.name)) {
                  context.report({
                    node,
                    message: 'Do not use .each() or .for(). Write a separate it() that calls the function directly.',
                  });
                }
                return;
              }
              if (object.type === 'MemberExpression') {
                object = object.object;
              } else if (object.type === 'CallExpression') {
                object = object.callee;
              } else {
                return;
              }
            }
          },
        };
      },
    },
    'no-object-entries': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Disallow Object.entries() in library code because it allocates a pair per key.',
        },
      },
      create(context) {
        return {
          CallExpression(node) {
            const { callee } = node;
            if (
              callee.type === 'MemberExpression' &&
              callee.object.type === 'Identifier' &&
              callee.object.name === 'Object' &&
              callee.property.type === 'Identifier' &&
              callee.property.name === 'entries'
            ) {
              context.report({
                node,
                message:
                  'Do not use Object.entries for performance. Consider using alternatives like Object.keys() or Object.values().',
              });
            }
          },
        };
      },
    },
  },
};

export default plugin;
