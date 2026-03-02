---
name: pr-triage
description: Classify and summarize a PR for efficient review
argument-hint: "<PR number>"
allowed-tools: Bash, Read, Grep, Glob
---

# PR Triage

Classify and summarize a PR for review.

## Input

$ARGUMENTS — PR number (e.g. `1234`)

## Workflow

### 1. Fetch PR info

```bash
gh pr view {number} --repo toss/es-toolkit --json title,body,author,files,labels
```

### 2. Classify the PR

Based on changed files, assign one or more labels:

| Pattern | Label | Review Focus |
|---------|-------|-------------|
| `src/compat/**/*.ts` (not spec) | **compat-fix** | Real lodash inconsistency? Use `/compat-review` to verify. |
| `src/{category}/*.ts` (new file) | **new-function** | Follows design principles? Checklist: impl + spec + re-export + docs. |
| `src/{category}/*.ts` (modified) | **core-change** | Intentional behavior change? Breaking changes? |
| `src/**/*.spec.ts` | **test** | Edge cases covered? |
| `docs/**/*.md` | **docs** | All 4 languages updated? Translation quality? |
| Type-only changes in `.ts` | **types** | Backward-compatible? |
| `benchmarks/**` | **perf** | Fair benchmark? Sound methodology? |
| `.github/**`, config files | **infra** | CI/build impact? |

### 3. Run quick checks per label

- **compat-fix**: `yarn vitest run src/compat/{category}/{fn}.spec.ts`
- **new-function**: Check all checklist items exist (impl, spec, re-export, 4 language docs)
- **core-change**: `yarn vitest run src/{category}/{fn}.spec.ts` + `tsc --noEmit`
- **docs**: Check all 4 language files present and consistent
- **types**: `tsc --noEmit`

### 4. Report

```
## PR #{number} — {title}

### Classification: {labels}

### Changed Files
- {file list grouped by label}

### Quick Checks
- [ ] Tests pass
- [ ] Types pass
- [ ] {label-specific checks}

### Review Suggestions
{What to focus on based on the classification}
```
