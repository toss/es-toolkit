import { DocNodeFunction } from "@deno/doc";
import { formatParam } from "./nodes/param.ts";
import { formatTypeParam } from "./nodes/type-param.ts";
import { formatType } from "./nodes/type.ts";
import { FormatOption } from "./options.ts";

export function formatFunctionDoc(
  node: DocNodeFunction,
  options: FormatOption = {},
): string {
  let result = "";

  if (node.functionDef.isAsync) {
    result += "async ";
  }

  result += "function";

  if (node.functionDef.isGenerator) {
    result += "*";
  }

  result += " ";

  result += node.name;

  if (node.functionDef.typeParams.length > 0) {
    result += "<";
    result += node.functionDef.typeParams.map((p) =>
      formatTypeParam(p, options)
    ).join(
      ", ",
    );
    result += ">";
  }

  result += "(";
  result += node.functionDef.params.map((p) => formatParam(p, options)).join(
    ", ",
  );
  result += ")";

  if (node.functionDef.returnType != null) {
    result += ": ";
    result += formatType(node.functionDef.returnType, options);
  }

  return result;
}
