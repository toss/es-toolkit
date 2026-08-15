---
name: issue-review
description: Review recent issues with labeling, context analysis, and duplicate detection
argument-hint: '[count=10]'
allowed-tools: Bash, Read, Grep, Glob, Skill
---

# Issue Review

Fetch recent issues, label unlabeled ones with context, detect duplicates.

## Input

$ARGUMENTS — Number of issues (default: `10`)

Examples:

- `/issue-review` — 10 most recent open issues
- `/issue-review 20` — 20 issues

## Workflow

### 1. Fetch recent issues

```bash
gh issue list --repo toss/es-toolkit --state open --limit {count} --json number,title,author,labels,createdAt
```

### 2. Deep review per issue

For each issue:

#### a. Read issue content

```bash
gh issue view {number} --repo toss/es-toolkit --json title,body,labels,comments
```

#### b. Read related source code

If the issue mentions a specific function:

- Read the function source to understand current behavior
- Read existing tests to see what's covered
- Check if there's already a compat variant

#### c. Provide context

- **Bug reports**: Is the reported behavior actually a bug? Or is it by design? Does lodash behave differently?
- **Feature requests**: Does this align with design principles? Is it replaceable by modern JS? Is it TC39 Stage 3+?
- **Type issues**: Read the current type signature, assess the proposed change
- **Docs**: Check what's currently documented vs what's being requested

#### d. Label if unlabeled

If no labels exist, run `/issue-label {number}`.

### 3. Detect duplicates

```bash
gh issue list --repo toss/es-toolkit --state all --search "{function name}" --limit 10 --json number,title,state,labels
```

Group by:

- Same function name in title
- Similar error descriptions
- Same feature being requested

### 4. Report per issue

```
### Issue #{number} — {title}

**Label**: {existing or newly applied}
**Context**: {what the function currently does, relevant code snippet}
**Analysis**: {is the request valid? design principle alignment?}
**Duplicates**: {similar issues if any}
**Action**: {label applied / needs discussion / close as wontfix / link to existing PR}
```

### 5. Summary

```
## Issue Review — {date}

| # | Title | Label | Duplicate? | Action |
|---|-------|-------|------------|--------|

- {N} issues reviewed
- {N} newly labeled
- {N} potential duplicates
- {N} actionable bugs
- {N} feature requests
```
