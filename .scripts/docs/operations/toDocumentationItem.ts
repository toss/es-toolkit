import {
  DocNode,
  JsDocTag,
  JsDocTagDocRequired,
  JsDocTagParam,
  JsDocTagReturn,
} from "@deno/doc";
import { DocumentationItem } from "../types/DocumentationItem.ts";
import { formatFunctionDoc } from "../formatters/function.ts";
import { formatClassDoc } from "../formatters/class.ts";

export function toDocumentationItem(
  symbolName: string,
  docs: DocNode[],
): DocumentationItem {
  const lastDoc = docs.at(-1) ?? docs.at(0);
  const tags = lastDoc?.jsDoc?.tags ?? [];

  const description = lastDoc?.jsDoc?.doc;

  if (description == null) {
    throw new Error(
      `No description provided for ${symbolName} (${lastDoc?.location.filename}:${lastDoc?.location.line}:${lastDoc?.location.col}).`,
    );
  }

  return {
    name: symbolName,
    description: description.trim(),
    signature: toSignature(symbolName, docs),
    parameters: toParameters(symbolName, tags),
    returns: toReturns(symbolName, tags),
    exampleCodes: toExampleCodes(tags),
  };
}

function toSignature(symbolName: string, docs: DocNode[]) {
  if (docs.length === 0) {
    throw new Error(`No document provided for ${symbolName}.`);
  }

  switch (docs[0].kind) {
    case "function": {
      return toFunctionSignature(symbolName, docs);
    }
    case "class": {
      return toClassSignature(symbolName, docs);
    }
  }

  throw new Error(`Unsupported document node type: ${docs[0].kind}`);
}

function toFunctionSignature(symbolName: string, docs: DocNode[]) {
  return docs
    .map((doc) => {
      if (doc.kind !== "function") {
        throw new Error(
          `Unsupported document type in ${symbolName}: ${doc.kind}`,
        );
      }

      return `${formatFunctionDoc(doc, { display: { readonly: false } })};`;
    })
    .join("\n");
}

function toClassSignature(symbolName: string, docs: DocNode[]) {
  return docs
    .map((doc) => {
      if (doc.kind !== "class") {
        throw new Error(
          `Unsupported document type in ${symbolName}: ${doc.kind}`,
        );
      }

      return `${formatClassDoc(doc, { display: { readonly: false } })}`;
    })
    .join("\n");
}

function toParameters(
  symbolName: string,
  tags: JsDocTag[],
): DocumentationItem["parameters"] {
  const parameters = tags.filter((tag): tag is JsDocTagParam =>
    tag.kind === "param"
  );

  if (parameters.length === 0) {
    return null;
  }

  return parameters.map((param) => {
    if (param.name == null) {
      throw new Error(`parameter name is not provided in ${symbolName}.`);
    }

    if (param.type == null) {
      throw new Error(`parameter type is not provided in ${symbolName}.`);
    }

    if (param.doc == null) {
      throw new Error(`parameter doc is not provided in ${symbolName}.`);
    }

    return {
      name: param.name,
      type: param.type,
      document: param.doc.replace(/^- /g, ""),
    };
  });
}

function toReturns(
  symbolName: string,
  tags: JsDocTag[],
): DocumentationItem["returns"] {
  const returns =
    tags.filter((x): x is JsDocTagReturn => x.kind === "return")[0];

  if (returns == null) {
    return null;
  }

  if (returns.doc == null) {
    throw new Error(`returns.doc is not provided in ${symbolName}.`);
  }

  return {
    type: returns.type ?? null,
    document: returns.doc.replace(/^- /g, ""),
  };
}

function toExampleCodes(tags: JsDocTag[]) {
  const examples = tags.filter((x): x is JsDocTagDocRequired =>
    x.kind === "example"
  );

  if (examples.length === 0) {
    return [];
  }

  return examples.map((x) => x.doc.trim());
}
