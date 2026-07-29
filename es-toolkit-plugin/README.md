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

| Skill         | Command                 | Description                                                             |
| ------------- | ----------------------- | ----------------------------------------------------------------------- |
| **Recommend** | `/es-toolkit:recommend` | Find the right es-toolkit function for your use case                    |
| **Migrate**   | `/es-toolkit:migrate`   | Migrate lodash code to es-toolkit, and choose between strict and compat |

Both skills resolve every function against the es-toolkit version installed in your project, so their answers match what you actually have.

## Usage Examples

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

es-toolkit exposes three entry points — `es-toolkit` (strict), `es-toolkit/compat` (lodash-compatible), and `es-toolkit/fp` — and 158 functions available in `compat` do not exist in the strict API. Guessing which entry point a function belongs to is the single most common way generated code breaks: it type-checks, then resolves to `undefined` at runtime.

So instead of relying on recall, each skill resolves entry points against the copy of es-toolkit installed in your project, and reads signatures from its bundled type definitions. Answers therefore track your installed version rather than going stale.

## Links

- [es-toolkit Documentation](https://es-toolkit.dev)
- [GitHub Repository](https://github.com/toss/es-toolkit)
- [npm Package](https://www.npmjs.com/package/es-toolkit)
- [llms.txt (for AI tools)](https://es-toolkit.dev/llms.txt)
