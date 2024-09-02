import { ObjectPatPropDef } from "@deno/doc";
import { formatParam } from "./param.ts";

export function formatObjectPatProp(node: ObjectPatPropDef) {
  switch (node.kind) {
    case "keyValue": {
      return node.key;
    }
    case "assign": {
      let result = "";

      result += node.key;

      if (node.value != null) {
        result += " = ";
        result += node.value;
      }

      return result;
    }
    case "rest": {
      let result = "";

      result += "...";
      result += formatParam(node.arg);

      return result;
    }
  }
}
