import { parse as commentParse } from 'comment-parser';
import { parse as tsParse } from '@typescript-eslint/parser';

export type Parsed = {
  description: string;
  parameters: {
    [key: string]: {
      type: string;
      description: string;
    };
  };
  returns: {
    type: string;
    description: string;
  };
  examples: string[];
  signature: string;
};

export function parse(source: string): Parsed[] {
  const tsAst = tsParse(source);
  const commentsAst = commentParse(source, {
    spacing: 'preserve',
  });

  // Filter out only function nodes
  const functionTsAst = tsAst.body.filter(
    node =>
      node.type === 'ExportNamedDeclaration' &&
      (node.declaration?.type === 'FunctionDeclaration' || node.declaration?.type === 'TSDeclareFunction')
  );
  // Filter out only comments that are above the function nodes
  const functionCommentsAst = commentsAst.filter(
    // Check if the comment is above the function node
    comment => {
      const commentLine = Number(comment.source.at(-1)?.number);
      return functionTsAst.some(node => {
        const diff = node.loc.start.line - commentLine;
        return diff === 2 || diff === 3; // only accept just above the function node and 1 wrapped line
      });
    }
  );

  return functionCommentsAst.map((comment, index) => {
    const result: Parsed = {
      description: comment.description,
      parameters: {},
      returns: {
        type: '',
        description: '',
      },
      examples: [],
      signature: '',
    };

    for (const tag of comment.tags) {
      switch (tag.tag) {
        case 'param':
          result.parameters[tag.name] = {
            type: '',
            description: tag.description.slice(2),
          };
          break;

        case 'returns':
          result.returns = {
            type: '',
            // comment-parser can detect with `-`, so I have to use source instead of tag.description
            description: tag.source
              // .filter(line => line.source)
              .map(line => line.source.replace(/\s?\*\s?\/?(@returns\s?{.*}\s?)?-?/, ''))
              .filter(line => line)
              .join(' ')
              .trim(),
          };
          break;

        case 'example':
          result.examples.push(tag.description.trim());
          break;
      }
    }

    const functionNode = functionTsAst[index];

    if (
      functionNode.type === 'ExportNamedDeclaration' &&
      (functionNode.declaration?.type === 'FunctionDeclaration' ||
        functionNode.declaration?.type === 'TSDeclareFunction')
    ) {
      const totalRange = functionNode.declaration.range;
      const blockRange = functionNode.declaration.body
        ? functionNode.declaration.body.range
        : [totalRange[1], totalRange[1]];
      const { params, returnType } = functionNode.declaration;

      for (const param of params) {
        if (param.type === 'Identifier' || param.type === 'AssignmentPattern') {
          const name =
            param.type === 'Identifier' ? param.name : param.left.type === 'Identifier' ? param.left.name : '';
          const paramSlice = source.slice(param.range[0], param.range[1]);
          const type = paramSlice.replace(`${name}${param.type === 'Identifier' ? ':' : ' ='} `, '');

          result.parameters[name].type = type;
        }
      }

      result.returns.type = returnType?.range
        ? source.slice(returnType.range[0], returnType.range[1]).slice(2)
        : 'void';
      result.signature = source.slice(totalRange[0], blockRange[0]);
    }

    return result;
  });
}
