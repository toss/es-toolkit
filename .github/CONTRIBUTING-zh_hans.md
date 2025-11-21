# 为 es-toolkit 做贡献

我们欢迎社区中每个人的贡献。本仓库中的所有沟通都将使用英语。

> 每位对 es-toolkit 的贡献者都应遵守我们的行为准则。请阅读[全文](./CODE_OF_CONDUCT.md)以了解哪些行为是允许的，哪些是不被容忍的。

## 包管理器

本项目使用 **Yarn 4** 作为其包管理器。当你运行 `yarn install` 时，正确的版本会通过 Corepack 自动安装。

开始步骤：

1. 确保已安装 Node.js（参见 `.nvmrc` 了解所需版本）
2. 启用 Corepack：`corepack enable`
3. 安装依赖：`yarn install`

## 1. 我们的设计原则

请注意，我们重视性能、实现的简单性以及详细的文档。我们的目标不是支持各种各样的功能和选项。我们的目标是提供一小套高性能且功能良好的实用工具。

### 1.1 开发范围

#### `es-toolkit`

es-toolkit 是一个高质量的实用函数库，包含现代 JavaScript 项目中常用的函数。

我们专注于实现那些难以用 JavaScript 内置方法创建，但又经常需要且有用的函数。

例如：[`delay`](https://es-toolkit.dev/reference/promise/delay.html), [`windowed`](https://es-toolkit.dev/reference/array/windowed.html), [`keyBy`](https://es-toolkit.dev/reference/array/keyBy.html), [`mapValues`](https://es-toolkit.dev/reference/object/mapValues.html), [`camelCase`](https://es-toolkit.dev/reference/string/camelCase.html), 和 [`toSnakeCaseKeys`](https://es-toolkit.dev/reference/object/toSnakeCaseKeys.html)。

我们不实现那些可以轻松被现代 JavaScript 替代的函数，例如：

- `isArray`（改用 `Array.isArray`）
- `isNaN`（改用 `Number.isNaN`）
- `isNumber`（改用 `typeof value === 'number'`）
- `min`（改用 `Math.min()`）

#### `es-toolkit/compat`

为了帮助使用 [`Lodash`](https://lodash.com/docs/4.17.15) 的项目轻松迁移到 es-toolkit，我们实现了 `Lodash` 提供的所有函数。

### 1.2 性能

es-toolkit 提供的所有函数应比替代库提供的函数性能更高或相似。

我们每次编辑代码时都会测量库的性能。我们使用 [Vitest 的基准测试功能](https://vitest.dev/api/#bench)。关于我们的基准测试代码，请参考我们的[基准测试目录](https://github.com/toss/es-toolkit/tree/main/benchmarks)。

当添加新功能时，应添加基准测试代码。在提交拉取请求时，请附上基准测试的截图，以便于参考和历史跟踪。

### 1.3 简洁性

我们重视实现和接口的简洁性，而不是为了性能、代码可读性和易于维护而提供各种各样的功能。我们的函数不会提供复杂的选项来适应所有用例。

以此方式，我们不提供复杂的选项或充分利用重载等来支持边缘情况，我们的目标是为最常见的 85% 的用例提供最简单的接口和实现。

我们认识到实现相同功能有多种方法。如果性能差异小于 10%，请遵循我们的编码风格指南：

<details>
<summary>
1. 优先使用 <code>for</code> 循环而不是 <code>reduce</code>。
</summary>

在大多数情况下，我们倾向于使用 `for` 循环而不是 `reduce`。这是因为在没有像 [immer](https://github.com/immerjs/immer) 这样的工具的情况下，使用 `reduce` 维护不可变性可能很困难，并且函数式编程通常允许局部可变性。

例如，我们更倾向于使用 `for ... of` 循环来实现 `keyBy`，而不是使用 `reduce`。

```typescript
export function keyBy<T, K extends PropertyKey>(arr: readonly T[], getKeyFromItem: (item: T) => K): Record<K, T> {
  const result = {} as Record<K, T>;

  for (const item of arr) {
    const key = getKeyFromItem(item);
    result[key] = item;
  }

  return result;
}
```

</details>

<details>
<summary>
2. 优先使用 JavaScript 内置函数和操作符。
</summary>

我们倾向于使用 JavaScript 内置函数、方法或操作符，如 `Array.isArray()`、`typeof value === 'string'` 和 `Number.isNaN()`。避免使用来自 `es-toolkit` 或其他库的自定义函数，如 `isArray()`、`isString()` 或 `isNaN()`。

这有助于保持代码更简洁，消除不必要的函数调用，并减少函数间的耦合。

</details>

### 1.4 文档

我们所有的函数都应详细记录，以便于参考。所有函数都应具有 JSDoc 以及[我们文档目录中](https://github.com/toss/es-toolkit/tree/main/docs)相应的文档，以说明其所有特性。

我们的主要语言是英语，但我们努力支持韩语、日语和简体中文的文档。如果您在用外语编写文档时遇到困难，请告知我们的贡献者，我们将帮助提供必要的翻译。

## 2. 编码规范

以下是我们在 `es-toolkit` 仓库中遵循的编码规范：

### 2.1 对类型参数使用短名称

- 对元素使用 `T`，例如在 [difference](https://es-toolkit.dev/reference/array/difference.html) 中。
- 对错误使用 `E`，例如在 [attempt](https://es-toolkit.dev/reference/util/attempt.html) 中。
- 对键使用 `K`，例如在 [groupBy](https://es-toolkit.dev/reference/array/groupBy.html) 中。

## 3. 问题

您可以通过以下方式为 es-toolkit 做贡献：

- 改进我们的[文档](https://es-toolkit.dev)
- [在我们的问题选项卡中报告错误](https://github.com/toss/es-toolkit/issues/new/choose)
- [请求新功能或新包](https://github.com/toss/es-toolkit/issues/new/choose)
- [查看我们的问题列表](https://github.com/toss/es-toolkit/issues) 看看有哪些需要修复

## 4. 拉取请求

> [提交拉取请求](https://github.com/toss/es-toolkit/compare) <br/>

您可以提交自己的拉取请求。您的拉取请求标题应符合以下格式：

```
<类型>[函数名]: <描述>
```

> 我们不关心您提交历史中的提交数量或风格，因为我们会对每个 PR 进行压缩合并到主分支。<br/>
> 请以您觉得舒适的任何风格自由提交。

### 4.1 类型

**类型必须是以下之一**

如果您更改了已发布的代码：

- feat - 用于任何新增功能
- fix - 用于任何不增加新功能的修复

如果您未更改已发布的代码：

- docs - 如果您只更改了文档
- test - 如果您只更改了测试

其他：

- chore - 任何其他情况

### 4.2 函数名

您所做更改的函数名称。（例如：debounce, throttle）<br/>
如果您在多个包中进行了更改，编写包范围是可选的。

### 4.3 描述

清晰简洁地描述该拉取请求的内容。
