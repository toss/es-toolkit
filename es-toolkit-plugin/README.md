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

| Skill         | Command                 | Description                                                                    |
| ------------- | ----------------------- | ------------------------------------------------------------------------------ |
| **Guide**     | `/es-toolkit:guide`     | Installation, import patterns, setup for Node.js/Bun/Deno/browser              |
| **Recommend** | `/es-toolkit:recommend` | Find the right es-toolkit function for your use case                           |
| **Migrate**   | `/es-toolkit:migrate`   | Guide migrating lodash code to es-toolkit, and understand strict vs compat API |

The skills are self-contained when installed individually. They inspect the es-toolkit version installed in your project, and they fall back to the source tree when run inside this repository. No repository-level symlinks or network requests are required.

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

### Understand strict vs compat

```
/es-toolkit:migrate get
/es-toolkit:migrate migration strategy
```

## How It Works

The recommendation and migration skills resolve exports and declarations from the es-toolkit version installed in your project. The guide reads the same package metadata when available and otherwise provides standalone setup guidance. When the skills run inside this repository, they can use its source and documentation directly.

## Links

- [es-toolkit Documentation](https://es-toolkit.dev)
- [GitHub Repository](https://github.com/toss/es-toolkit)
- [npm Package](https://www.npmjs.com/package/es-toolkit)
- [llms.txt (for AI tools)](https://es-toolkit.dev/llms.txt)
