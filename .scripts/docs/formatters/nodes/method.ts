import { LiteralMethodDef } from "@deno/doc";
import { formatParam } from "./param.ts";
import { formatType } from "./type.ts";
import { FormatOption } from "../options.ts";

export function formatMethodDef(node: LiteralMethodDef, options: FormatOption) {
  let result = "";

  if (node.computed) {
    result += `[${node.name}]`;
  } else {
    result += node.name;
  }

  if (node.optional) {
    result += "?";
  }

  result += "(";
  result += node.params.map((x) => formatParam(x, options)).join(", ");
  result += ")";

  if (node.returnType != null) {
    result += ": ";
    result += formatType(node.returnType, options);
  }

  return result;
}
