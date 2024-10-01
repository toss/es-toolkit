import { TsTypeParamDef } from '@deno/doc';
import { formatType } from './type.ts';
import { FormatOption } from '../options.ts';

export function formatTypeParam(node: TsTypeParamDef, options: FormatOption) {
  let result = '';

  result += node.name;

  if (node.constraint != null) {
    result += ' extends ';
    result += formatType(node.constraint, options);
  }

  if (node.default != null) {
    result += ' = ';
    result += formatType(node.default, options);
  }

  return result;
}
