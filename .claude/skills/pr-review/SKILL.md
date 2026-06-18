---
name: pr-review
description: Review recent PRs with deep context and label-specific checks
argument-hint: '[count=10]'
allowed-tools: Bash, Read, Grep, Glob, Skill
---

# PR Review

Fetch recent PRs, classify, read source code, and produce contextual reviews.

## Input

$ARGUMENTS — Number of PRs (default: `10`)

Examples:

- `/pr-review` — 10 most recent open PRs
- `/pr-review 20` — 20 PRs

## Workflow

### 1. Fetch recent PRs

```bash
gh pr list --repo toss/es-toolkit --state open --limit {count} --json number,title,author,labels,createdAt
```

### 2. Triage each PR

Run `/pr-triage {number}` for each PR to classify.

### 3. Deep review per PR

For each PR, go beyond classification — **read the actual source code** and provide context:

#### a. Read current code

Read the files being modified on main to understand the current behavior:

- Function source: what it does, how it works
- Existing tests: what's already covered
- JSDoc: documented behavior and examples

#### b. Understand the PR change

Read the diff to understand what's changing:

- What's the before vs after?
- Why does the contributor say this change is needed?
- Does the change match what the code actually needs?

#### c. Assess impact

- **Breaking changes**: Does the function signature change? Will existing users be affected?
- **JS spec alignment**: Does current behavior follow JS/lodash conventions? Does the PR break that?
- **Scope**: Are all affected files updated? (e.g., docs in all 4 languages, related functions)
- **Design principles**: Does this align with es-toolkit's 85% use case / simplicity philosophy?

#### d. Label-specific checks

- **compat-fix**: Run `/compat-review {number}`
- **new-function**: Check completeness (impl + spec + re-export + 4 lang docs)
- **core-change**: `yarn vitest run src/{category}/{fn}.spec.ts` + review breaking impact
- **docs**: Check all 4 language files updated consistently
- **types**: `tsc --noEmit`

### 4. Detect duplicates

Group PRs by same function name or same files modified.

### 5. Report per PR

For each PR, output:

```
### PR #{number} — {title}

**Classification**: {labels}
**Changed files**: {summary}

**Current code**: {what the function does now, with code snippet}
**PR change**: {what's changing and why, with before/after}
**Context**: {JS spec, lodash behavior, design principle considerations}

**Checkpoints**:
- {specific things to verify}

**Verdict**: {merge / merge with changes / hold for discussion / reject}
```

### 6. Summary

```
## PR Review — {date}

| # | Title | Label | Verdict |
|---|-------|-------|---------|

- {N} ready to merge
- {N} need changes
- {N} need discussion
- {N} potential duplicates
```
