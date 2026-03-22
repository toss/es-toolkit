# AI 集成

es-toolkit 致力于帮助 AI 代理充分利用我们的库。我们正在积极开发各种功能，让 AI 工具能够更轻松地理解、引用和使用 es-toolkit。

## llms.txt

作为第一步，es-toolkit 提供了 [llms.txt](https://llmstxt.org/) 文件。llms.txt 是一种帮助 AI 助手和大语言模型（LLM）更有效地理解项目文档的标准。

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
