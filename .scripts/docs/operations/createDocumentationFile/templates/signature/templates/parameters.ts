import { DocumentationItem } from '../../../../../types/DocumentationItem.ts';

export function parameters(item: DocumentationItem) {
  if (item.parameters == null) {
    return null;
  }

  return `
### Parameters

${item.parameters.map(p => `- \`${p.name}\` (\`${p.type}\`) ${p.document}`).join('\n')}
  `.trim();
}
