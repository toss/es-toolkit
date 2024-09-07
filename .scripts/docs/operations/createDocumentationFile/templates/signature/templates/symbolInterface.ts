import { DocumentationItem } from '../../../../../types/DocumentationItem.ts';

export function symbolInterface(item: DocumentationItem): string {
  return ` 
\`\`\`typescript
${item.signature}
\`\`\`
`.trim();
}
