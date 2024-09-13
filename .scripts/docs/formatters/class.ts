import { DocNodeClass } from '@deno/doc';
import { formatDecorator } from './nodes/decorator.ts';
import { formatTypeParam } from './nodes/type-param.ts';
import { formatType } from './nodes/type.ts';
import { FormatOption } from './options.ts';

export function formatClassDoc(node: DocNodeClass, options: FormatOption = {}): string {
  let result = '';

  if (node.classDef.decorators != null && node.classDef.decorators.length > 0) {
    result += node.classDef.decorators.map(d => formatDecorator(d, options)).join('\n');
  }

  if (node.declarationKind === 'private') {
    result += 'private ';
  }

  if (node.classDef.isAbstract) {
    result += 'abstract ';
  }

  result += 'class ';
  result += node.name;

  if (node.classDef.typeParams.length > 0) {
    result += '<';
    result += node.classDef.typeParams.map(p => formatTypeParam(p, options)).join(', ');
    result += '>';
  }

  if (node.classDef.extends) {
    result += ' extends ';
    result += node.classDef.extends;
  }

  if (node.classDef.superTypeParams.length > 0) {
    result += '<';
    result += node.classDef.superTypeParams.map(p => formatType(p, options)).join(', ');
    result += '>';
  }

  if (node.classDef.implements.length > 0) {
    result += ' implements ';
    result += node.classDef.implements.map(i => formatType(i, options)).join(', ');
  }

  return result;
}
