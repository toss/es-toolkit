# es-toolkit Plugin for Claude Code

Official Claude Code plugin for [es-toolkit](https://es-toolkit.dev) — a modern JavaScript utility library that's fast, small, and type-safe.

## Installation

### Claude Code plugin (recommended)

```
/plugin marketplace add toss/es-toolkit
/plugin install es-toolkit@es-toolkit-plugin
```

### skills.sh

```bash
npx skills add toss/es-toolkit
```

### Local development

```bash
claude --plugin-dir ./es-toolkit-plugin
```

After installing, run `/reload-plugins` to load the skills.

## Skills

| Skill            | Command                    | Description                                                       |
| ---------------- | -------------------------- | ----------------------------------------------------------------- |
| **Guide**        | `/es-toolkit:guide`        | Installation, import patterns, setup for Node.js/Bun/Deno/browser |
| **Recommend**    | `/es-toolkit:recommend`    | Find the right es-toolkit function for your use case              |
| **Migrate**      | `/es-toolkit:migrate`      | Convert lodash code to es-toolkit                                 |
| **Compat Guide** | `/es-toolkit:compat-guide` | Understand es-toolkit vs es-toolkit/compat                        |

All skills verify information from the local source code first, with [official documentation](https://es-toolkit.dev) as a fallback.

## Usage Examples

### Get started

```
/es-toolkit:guide install
/es-toolkit:guide How do I use es-toolkit in Deno?
/es-toolkit:guide What import style is best for tree shaking?
```

### Find the right function

```
/es-toolkit:recommend I need to deeply merge two objects
/es-toolkit:recommend remove falsy values from an array
```

### Migrate from lodash

```
/es-toolkit:migrate _.chunk(users, 10)
/es-toolkit:migrate convert all lodash imports in this file
```

### Understand the compat layer

```
/es-toolkit:compat-guide get
/es-toolkit:compat-guide migration strategy
```

## How It Works

Each skill reads the local source code and documentation first to ensure accuracy, and falls back to `https://es-toolkit.dev/llms.txt` only when needed. This means all recommendations are grounded in the actual codebase — not generic JavaScript advice.

## Links

- [es-toolkit Documentation](https://es-toolkit.dev)
- [GitHub Repository](https://github.com/toss/es-toolkit)
- [npm Package](https://www.npmjs.com/package/es-toolkit)
- [llms.txt (for AI tools)](https://es-toolkit.dev/llms.txt)
