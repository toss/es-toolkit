import { JSCodeshift } from 'jscodeshift';
import { Param } from '../types';

export function getTypedParam({ name, type }: Param, j: JSCodeshift) {
  const param = j.identifier(name);
  param.typeAnnotation = j.tsTypeAnnotation(type);
  return param;
}
