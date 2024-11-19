import { TSTypeKind } from 'ast-types/gen/kinds';
import { API, FileInfo, TSTypeAnnotation } from 'jscodeshift';
import { getFunctionDeclaration } from './_internal/getter/functionDeclaration';
import { getTypedParam } from './_internal/getter/typedParam';
import { Param } from './_internal/types';
import { isValidFunctionDeclaration } from './_internal/validator/functionDeclaration';
import { isValidParams } from './_internal/validator/params';

export const parser = 'tsx';

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;

  const categoryRegResult = /fp\/([a-z]+)/.exec(file.path);
  const category = categoryRegResult ? categoryRegResult[1] : '';

  return j(file.source)
    .find(j.ExportNamedDeclaration)
    .forEach(path => {
      const comments = [...(path.value.comments ?? [])];
      const comment = comments[0].value;
      const functionDeclaration = path.value.declaration;

      if (!isValidFunctionDeclaration(functionDeclaration)) {
        return;
      }

      const functionName = functionDeclaration.id.name;

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

      const referrerCallStatement = j.returnStatement(
        j.callExpression(j.identifier(`${functionName}Toolkit`), [
          j.identifier(originParams.first.name),
          j.identifier(originParams.second.name),
        ])
      );

      params[0].name = newFirstArgumentName;
      params[0].typeAnnotation = j.tsTypeAnnotation(
        j.tsUnionType([originParams.first.type, originParams.second.type].map(j.tsParenthesizedType))
      );
      params[1].name = `${originParams.second.name}?`;

      functionDeclaration.body = j.blockStatement([...curringConditionalStatement.body, referrerCallStatement]);

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

      nonCurriedDeclaration.comments = [j.commentBlock(comments[0].value, true)];

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

      const firstParamLine = comment.split('\n').find(line => line.startsWith(' * @param')) ?? '';

      const firstParamRegResult = /{([^}]+)} ([^\s]+)/.exec(firstParamLine);

      if (firstParamRegResult == null) {
        curriedDeclaration.comments = [j.commentBlock(comment, true)];
      } else {
        const [_, typeName, paramName] = firstParamRegResult;

        const exampleComments = comment.split('@example')[1];

        const usageExampleLine = exampleComments
          .split('\n')
          .find(comment => new RegExp(`${functionName}\(.+\);`).test(comment));

        const curriedComment =
          usageExampleLine == null
            ? comment
            : comment.replace(
                usageExampleLine,
                usageExampleLine.replace(
                  new RegExp(`${functionName}\\(([^,]+), (.+)\\);`),
                  (_, firstParam, secondParam) => `${functionName}(${String(secondParam).trim()})(${firstParam});`
                )
              );

        curriedDeclaration.comments = [
          j.commentBlock(
            curriedComment.replace(`${firstParamLine}\n`, '').replace(
              /@returns {([^}]+)} (.+)/,
              (_, returnType, note) =>
                `@returns {(${paramName}: ${typeName}) => ${returnType}} A function that receive ${firstParamLine
                  .split('-')[1]
                  .trim()
                  .replace(/\.$/, '')
                  .replace(/^./, firstLetter => firstLetter.toLowerCase())} as argument and returns ${String(note)
                  .replace(/\.$/, '')
                  .replace(/^./, firstLetter => firstLetter.toLowerCase())}.`
            ),
            true
          ),
        ];
      }

      path.value.comments = null;

      functionDeclaration.returnType = undefined;

      const referrerImportDeclaration = j.importDeclaration(
        [j.importSpecifier(j.identifier(functionName), j.identifier(`${functionName}Toolkit`))],
        j.literal(`../../${category}/${functionName}`)
      );

      j(path).insertBefore(referrerImportDeclaration);
      j(path).insertBefore(nonCurriedDeclaration);
      j(path).insertBefore(curriedDeclaration);
    })
    .toSource();
}
