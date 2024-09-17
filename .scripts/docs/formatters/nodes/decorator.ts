import { DecoratorDef } from "@deno/doc";
import { FormatOption } from "../options.ts";

// eslint-disable-next-line
export function formatDecorator(node: DecoratorDef, _: FormatOption) {
  let result = "";

  result += "@";
  result += node.name;

  if (node.args != null && node.args.length > 0) {
    result += "(";
    result += node.args.join(", ");
    result += ")";
  }

  return result;
}
