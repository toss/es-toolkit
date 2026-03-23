# AI 集成

es-toolkit 致力于帮助 AI 代理充分利用我们的库。我们为 AI 编程工具提供 Agent Skills，并通过 llms.txt 端点支持更广泛的 AI 集成。

## Agent Skills

es-toolkit 提供了 [Agent Skills](https://skills.sh) — 帮助 AI 编程工具有效理解和使用 es-toolkit 的可复用指令。它们可以在 Claude Code、Cursor、Copilot、Windsurf 等多种工具中使用。

### 安装

::: code-group

```sh [npx (所有 AI 工具)]
npx skills add toss/es-toolkit
```

```sh [Claude Code Plugin]
/plugin marketplace add toss/es-toolkit
/plugin install es-toolkit@es-toolkit-plugin
```

:::

### 可用技能

| 技能          | 描述                                   |
| ------------- | -------------------------------------- |
| **guide**     | 安装、导入模式和运行时设置指南         |
| **recommend** | 根据使用场景推荐合适的 es-toolkit 函数 |
| **migrate**   | 将 lodash 代码迁移到 es-toolkit        |

### 使用示例

```
/es-toolkit:guide 如何在 Deno 中使用 es-toolkit？
/es-toolkit:recommend 我需要深度合并两个对象
/es-toolkit:migrate _.chunk(users, 10)
```

## llms.txt

es-toolkit 提供了 [llms.txt](https://llmstxt.org/) 文件。llms.txt 是一种帮助 AI 助手和大语言模型（LLM）更有效地理解项目文档的标准。

### `/llms.txt`

es-toolkit 文档的结构化目录，包含各个页面的链接。当 AI 工具需要查找特定函数或主题时非常有用。

- **URL**: [https://es-toolkit.dev/llms.txt](https://es-toolkit.dev/llms.txt)

### `/llms-full.txt`

将所有文档页面的完整内容合并为一个文件。当您想要为 AI 工具提供关于 es-toolkit 的全面上下文时非常有用。

- **URL**: [https://es-toolkit.dev/llms-full.txt](https://es-toolkit.dev/llms-full.txt)

### 在 AI 工具中使用

许多 AI 工具和基于 LLM 的应用程序支持 llms.txt 标准。您可以使用这些端点为 AI 助手提供关于 es-toolkit API 和功能的完整上下文。

例如，您可以向 AI 编程助手提供 URL，以便它在帮助您编写代码时参考 es-toolkit 的文档：

```
请使用 es-toolkit 作为工具函数库。文档：https://es-toolkit.dev/llms-full.txt
```
