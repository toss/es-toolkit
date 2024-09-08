import { TsTypeDef } from "@deno/doc";
import { formatTypeParam } from "./type-param.ts";
import { formatParam } from "./param.ts";
import { formatCallSignatureDef } from "./call-signature.ts";
import { formatMethodDef } from "./method.ts";
import { formatPropertyDef } from "./property.ts";
import { formatReadonly } from "../helpers/readonly.ts";
import { formatIndexSignatureDef } from "./index-signature.ts";
import { FormatOption } from "../options.ts";

export function formatType(
  node: TsTypeDef,
  options: FormatOption,
): string {
  switch (node.kind) {
    case "array": {
      switch (node.array.kind) {
        case "union":
        case "intersection":
          return `Array<${formatType(node.array, options)}>`;
      }

      return `${formatType(node.array, options)}[]`;
    }
    case "conditional": {
      let result = "";

      result += formatType(node.conditionalType.checkType, options);
      result += " extends ";
      result += formatType(node.conditionalType.extendsType, options);
      result += " ? ";
      result += formatType(node.conditionalType.trueType, options);
      result += " : ";
      result += formatType(node.conditionalType.falseType, options);

      return result;
    }
    case "infer": {
      let result = "";

      result += "infer ";
      result += formatTypeParam(node.infer.typeParam, options);

      return result;
    }
    case "importType": {
      let result = "";

      result += "import(";
      result += node.importType.specifier;
      result += ")";

      if (node.importType.qualifier != null) {
        result += ".";
        result += node.importType.qualifier;
      }

      if (node.importType.typeParams != null) {
        result += "<";
        result += node.importType.typeParams.map((param) =>
          formatType(param, options)
        )
          .join(", ");
        result += ">";
      }

      return result;
    }
    case "fnOrConstructor": {
      let result = "";

      if (node.fnOrConstructor.constructor) {
        result += "new ";
      }

      result += "(";
      result += node.fnOrConstructor.params.map((param) =>
        formatParam(param, options)
      )
        .join(", ");
      result += ")";

      result += " => ";

      result += formatType(node.fnOrConstructor.tsType, options);

      return result;
    }

    case "indexedAccess": {
      let result = "";

      result += formatType(node.indexedAccess.objType, options);

      result += "[";
      result += formatType(node.indexedAccess.indexType, options);
      result += "]";

      return result;
    }

    case "intersection": {
      return node.intersection.map((u) => formatType(u, options)).join(" & ");
    }

    case "mapped": {
      let result = "";

      result += formatReadonly(node.mappedType, options);

      result += "[";

      if (node.mappedType.typeParam.constraint != null) {
        result += node.mappedType.typeParam.name;
        result += " in ";
        result += formatType(node.mappedType.typeParam.constraint, options);
      } else {
        result += formatTypeParam(node.mappedType.typeParam, options);
      }

      if (node.mappedType.nameType != null) {
        result += " as ";
        result += formatType(node.mappedType.nameType, options);
      }

      result += "]";

      switch (node.mappedType.optional) {
        case true: {
          result += "?";
          break;
        }
        case "+": {
          result += "+?";
          break;
        }
        case "-": {
          result += "-?";
          break;
        }
      }

      if (node.mappedType.tsType != null) {
        result += ": ";
        result += formatType(node.mappedType.tsType, options);
      }

      return result;
    }

    case "keyword": {
      return node.keyword;
    }

    case "literal": {
      switch (node.literal.kind) {
        case "boolean": {
          if (node.literal.boolean) {
            return "true";
          } else {
            return "false";
          }
        }

        case "string": {
          return node.literal.string;
        }

        case "template": {
          let result = "";

          result += "`";

          for (const tsType of node.literal.tsTypes) {
            if (tsType.kind === "literal") {
              if (tsType.literal.kind === "string") {
                result += tsType.literal.string;
                continue;
              }
            }

            result += "${";
            result += formatType(tsType, options);
            result += "}";
          }

          result += "`";

          return result;
        }

        case "number": {
          return node.literal.number.toString();
        }

        case "bigInt": {
          return node.literal.string;
        }
      }

      throw new Error(`Not reachable`);
    }

    case "optional": {
      return `${formatType(node.optional, options)}?`;
    }

    case "parenthesized": {
      return `(${formatType(node.parenthesized, options)})`;
    }

    case "rest": {
      return `...${formatType(node.rest, options)}`;
    }

    case "this": {
      return `this`;
    }

    case "tuple": {
      let result = "";

      result += "[";
      result += node.tuple.map((item) => formatType(item, options)).join(", ");
      result += "]";

      return result;
    }

    case "typeLiteral": {
      let result = "";

      result += "{ ";
      result += node.typeLiteral.callSignatures.map((sig) =>
        formatCallSignatureDef(sig, options)
      ).join("; ");
      result += node.typeLiteral.methods.map((m) => formatMethodDef(m, options))
        .join(
          "; ",
        );
      result += node.typeLiteral.properties.map((p) =>
        formatPropertyDef(p, options)
      )
        .join("; ");
      result += node.typeLiteral.indexSignatures.map((indexSignature) =>
        formatIndexSignatureDef(indexSignature, options)
      )
        .join("; ");

      result += result += " }";

      result += "}";

      return result;
    }

    case "typeOperator": {
      let result = "";

      switch (node.typeOperator.operator) {
        case "readonly": {
          if (!options.display?.readonly) {
            break;
          }

          result += node.typeOperator.operator;
          result += " ";
          break;
        }
        default: {
          result += node.typeOperator.operator;
          result += " ";
          break;
        }
      }

      result += formatType(node.typeOperator.tsType, options);

      return result;
    }

    case "typeQuery": {
      return `typeof ${node.typeQuery}`;
    }

    case "typeRef": {
      let result = "";

      result += node.typeRef.typeName;

      if (node.typeRef.typeParams != null) {
        result += "<";
        result += node.typeRef.typeParams.map((p) => formatType(p, options))
          .join(
            ", ",
          );
        result += ">";
      }

      return result;
    }

    case "union": {
      return node.union.map((u) => formatType(u, options)).join(" | ");
    }

    case "typePredicate": {
      return node.repr;
    }
  }

  throw new Error(`Unreachable`);
}
