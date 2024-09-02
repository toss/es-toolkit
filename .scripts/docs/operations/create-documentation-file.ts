import {
  DocNode,
  JsDocTagDocRequired,
  JsDocTagParam,
  JsDocTagReturn,
} from "@deno/doc";
import { formatFunctionDoc } from "../formatters/function.ts";
import { formatClassDoc } from "../formatters/class.ts";

export function createDocumentationFile(name: string, docs: DocNode[]) {
  const lastDoc = docs.at(-1) ?? docs.at(0);

  switch (lastDoc?.kind) {
    case "function": {
      let documentation = "";

      documentation += `# ${name}\n\n`;

      if (lastDoc.jsDoc?.doc != null) {
        documentation += `${lastDoc.jsDoc?.doc}\n\n`;
      }

      documentation += `## Signature\n\n`;

      documentation += "```typescript\n";
      for (const doc of docs) {
        if (doc.kind !== "function") {
          throw new Error(`Unsupported document type in ${name}: ${doc.kind}`);
        }

        documentation += `${
          formatFunctionDoc(doc, { display: { readonly: false } })
        };\n`;
      }
      documentation += "```\n\n";

      const tags = lastDoc.jsDoc?.tags ?? [];
      const parameters = tags.filter((tag): tag is JsDocTagParam =>
        tag.kind === "param"
      );
      const returns = tags.filter((x): x is JsDocTagReturn =>
        x.kind === "return"
      );
      const examples = tags.filter((x): x is JsDocTagDocRequired =>
        x.kind === "example"
      );

      if (parameters.length > 0) {
        documentation += `### Parameters\n\n`;
        documentation += parameters.map((p) =>
          `- \`${p.name}\` (\`${p.type}\`) ${p.doc}`
        ).join("\n");
        documentation += `\n\n`;
      }

      if (returns.length > 0) {
        documentation += `### Returns\n\n`;
        documentation += returns.map((p) => `(\`${p.type}\`): ${p.doc}`);
        documentation += `\n\n`;
      }

      if (examples.length > 0) {
        documentation += `## Examples\n\n`;
        documentation += "```typescript\n";
        documentation += examples.map((x) => x.doc.trim()).join("\n\n");
        documentation += "\n```";
      }

      documentation += `\n`;

      return documentation;
    }

    case "class": {
      let documentation = "";

      documentation += `# ${name}\n\n`;

      if (lastDoc.jsDoc?.doc != null) {
        documentation += `${lastDoc.jsDoc?.doc}\n\n`;
      }

      documentation += `## Signature\n\n`;

      documentation += "```typescript\n";
      for (const doc of docs) {
        if (doc.kind !== "class") {
          throw new Error(`Unsupported document type in ${name}: ${doc.kind}`);
        }

        documentation += `${
          formatClassDoc(doc, { display: { readonly: false } })
        };\n`;
      }
      documentation += "```\n\n";

      return documentation;
    }
  }

  console.warn(
    `warn: Documentation for ${name} was not generated since ${lastDoc?.kind} is not a supported type.`,
  );
}
