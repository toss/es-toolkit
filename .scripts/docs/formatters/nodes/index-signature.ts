import { LiteralIndexSignatureDef } from "@deno/doc";
import { formatReadonly } from "../helpers/readonly.ts";
import { formatParam } from "./param.ts";
import { formatType } from "./type.ts";
import { FormatOption } from "../options.ts";

export function formatIndexSignatureDef(
  node: LiteralIndexSignatureDef,
  options: FormatOption,
) {
  let result = "";

  result += formatReadonly(node, options);

  result += "[";
  result += node.params.map((p) => formatParam(p, options)).join(", ");
  result += "]";

  if (node.tsType != null) {
    result += ": ";
    result += formatType(node.tsType, options);
  }

  return result;
}
