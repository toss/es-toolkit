import {
  FunctionDeclaration,
  Identifier,
  JSCodeshift,
  TSTypeAnnotation,
  TSTypeParameterDeclaration,
  TypeParameterDeclaration,
} from 'jscodeshift';

export function getFunctionDeclaration(
  {
    functionName,
    typeParameters,
    params,
    returnType,
  }: {
    functionName: string;
    typeParameters: TypeParameterDeclaration | TSTypeParameterDeclaration | null | undefined;
    params: {
      name: string[];
      type: TSTypeAnnotation[];
    };
    returnType: TSTypeAnnotation;
  },
  j: JSCodeshift
) {
  const newFunctionDeclaration = j.template.statement([
    `export function ${functionName}(${params.name.join(', ')});\n`,
  ]) as {
    declaration: Omit<FunctionDeclaration, 'params'> & {
      params: Identifier[];
    };
  };

  newFunctionDeclaration.declaration.typeParameters = typeParameters;
  params.type.forEach((type, idx) => {
    newFunctionDeclaration.declaration.params[idx].typeAnnotation = type;
  });
  newFunctionDeclaration.declaration.returnType = returnType;

  return newFunctionDeclaration;
}
