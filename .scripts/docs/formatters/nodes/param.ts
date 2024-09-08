import { ParamDef } from "@deno/doc";
import { formatType } from "./type.ts";
import { formatObjectPatProp } from "./object-pat-prop.ts";
import { FormatOption } from "../options.ts";

export function formatParam(node: ParamDef, options: FormatOption): string {
  if (node.decorators != null) {
    throw new Error(`Not implemented`);
  }

  switch (node.kind) {
    case "array": {
      let result = "";

      result += "[";

      result += node.elements
        .filter((x) => x != null)
        .map((item) => {
          return formatParam(item!, options);
        })
        .join(", ");

      result += "]";

      if (node.optional) {
        result += "?";
      }

      if (node.tsType != null) {
        result += ": ";
        result += formatType(node.tsType, options);
      }

      return result;
    }

    case "assign": {
      let result = "";

      result += formatParam(node.left, options);

      if (node.tsType != null) {
        result += ": ";
        result += formatType(node.tsType, options);
      }

      return result;
    }

    case "identifier": {
      let result = "";

      result += node.name;

      if (node.optional) {
        result += "?";
      }

      if (node.tsType != null) {
        result += ": ";
        result += formatType(node.tsType, options);
      }

      return result;
    }

    case "object": {
      let result = "";

      result += "{";
      result += node.props.map((prop) => formatObjectPatProp(prop)).join(", ");
      result += "}";

      if (node.optional) {
        result += "?";
      }

      if (node.tsType != null) {
        result += ": ";
        result += formatType(node.tsType, options);
      }

      return result;
    }

    case "rest": {
      let result = "";

      result += "...";
      result += formatParam(node.arg, options);

      if (node.tsType != null) {
        result += ": ";
        result += formatType(node.tsType, options);
      }

      return result;
    }
  }
}
