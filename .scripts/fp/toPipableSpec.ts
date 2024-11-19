import { namedTypes as n } from 'ast-types';
import { TSTypeKind } from 'ast-types/gen/kinds';
import { API, CallExpression, FileInfo, Identifier, StringLiteral, TSTypeAnnotation } from 'jscodeshift';
import { getFunctionDeclaration } from './_internal/getter/functionDeclaration';
import { getTypedParam } from './_internal/getter/typedParam';
import { Param } from './_internal/types';
import { isValidFunctionDeclaration } from './_internal/validator/functionDeclaration';
import { isValidParams } from './_internal/validator/params';
import { cloneDeep } from '../../src/compat';

export const parser = 'tsx';

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;

  const categoryRegResult = /fp\/([a-zA-Z]+)\/([a-zA-Z]+)/.exec(file.path);
  const fileName = categoryRegResult ? categoryRegResult[2] : '';

  j.FunctionDeclaration;
  const firstTouched = j(file.source)
    .find(j.ExpressionStatement, node => {
      return (
        n.CallExpression.check(node.expression) &&
        n.Identifier.check(node.expression.callee) &&
        node.expression.callee.name === 'it'
      );
    })
    .forEach(path => {
      const expression = path.value.expression as CallExpression;
      const firstArgument = expression.arguments[0] as StringLiteral;
      j(path).insertBefore(
        j.expressionStatement(
          j.callExpression(j.identifier('it'), [
            j.stringLiteral(`(non-curried) ${firstArgument.value}`),
            expression.arguments[1],
          ])
        )
      );

      firstArgument.value = `(curried) ${firstArgument.value}`;
    })
    .toSource();

  return j(firstTouched)
    .find(
      j.CallExpression,
      node =>
        n.Identifier.check(node.callee) &&
        n.StringLiteral.check(node.arguments[0]) &&
        node.callee.name === 'it' &&
        node.arguments[0].value.includes('(curried)')
    )
    .forEach(path => {
      j(path)
        .find(j.CallExpression, {
          callee: { name: fileName },
        })
        .forEach(omitCall => {
          const [firstParameter, secondParameter] = omitCall.value.arguments;

          omitCall.value.arguments = [secondParameter];
          const curried = j.callExpression(omitCall.value, [firstParameter]);
          omitCall.replace(curried);
        });
    })
    .toSource();
}
