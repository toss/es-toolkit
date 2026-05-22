# es-toolkit/compat

`es-toolkit/compat` 提供与 [Lodash](https://lodash.com) 完全一致的接口和行为。它的目标是让你保留现有 Lodash 代码的调用方式，逐步迁移到 `es-toolkit`。

如果你的项目本来就不使用 Lodash，请使用 [`es-toolkit`](/zh_hans/intro)。

::: tip ✅ 自 v1.39.3 起保证与 Lodash 100% 兼容
`es-toolkit/compat` 直接通过 Lodash 自身的测试代码。行为完全相同，但更小、更快。
:::

```ts
// 与 lodash 相同的调用方式，可以直接在 es-toolkit/compat 中使用
import { chunk } from 'es-toolkit/compat';

chunk([1, 2, 3, 4], 0);
// 返回 []，与 lodash 相同。
```

## 迁移流程

从现有代码中移除 Lodash 时，推荐按以下顺序操作：

1. 将 `lodash` / `lodash-es` 的 import 路径替换为 `es-toolkit/compat`。调用代码可以保持不变。
2. 慢慢整理调用代码，并将 import 切换为 [`es-toolkit`](/zh_hans/intro)。完成迁移后，你将获得更小的包体积和更快的运行速度。

## 与 `es-toolkit` 的区别

- **API 形态**：与 Lodash 1:1 一致，包括隐式类型转换、多种参数形态以及已弃用的辅助函数。[`es-toolkit`](/zh_hans/intro) 只暴露类型安全的现代形态。
- **包体积与性能**：比 [`es-toolkit`](/zh_hans/intro) 稍大、稍慢，因为内部包含了与 Lodash 对齐行为所需的额外处理。
- **已弃用函数**：Lodash 中已弃用的函数仍保留在 `compat` 中以保持兼容，但不会加入 [`es-toolkit`](/zh_hans/intro)。建议在迁移过程中一并清理。

各函数的详细文档请参见 [兼容性参考](/zh_hans/compat/reference/array/castArray)。

## 设计原则

::: info
设计原则可能会有所变化。
:::

`es-toolkit/compat` 的目标是为以下功能提供与 `lodash` 100% 相同的实现：

- 在 lodash 中作为测试用例编写的功能。
- 可以从 `@types/lodash` 或 `@types/lodash-es` 类型推断的功能。
- 在将代码从 lodash 迁移到 es-toolkit 时识别出的功能差异（请将这些差异报告到我们的[问题页面](https://github.com/toss/es-toolkit/issues)）。

但是，以下内容超出 `es-toolkit/compat` 的范围：

- 隐式类型转换，例如将空字符串转换为零或 false。
- 针对特定类型数组具有专门实现的函数，如 [sortedUniq](https://lodash.com/docs/4.17.15#sortedUniq)。
- 处理修改了内置对象（如 `Array.prototype`）原型的情况。
- 处理 JavaScript Realm 的情况。
- 通过 "Seq" 方法支持的方法链。

## 实现状态

::: info
以下表情符号表示每个功能的状态：

- ✅: 已完成（功能已完全实现，并通过 lodash 测试代码的所有测试。）
- 📝: 审查中（功能已实现，但尚未通过 lodash 测试代码进行测试。）
- ❌: 未实现（该功能尚未实现。）

即使一个功能被标记为"审查中"，它可能已经在审查中以确保与 lodash 完全匹配，并且可能已经提供了相同的功能。
:::

<CompatibilityStatus lang="zh_hans"/>
