import { parse as commentParse } from 'comment-parser';
import { ProgramStatement } from './getFunctionTypes';

export type CommentBlock = ReturnType<typeof commentParse>[0];

type Description = {
  description: string;
  returns: string;
  parameters: {
    [key: string]: string;
  };
  examples: string[];
};

function isCommentForFunction(comment: CommentBlock, functionNodes: ProgramStatement[]) {
  const commentLine = Number(comment.source.at(-1)?.number);
  return functionNodes.some(node => {
    const diff = node.loc.start.line - commentLine;
    return diff === 2 || diff === 3; // only accept just above the function node and 1 wrapped line
  });
}

export function getFunctionDescriptions(source: string, functionNodes: ProgramStatement[]): Description[] {
  const commentsAst = commentParse(source, {
    spacing: 'preserve',
  });

  const functionComments = commentsAst.filter(comment => isCommentForFunction(comment, functionNodes));
  return functionComments.map(comment => {
    const result: Description = {
      description: comment.description,
      returns: '',
      parameters: {},
      examples: [],
    };

    for (const tag of comment.tags) {
      switch (tag.tag) {
        case 'param':
          result.parameters[tag.name] = tag.description.slice(2);
          break;

        case 'returns':
          result.returns = tag.source
            .map(line => line.source.replace(/\s?\*\s?\/?(@returns\s?{.*}\s?)?-?/, ''))
            .filter(line => line)
            .join(' ')
            .trim();
          break;

        case 'example':
          result.examples.push(tag.description.trim());
          break;
      }
    }

    return result;
  });
}
