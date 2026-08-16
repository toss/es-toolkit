# 为 es-toolkit 做贡献

我们欢迎社区中每个人的贡献。本仓库中的所有沟通都将使用英语。

> 每位对 es-toolkit 的贡献者都应遵守我们的行为准则。请阅读[全文](./CODE_OF_CONDUCT.md)以了解哪些行为是允许的，哪些是不被容忍的。

## AI 使用政策

我们鼓励你使用 AI 来协助调研、编写和审查贡献内容。用得好它是个不错的工具，我们自己也在用。

但你必须自己审阅并透彻理解所提交的内容。因此，**外部贡献者提交的问题和拉取请求描述必须由人类撰写**。你仍然可以借助 AI 来创建复现代码或熟悉代码库——这条规则只针对描述，因为维护者判断一份报告是否成立时，最先读的就是描述。

你要为以自己名义提交的一切内容负责，包括由 AI 替你写的代码。如果一份贡献明显没有被提交者本人读过——描述与实际改动对不上、复现代码从未运行过、修复的是并不存在的问题——我们会直接关闭，不做详细审查。

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

对于 TC39 提案中涵盖的函数，一旦进入 Stage 3，我们将不再实现。对于较早阶段的提案（Stage 2.7 或更低），如果确实有需要，我们可能会考虑添加，但一旦提案推进到 Stage 3 或更高阶段，我们会将其标记为弃用——因为届时使用原生实现是更好的选择。

#### `es-toolkit/compat`

