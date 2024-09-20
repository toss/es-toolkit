import { Declaration, FunctionDeclaration, Identifier } from 'jscodeshift';
import { namedTypes as n } from 'ast-types';

export function isValidFunctionDeclaration(functionDeclaration: Declaration | null): functionDeclaration is Omit<
  FunctionDeclaration,
  'id'
> & {
  id: Identifier;
} {
  return (
    n.FunctionDeclaration.check(functionDeclaration) &&
    functionDeclaration.id != null &&
    n.TSTypeAnnotation.check(functionDeclaration.returnType)
  );
}
