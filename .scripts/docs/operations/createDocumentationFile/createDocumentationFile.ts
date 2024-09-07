import { DocumentationItem } from '../../types/DocumentationItem.ts';
import { examples } from './templates/examples.ts';
import { signature } from './templates/signature/signature.ts';
import { title } from './templates/title.ts';

export function createDocumentationFile(item: DocumentationItem) {
  return [title(item.name), item.description, signature(item), examples(item)].filter(x => x != null).join('\n\n');
}
