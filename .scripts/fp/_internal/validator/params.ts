import { Identifier, Pattern, TSTypeAnnotation } from 'jscodeshift';
import { namedTypes as n } from 'ast-types';

export function isValidParams(
  params: Pattern[]
): params is (Omit<Identifier, 'typeAnnotation'> & { typeAnnotation: TSTypeAnnotation })[] {
  return params.every(
    param =>
      n.Identifier.check(param) &&
      n.TSTypeAnnotation.check(param.typeAnnotation) &&
      !n.TSTypeAnnotation.check(param.typeAnnotation.typeAnnotation)
  );
}
