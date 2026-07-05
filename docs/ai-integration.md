# AI Integration

es-toolkit is committed to helping AI agents make the most of our library. We provide Agent Skills for AI coding tools as well as llms.txt endpoints for broader AI integration.

## Agent Skills

es-toolkit provides [Agent Skills](https://skills.sh) — reusable instructions that help AI coding tools understand and use es-toolkit effectively. They work with Claude Code, Cursor, Copilot, Windsurf, and other supported tools.

### Installation

::: code-group

```sh [npx (All AI Tools)]
npx skills add toss/es-toolkit
```

```sh [Claude Code Plugin]
/plugin marketplace add toss/es-toolkit
/plugin install es-toolkit@es-toolkit-plugin
```

:::

### Available Skills

| Skill         | Description                                          |
| ------------- | ---------------------------------------------------- |
| **guide**     | Installation, import patterns, and runtime setup     |
| **recommend** | Find the right es-toolkit function for your use case |
| **migrate**   | Migrate lodash code to es-toolkit                    |

### Usage Examples

```
/es-toolkit:guide How do I use es-toolkit in Deno?
/es-toolkit:recommend I need to deeply merge two objects
/es-toolkit:migrate _.chunk(users, 10)
```

## llms.txt

As part of this effort, es-toolkit provides [llms.txt](https://llmstxt.org/) files — a standard that helps AI assistants and large language models (LLMs) understand project documentation more effectively.

### `/llms.txt`

A structured table of contents of es-toolkit's documentation, including links to individual pages. This is useful when an AI tool needs to look up specific functions or topics.

- **URL**: [https://es-toolkit.dev/llms.txt](https://es-toolkit.dev/llms.txt)

### `/llms-full.txt`

The complete content of all documentation pages combined into a single file. This is useful when you want to provide the AI tool with comprehensive context about es-toolkit.

- **URL**: [https://es-toolkit.dev/llms-full.txt](https://es-toolkit.dev/llms-full.txt)

### Usage with AI Tools

Many AI tools and LLM-powered applications support the llms.txt standard. You can use these endpoints to give AI assistants full context about es-toolkit's API and features.

For example, you can provide the URL to an AI coding assistant so it can reference es-toolkit's documentation when helping you write code:

```
Use es-toolkit for utility functions. Documentation: https://es-toolkit.dev/llms-full.txt
```
