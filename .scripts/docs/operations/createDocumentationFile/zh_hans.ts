import { DocumentationItem } from '../../types/DocumentationItem.ts';

export function render(item: DocumentationItem) {
  return [title(item.name), item.description, signature(item), examples(item)].filter(x => x != null).join('\n\n');
}

function title(name: string) {
  return `# ${name}`;
}

function signature(item: DocumentationItem) {
  return ['## 签名', symbolInterface(item), parameters(item), returns(item)].filter(x => x != null).join('\n\n');
}

function symbolInterface(item: DocumentationItem): string {
  return ` 
\`\`\`typescript
${item.signature}
\`\`\`
`.trim();
}

function parameters(item: DocumentationItem) {
  if (item.parameters == null) {
    return null;
  }

  return `
### 参数

${item.parameters.map(p => `- \`${p.name}\` (\`${p.type}\`) ${p.document}`).join('\n')}
  `.trim();
}

function returns(item: DocumentationItem) {
  if (item.returns == null) {
    return null;
  }

  return `
### 返回值

(\`${item.returns.type}\`): ${item.returns.document}
  `.trim();
}

function examples(item: DocumentationItem) {
  if (item.exampleCodes.length === 0) {
    return null;
  }

  return `
## 示例

\`\`\`typescript
${item.exampleCodes.join('\n\n')}
\`\`\`
  `.trim();
}
