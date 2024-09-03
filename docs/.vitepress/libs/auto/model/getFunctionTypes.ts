import { parse as tsParse } from '@typescript-eslint/parser';

export type ProgramStatement = ReturnType<typeof tsParse>['body'][0];
export type ESLintProgram = ReturnType<typeof tsParse>;

function getParamType(param: any, source: string): string[] | undefined {
  switch (param.type) {
    case 'Identifier':
      return [param.name, source.slice(param.range[0], param.range[1]).replace(`${param.name}: `, '')];

    case 'AssignmentPattern':
      return [
        param.left.name,
        source.slice(param.left.range[0], param.left.range[1]).replace(`${param.left.name} = `, ''),
      ];
  }
}

function isFunctionNode(node: ProgramStatement) {
  return (
    node.type === 'ExportNamedDeclaration' &&
    (node.declaration?.type === 'FunctionDeclaration' || node.declaration?.type === 'TSDeclareFunction')
  );
}

export function getFunctionTypes(source: string): {
  functionNodes: ProgramStatement[];
  types: Array<{
    returns: string;
    signature: string;
    params: {
      [key: string]: string;
    };
  }>;
} {
  const tsAst = tsParse(source);
  const functionNodes = tsAst.body.filter(isFunctionNode);

  return {
    functionNodes,
    types: functionNodes.map((node: any) => {
      const totalRange = node.declaration.range;
      const blockRange = node.declaration.body ? node.declaration.body.range : [totalRange[1], totalRange[1]];
      const { params, returnType } = node.declaration;

      return {
        returns: returnType?.range ? source.slice(returnType.range[0], returnType.range[1]).slice(2) : 'void',
        signature: source.slice(totalRange[0], blockRange[0]),
        params: Object.fromEntries(params.map(param => getParamType(param, source)).filter(Boolean)),
      };
    }),
  };
}
