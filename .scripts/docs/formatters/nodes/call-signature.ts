import { LiteralCallSignatureDef } from "@deno/doc";
import { formatParam } from "./param.ts";
import { formatType } from "./type.ts";
import { FormatOption } from "../options.ts";

export function formatCallSignatureDef(
  node: LiteralCallSignatureDef,
  options: FormatOption,
) {
  let result = "";

  result += "(";
  result += node.params.map((param) => formatParam(param, options)).join(", ");
  result += ")";

  if (node.tsType != null) {
    result += ": ";
    result += formatType(node.tsType, options);
  }

  return result;
}
