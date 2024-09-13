# 与 Lodash 兼容性

```tsx
// es-toolkit/compat 的目标是提供与 lodash 百分之百的功能兼容性
import { chunk } from 'es-toolkit/compat';

chunk([1, 2, 3, 4], 0);
// 返回 [], 与 lodash 完全相同
```

为了最大限度地兼容 `lodash`，请使用 `es-toolkit/compat`，这是一个弥合这两个库之间差距的兼容性层。

该模块旨在提供与 `lodash` 相同的 API，使得在这两个库之间进行切换更加容易。

`es-toolkit/compat` 已经过 `lodash` 的实际测试用例进行了全面测试。

需要注意的是，与原始 `es-toolkit` 相比，`es-toolkit/compat` 可能会对性能产生轻微影响，并且包大小可能会更大。该模块旨在促进平滑过渡，一旦迁移完成，应替换回原始的 `es-toolkit` 以获得最佳性能。

## 设计原则

::: info
设计原则可能会发生变化。
:::

我们的兼容层旨在实现以下功能百分之百的特性一致性：

- 作为 lodash 测试用例编写的功能。
- 可以从 `@types/lodash` 或 `@types/lodash-es` 的类型推断出的功能。

然而，以下内容不在 `es-toolkit/compat` 的范围之内：

- 隐式类型转换，例如将空字符串转换为零或假。
- 对特定类型数组有专门实现的函数，比如 [sortedUniq](https://lodash.com/docs/4.17.15#sortedUniq)。
- 处理内部对象原型（例如 `Array.prototype`）被修改的情况。
- 处理涉及 JavaScript 领域(Realms)的情况。
- 通过 "Seq" 方法支持方法链。

## 实现状态

::: info
以下表情符号表示每个功能的状态：

- ✅: 已完成（该功能已完全实现，并通过了所有lodash测试代码。）
- 📝: 审查中（该功能已实现，但尚未使用lodash测试代码进行测试。）
- ❌: 未实现（该功能尚未实现。）

即使某个功能标记为“审查中”，它也可能已经在审查中，以确保其与lodash完全一致，并且可能已经提供了相同的功能。
:::

<CompatibilityStatus lang="zh_hans"/>
