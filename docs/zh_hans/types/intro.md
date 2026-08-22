# es-toolkit/types

`es-toolkit/types` 是一个汇集了 TypeScript 未内置提供的**编译期类型工具**的模块。它是一个不含任何运行时代码的仅声明（declaration-only）模块，因此你只导入类型，而不是值。

```typescript
import type { DeepPartial, ValueOf } from 'es-toolkit/types';
```

## 包含的类型

我们只挑选了那些因为 TypeScript 没有内置、你不得不每次手写的类型。

| 类型                                                                 | 说明                                                              |
| -------------------------------------------------------------------- | ----------------------------------------------------------------- |
| [`ValueOf<T>`](./reference/objects/ValueOf.md)                       | 创建对象所有值类型的联合。`keyof` 的值版本。                      |
| [`Simplify<T>`](./reference/objects/Simplify.md)                     | 将交叉类型或映射类型展开为单个易读的对象类型。                    |
| [`Writable<T>`](./reference/objects/Writable.md)                     | 移除所有属性上的 `readonly`。内置 `Readonly` 的逆操作。           |
| [`NonEmptyArray<T>`](./reference/values/NonEmptyArray.md)            | 至少包含一个元素的数组。                                          |
| [`DeepPartial<T>`](./reference/objects/DeepPartial.md)               | 递归地将包括嵌套对象在内的所有属性变为可选。                      |
| [`DeepReadonly<T>`](./reference/objects/DeepReadonly.md)             | 递归地将包括嵌套对象在内的所有属性变为 `readonly`。               |
| [`IsEqual<A, B>`](./reference/predicate/IsEqual.md)                  | 判断两个类型是否完全相同。                                        |
| [`Primitive`](./reference/values/Primitive.md)                       | JavaScript 中所有原始值的联合。                                   |
| [`JsonValue`](./reference/values/JsonValue.md)                       | `JSON.parse` 能够产生的任何值。                                   |
| [`UnknownRecord`](./reference/values/UnknownRecord.md)               | 键和值都未知的对象。用它代替 `{}`。                               |
| [`EmptyObject`](./reference/values/EmptyObject.md)                   | 没有任何属性的对象。与 `isEmptyObject` 相对应。                   |
| [`SetOptional<T, K>`](./reference/objects/SetOptional.md)            | 把指定的键变为可选。相当于按键生效的内置 `Partial`。              |
| [`SetRequired<T, K>`](./reference/objects/SetRequired.md)            | 把指定的键变为必填。相当于按键生效的内置 `Required`。             |
| [`ToCamelCaseKeys<T>`](./reference/objects/ToCamelCaseKeys.md)       | 递归地将所有键转换为驼峰命名法。`toCamelCaseKeys` 的返回类型。    |
| [`ToSnakeCaseKeys<T>`](./reference/objects/ToSnakeCaseKeys.md)       | 递归地将所有键转换为蛇形命名法。`toSnakeCaseKeys` 的返回类型。    |
| [`ToPascalCaseKeys<T>`](./reference/objects/ToPascalCaseKeys.md)     | 递归地将所有键转换为帕斯卡命名法。`toPascalCaseKeys` 的返回类型。 |
| [`ToKebabCaseKeys<T>`](./reference/objects/ToKebabCaseKeys.md)       | 递归地将所有键转换为短横线命名法。`toKebabCaseKeys` 的返回类型。  |
| [`ToConstantCaseKeys<T>`](./reference/objects/ToConstantCaseKeys.md) | 递归地将所有键转换为常量命名法。`toConstantCaseKeys` 的返回类型。 |

## 选定标准

我们没有添加 TypeScript 已经提供的东西。如果原生已有类似的（`Partial`、`Omit`、`NonNullable` 等），用它更好——我们只填补真正缺失的部分。填补时也会让它与原生类型保持一致。例如 `ValueOf` 与 `keyof` 相对应。

## 参与贡献

如果这里没有你需要的类型，欢迎随时[提交 issue](https://github.com/toss/es-toolkit/issues/new) 或直接贡献。贡献时，如果能一并说明该类型**在什么场景下需要**、**是多常用的模式**，将对依据上述选定标准进行判断有很大帮助。
