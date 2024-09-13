import { DocumentationItem } from "../../types/DocumentationItem.ts";
import { RenderOptions } from "./types.ts";

export function render(item: DocumentationItem, options: RenderOptions = {}) {
  return [
    title(item.name),
    compatNotice(options),
    item.description,
    signature(item),
    examples(item),
  ]
    .filter((x) => x != null).join("\n\n");
}

function title(name: string) {
  return `# ${name}`;
}

function compatNotice(options: RenderOptions) {
  if (!options.compat) {
    return null;
  }

  return `
::: info
この関数は互換性のために \`es-toolkit/compat\` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

\`es-toolkit/compat\` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::
`.trim();
}

function signature(item: DocumentationItem) {
  return [
    "## インターフェース",
    symbolInterface(item),
    parameters(item),
    returns(item),
  ]
    .filter((x) => x != null)
    .join("\n\n");
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
### パラメータ

${
    item.parameters.map((p) => `- \`${p.name}\` (\`${p.type}\`): ${p.document}`)
      .join("\n")
  }
  `.trim();
}

function returns(item: DocumentationItem) {
  if (item.returns == null) {
    return null;
  }

  return `
### 戻り値

(\`${item.returns.type}\`): ${item.returns.document}
  `.trim();
}

function examples(item: DocumentationItem) {
  if (item.exampleCodes.length === 0) {
    return null;
  }

  return `
## 例

\`\`\`typescript
${item.exampleCodes.join("\n\n")}
\`\`\`
  `.trim();
}