为了帮助使用 [`Lodash`](https://lodash.com/docs/4.17.15) 的项目轻松迁移到 es-toolkit，`es-toolkit/compat` 实现了 `Lodash` 提供的函数。

`es-toolkit/compat` 的功能已经完备。我们不再向其中添加新函数，只修复与 Lodash 行为不一致的地方。

### 1.2 性能

es-toolkit 提供的所有函数应比替代库提供的函数性能更高或相似。

我们每次编辑代码时都会测量库的性能。我们使用 [Vitest 的基准测试功能](https://vitest.dev/api/#bench)。关于我们的基准测试代码，请参考我们的[基准测试目录](https://github.com/toss/es-toolkit/tree/main/benchmarks)。

当添加新函数时，应同时添加基准测试代码。关于提交拉取请求时需要附上哪些内容，请参见 [4.1 我们接受哪些改动](#41-我们接受哪些改动)。

### 1.3 简洁性

我们重视实现和接口的简洁性而非多样化的功能，以保证性能、代码可读性和易于维护。我们的函数不会提供复杂的选项来适应所有用例。

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

### 1.4 类型

提供准确的类型是 es-toolkit 的核心目标之一，与 TypeScript 自身的类型行为保持一致也同样重要。

es-toolkit 旨在返回与 TypeScript `strict` 模式相同的类型——这也是最广泛使用的配置。例如，下面的 `result1` 和 `result2` 应当具有相同的类型，因为 `result2` 本质上只是对 `result1` 直接执行的操作的封装：

```typescript
import { sample } from 'es-toolkit';

const arr = [1, 2, 3];

const result1 = arr[Math.floor(Math.random() * arr.length)]; // 在 TypeScript strict 模式下推断为 `number`
const result2 = sample(arr); // 同样应推断为 `number`
```

在 strict 模式下默认值仍为 `false` 的选项——例如 [noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig/noUncheckedIndexedAccess.html)——在确定 es-toolkit 的类型兼容性时不予考虑。

### 1.5 文档

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
- [在 Discussions 中提议新函数](https://github.com/toss/es-toolkit/discussions/new?category=ideas)
- [查看我们的问题列表](https://github.com/toss/es-toolkit/issues) 看看有哪些需要修复

## 4. 拉取请求

> [提交拉取请求](https://github.com/toss/es-toolkit/compare) <br/>

您可以提交自己的拉取请求。您的拉取请求标题应符合以下格式：

```
<类型>[函数名]: <描述>
```

> 我们不关心您提交历史中的提交数量或风格，因为我们会对每个 PR 进行压缩合并到主分支。<br/>
> 请以您觉得舒适的任何风格自由提交。

### 4.1 我们接受哪些改动

合并进来的代码，在这个库存续期间都要持续维护，而等待审查的拉取请求也已经排了很长的队。因此我们把接受的改动范围划得比较窄，也希望提前告诉你，而不是等你做完之后才发现。

动手写代码之前，请先阅读与你的改动相对应的部分。

#### 添加新函数

**请先开一个 [discussion](https://github.com/toss/es-toolkit/discussions/new?category=ideas)，等它被接受之后再动手。** 没有经过 discussion 就添加函数的拉取请求，即使实现得不错，我们也会关闭。

这不是因为我们不欢迎新函数，而是因为添加一个函数是一项长期承诺：它需要四种语言的文档，需要保持不慢于其他方案，而且一旦有人用上就收不回来了。另外，某个函数至今没有出现，本身可能就有原因——它也许可以用内置能力替代，也许正在通过 TC39 提案进入 JavaScript 本身（参见 [1.1 开发范围](#11-开发范围)）。先在 discussion 中把这些问题理清，你就不必为一个实现白白花掉一个晚上。

discussion 被接受之后，请在拉取请求中一并提供实现、测试、基准测试，以及四种语言的文档。

`es-toolkit/compat` 是个特例。它的存在是为了对齐 Lodash、方便项目迁移，而 Lodash 提供的函数它已经全部覆盖，所以我们完全不向其中添加新函数。

#### 性能优化

**欢迎，但请务必附上基准测试结果。** 请分别在 `main` 分支和你的分支上运行基准测试，并把两份结果贴到拉取请求里。

我们这样要求，是因为仅靠读代码无法分辨真正的提速和只是看起来更快的改动。现代 JavaScript 引擎的优化方式很难预测，写得更紧凑的代码，实测下来常常持平甚至更慢。如果只说变快了却没有数据，我们无从核实，只能关闭。

我们的基准测试使用 [Vitest 的基准测试功能](https://vitest.dev/api/#bench)，代码集中在[基准测试目录](https://github.com/toss/es-toolkit/tree/main/benchmarks)。

#### 修复与 Lodash 不一致的行为

**欢迎。** 这针对的是 `es-toolkit/compat`。与 Lodash 行为完全一致正是 compat 存在的意义——一旦返回值不同，正在迁移的项目就会以很难排查的方式出问题。

请用代码展示差异，而不是用文字描述：对于同一个输入，Lodash 返回什么，现在的 `es-toolkit/compat` 又返回什么。同时补上一个在改动前会失败、改动后会通过的测试，这样行为就不会再次跑偏。如果你改动的函数位于热点路径，请一并附上基准测试结果——compat 的修复往往会给频繁执行的代码增加分支。

#### 修复文档

**随时欢迎，而且不需要满足上面的任何条件。** 只要让四种语言的文档保持一致即可，文档格式请参考 [5. 编写文档指南](#5-编写文档指南)。

只有一点想拜托你：如果你发现了好几处零散的小问题——这里一个错别字，那里少了一个参数——请把它们合并到一个拉取请求里，而不是每处都单独开一个。一连串只改一行的拉取请求，总体上比把它们放在一起审查更费时间，也会把其他人的工作挤到更后面。

#### 纯粹的重构

**我们不接受这类改动。** 指的是重命名变量、把函数拆小，或者重写本就能正常工作的实现——总之行为完全没有变化的改动。

我们理解这种冲动，我们的代码也并非总是足够干净。但重构类的拉取请求会占用与其他改动同样多的审查精力，用户却什么都得不到；而且重写悄悄破坏边界情况的情况，比想象中更常见——尤其在 `es-toolkit/compat` 里，看起来别扭的代码，往往正是为了对齐 Lodash 别扭的行为。

如果你确实发现了值得整理的地方，最好的方式是把它放进一个 bug 修复，或者放进一个有实测数据的性能优化里。这样这份整理也就有了被审查的理由。

### 4.2 类型

**类型必须是以下之一**

如果您更改了已发布的代码：

- feat - 用于任何新增功能
- fix - 用于任何不增加新功能的修复

如果您未更改已发布的代码：

- docs - 如果您只更改了文档
- test - 如果您只更改了测试

其他：

- chore - 任何其他情况

### 4.3 函数名

您所做更改的函数名称。（例如：debounce, throttle）<br/>
如果您在多个包中进行了更改，编写包范围是可选的。

### 4.4 描述

清晰简洁地描述该拉取请求的内容。

## 5. 编写文档指南

每个函数都需要四种语言的文档，请同步维护：

- `docs/reference/{category}/{fn}.md` (英文)
- `docs/ko/reference/{category}/{fn}.md` (韩文，使用 ~해요체)
- `docs/ja/reference/{category}/{fn}.md` (日文)
- `docs/zh_hans/reference/{category}/{fn}.md` (简体中文)

可参考 [`sum`](../docs/zh_hans/reference/math/sum.md) 与 [`toCamelCaseKeys`](../docs/zh_hans/reference/object/toCamelCaseKeys.md) 这两份范例文档。

### 5.1 模板

````markdown
# {函数名}

{一句话说明}

<!-- prettier-ignore -->
```typescript
{简短示例代码}
```

## 用法

### `{签名}`

{先说明何时使用，再描述行为，使用自然流畅的句子。需要时可以在段落之间插入短小的代码示例。}

```typescript
import { {函数名} } from 'es-toolkit/{category}';

// 用一句话说明这个示例展示了什么。
{示例调用}
// Returns: {结果}
```

#### 参数

- `{名称}` (`{类型}`): {说明}.
- `{名称}` (`{类型}`, 可选): {说明}. 默认值为 `{默认值}`。

#### 返回值

(`{类型}`): {返回值的说明}.
````

### 5.2 如何填写

- **标题**：直接写函数名，不加任何后缀（例如 `# sum`、`# toCamelCaseKeys`）。
- **一句话说明**：用一句话概括函数的行为。出现像 "camelCase" 这样不太常见的概念时，可以再加一段简短的补充说明。
- **简短示例代码**：使用 `arr`、`numbers`、`obj` 等具有描述性的变量名而非具体值，让读者一眼看懂接口。
- **`### \`签名\``**：每个重载一个标题。能合并就合并，只有当行为真的不同时（例如数组与对象）才拆成多个。
- **正文说明**：按 "何时使用 → 如何运作" 的顺序，使用自然流畅的句子。不要使用 "说明：…" 这种冒号式风格。每个示例代码块以 `import { ... } from 'es-toolkit/{category}'` 开始，并在每次调用上方加一行注释。
- **参数**：``- `名称` (`类型`): 说明.``。可选参数在类型后追加 `可选` 并写出默认值。
- **返回值**：开头用括号写出类型，再接说明。

### 5.3 写作指南

- 使用通俗易懂的词语（例如使用 "长度相同的数组" 而不是 "均匀的数组"）。
- 使用 JavaScript 中更常见的术语（例如使用 "数组或对象" 而不是 "集合"）。
- 在非英文版本中，将英文术语展开为自然的本地表达（例如使用 "判断为真的值" 而不是 "truthy"）。
