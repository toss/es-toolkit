import { DocumentationItem } from '../../../../types/DocumentationItem.ts';
import { parameters } from './templates/parameters.ts';
import { returns } from './templates/returns.ts';
import { symbolInterface } from './templates/symbolInterface.ts';

export function signature(item: DocumentationItem) {
  return [symbolInterface(item), parameters(item), returns(item)].filter(x => x != null).join('\n\n');
}
