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
出于兼容性原因，此函数仅在 \`es-toolkit/compat\` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 \`es-toolkit/compat\` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::
`.trim();
  }

  if (options.fp) {
    return `
::: info
这个函数只能从 \`es-toolkit/fp\` 导入，以支持函数式编程风格的代码编写。

从 \`es-toolkit/fp\` 导入函数后，可以使用管道语法或根据输入参数数量自动 curry 化的函数。
:::
`.trim();
  }

  return null;
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

${item.parameters.map(p => `- \`${p.name}\` (\`${p.type}\`): ${p.document}`).join('\n')}
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
