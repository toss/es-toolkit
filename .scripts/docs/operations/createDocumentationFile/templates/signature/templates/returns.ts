import { DocumentationItem } from '../../../../../types/DocumentationItem.ts';

export function returns(item: DocumentationItem) {
  if (item.returns == null) {
    return null;
  }

  return `
### Returns

(\`${item.returns.type}\`): ${item.returns.document}
  `.trim();
}
