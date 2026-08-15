---
name: issue-label
description: Suggest and apply GitHub labels to unlabeled issues
argument-hint: '<issue number>'
allowed-tools: Bash, Read, Grep
---

# Issue Label

Analyze issue content and assign appropriate labels.

## Input

$ARGUMENTS — Issue number (e.g. `1234`)

## Available Labels

| Label                  | When to use                                                   |
| ---------------------- | ------------------------------------------------------------- |
| `p0: major bug`        | Core function broken, incorrect results, crashes              |
| `p1: minor bug`        | Edge case failures, non-critical behavior issues, type errors |
| `p1: docs bug`         | Wrong/outdated documentation, broken links                    |
| `p2: optimization`     | Performance improvements, bundle size reduction               |
| `p2: new feature`      | New function or capability request                            |
| `p2: type enhancement` | TypeScript type improvements, better generics                 |
| `p2: refactoring`      | Code cleanup, internal improvements                           |
| `p2: docs enhancement` | New docs, translations, better examples                       |
| `p3: discussion`       | Questions, design discussions, RFCs                           |
| `help wanted`          | Good for external contributors                                |

## Workflow

### 1. Fetch issue

```bash
gh issue view {number} --repo toss/es-toolkit --json title,body,labels
```

If labels already exist, report them and stop.

### 2. Analyze content

From title and body, identify:

- Is it a bug report? (error messages, "doesn't work", "incorrect", "doesn't match lodash")
- Is it a feature request? ("add", "implement", "support")
- Is it about docs? ("docs", "typo", "translation", "example")
- Is it about types? ("type", "TypeScript", "generic", "inference")
- Is it a question? (question marks, "how to", "is it possible")

### 3. Apply label

```bash
gh issue edit {number} --repo toss/es-toolkit --add-label "{label}"
```

### 4. Report

```
## Issue #{number} — {title}

### Applied Label: {label}
### Reason: {why this label fits}
```
