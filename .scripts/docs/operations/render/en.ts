import { RenderOptions } from './types.ts';
import { DocumentationItem } from '../../types/DocumentationItem.ts';

export function render(item: DocumentationItem, options: RenderOptions = {}) {
  return [title(item.name), getNotice(options), item.description, signature(item), examples(item)]
    .filter(x => x != null)
    .join('\n\n');
}

function title(name: string) {
  return `# ${name}`;
}

function getNotice(options: RenderOptions) {
  if (options.compat) {
    return `
::: info
This function is only available in \`es-toolkit/compat\` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from \`es-toolkit/compat\`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::
`.trim();
  }

  if (options.fp) {
    return `
::: info
This function can only be imported from \`es-toolkit/fp\`, which supports writing code in a functional programming style.

When import code from \`es-toolkit/fp\`, you can use the pipe syntax or functions that automatically curry based on the number of input arguments.
:::
`.trim();
  }

  return null;
}

function signature(item: DocumentationItem) {
  return ['## Signature', symbolInterface(item), parameters(item), returns(item)].filter(x => x != null).join('\n\n');
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
### Parameters

${item.parameters.map(p => `- \`${p.name}\` (\`${p.type}\`): ${p.document}`).join('\n')}
  `.trim();
}

function returns(item: DocumentationItem) {
  if (item.returns == null) {
    return null;
  }

  if (item.returns.type == null) {
    return `
### Returns

(\`${item.returns.type}\`): ${item.returns.document} 
    `.trim();
  }

  return `
### Returns

(\`${item.returns.type}\`): ${item.returns.document}
  `.trim();
}

function examples(item: DocumentationItem) {
  if (item.exampleCodes.length === 0) {
    return null;
  }

  return `
## Examples

\`\`\`typescript
${item.exampleCodes.join('\n\n')}
\`\`\`
  `.trim();
}
