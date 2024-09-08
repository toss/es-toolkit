import { TsTypeParamDef } from "@deno/doc";
import { FormatOption } from "../options.ts";
import { formatType } from "./type.ts";

export function formatTypeParam(
  node: TsTypeParamDef,
  options: FormatOption,
) {
  let result = "";

  result += node.name;

  if (node.constraint != null) {
    result += " extends ";
    result += formatType(node.constraint, options);
  }

  if (node.default != null) {
    result += " = ";
    result += formatType(node.default, options);
  }

  return result;
}
