import { API, FileInfo, TSTypeAnnotation } from 'jscodeshift';
import { TSTypeKind } from 'ast-types/gen/kinds';
import { isValidFunctionDeclaration } from './_internal/validator/functionDeclaration';
import { isValidParams } from './_internal/validator/params';
import { Param } from './_internal/types';
import { getTypedParam } from './_internal/getter/typedParam';
import { getFunctionDeclaration } from './_internal/getter/functionDeclaration';

export const parser = 'tsx';

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.ExportNamedDeclaration)
    .forEach(path => {
      const functionDeclaration = path.value.declaration;

      if (!isValidFunctionDeclaration(functionDeclaration)) {
        return;
      }

      const functionName = functionDeclaration.id.name;
      const functionBody = functionDeclaration.body;

      const params = functionDeclaration.params;

      if (!isValidParams(params)) {
        return;
      }

      const originParams: Record<'first' | 'second', Param> = {
        first: {
          name: params[0].name,
          type: params[0].typeAnnotation.typeAnnotation as TSTypeKind,
        },
        second: {
          name: params[1].name,
          type: params[1].typeAnnotation.typeAnnotation as TSTypeKind,
        },
      };

      const newFirstArgumentName = `${originParams.first.name}Or${originParams.second.name.replace(/./, first => first.toUpperCase())}`;

      const firstParam = getTypedParam(originParams.first, j);

      const selfCurringStatement = j.returnStatement(
        j.arrowFunctionExpression(
          [firstParam],
          j.callExpression(j.identifier(functionName), [
            j.identifier(params[0].name),
            j.tsAsExpression(j.identifier(newFirstArgumentName), originParams.second.type),
          ])
        )
      );

      const curringConditionalStatement = j.blockStatement([
        j.ifStatement(
          j.binaryExpression('==', j.identifier(originParams.second.name), j.literal(null)),
          j.blockStatement([selfCurringStatement])
        ),
        j.variableDeclaration('const', [
          j.variableDeclarator(
            j.identifier(params[0].name),
            j.tsAsExpression(j.identifier(newFirstArgumentName), originParams.first.type)
          ),
        ]),
      ]);

      params[0].name = newFirstArgumentName;
      params[0].typeAnnotation = j.tsTypeAnnotation(
        j.tsUnionType([originParams.first.type, originParams.second.type].map(j.tsParenthesizedType))
      );
      params[1].name = `${originParams.second.name}?`;

      functionDeclaration.body = j.blockStatement([...curringConditionalStatement.body, ...functionBody.body]);

      const nonCurriedDeclaration = getFunctionDeclaration(
        {
          functionName,
          typeParameters: functionDeclaration.typeParameters,
          params: {
            name: [originParams.first.name, originParams.second.name],
            type: [originParams.first.type, originParams.second.type].map(j.tsTypeAnnotation),
          },
          returnType: functionDeclaration.returnType as TSTypeAnnotation,
        },
        j
      );

      const returnOfCurried = j.tsFunctionType([getTypedParam(originParams.first, j)]);
      returnOfCurried.typeAnnotation = functionDeclaration.returnType as TSTypeAnnotation;

      const curriedDeclaration = getFunctionDeclaration(
        {
          functionName,
          typeParameters: functionDeclaration.typeParameters,
          params: {
            name: [originParams.second.name],
            type: [j.tsTypeAnnotation(originParams.second.type)],
          },
          returnType: j.tsTypeAnnotation(returnOfCurried),
        },
        j
      );

      functionDeclaration.returnType = undefined;

      j(path).insertBefore(nonCurriedDeclaration);
      j(path).insertBefore(curriedDeclaration);
    })
    .toSource();
}
