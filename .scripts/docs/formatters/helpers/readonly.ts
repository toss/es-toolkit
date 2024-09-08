import { FormatOption } from "../options.ts";

export function formatReadonly(
  node: { readonly?: boolean | "+" | "-" },
  options: FormatOption,
): string {
  if (!options.display?.readonly) {
    return "";
  }

  switch (node.readonly) {
    case true: {
      return "readonly ";
    }
    case "+": {
      return "+readonly ";
    }
    case "-": {
      return "-readonly ";
    }
  }

  return "";
}
