import { LiteralPropertyDef } from "@deno/doc";
import { formatType } from "./type.ts";
import { formatReadonly } from "../helpers/readonly.ts";
import { FormatOption } from "../options.ts";

export function formatPropertyDef(
  node: LiteralPropertyDef,
  options: FormatOption,
) {
  let result = "";

  result += formatReadonly(node, options);

  if (node.computed) {
    result += `[${node.name}]`;
  } else {
    result += node.name;
  }

  if (node.optional) {
    result += "?";
  }

  if (node.tsType != null) {
    result += ": ";
    result += formatType(node.tsType, options);
  }

  return result;
}
