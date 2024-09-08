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
이 함수는 호환성을 위한 \`es-toolkit/compat\` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

\`es-toolkit/compat\`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::
`.trim();
}

function signature(item: DocumentationItem) {
  return [
    "## 인터페이스",
    symbolInterface(item),
    parameters(item),
    returns(item),
  ].filter((x) => x != null).join("\n\n");
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
### 파라미터

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
### 반환 값

(\`${item.returns.type}\`): ${item.returns.document}
  `.trim();
}

function examples(item: DocumentationItem) {
  if (item.exampleCodes.length === 0) {
    return null;
  }

  return `
## 예시

\`\`\`typescript
${item.exampleCodes.join("\n\n")}
\`\`\`
  `.trim();
}
