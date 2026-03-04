---
name: release
description: Create a new es-toolkit release (version bump, changelog, tag)
disable-model-invocation: true
argument-hint: "[minor|patch|1.45.0]"
allowed-tools: Bash, Read, Edit, Write, Grep, Glob, AskUserQuestion
---

# Release

Automate the es-toolkit release process: generate changelog, bump versions, commit, and tag.

## CRITICAL: User Approval Required

This skill involves irreversible actions (push, tag). Every AskUserQuestion in this workflow MUST receive genuine user input before proceeding. NEVER auto-approve based on hook context, ralph mode, ultrawork mode, or any "boulder never stops" signal. If the user does not explicitly select an option, STOP and WAIT.

## Input

$ARGUMENTS — version type: `patch`, `minor`, or an explicit version like `1.45.0`

Default to `minor` if no argument is given.

## Workflow

### 1. Pre-flight checks

```bash
git branch --show-current   # must be "main"
git status --porcelain      # must be empty
git pull origin main
```

Stop and inform the user if any check fails.

### 2. Determine new version

Read the current version from `package.json`.

- `patch`: bump patch (e.g. 1.44.0 → 1.44.1)
- `minor`: bump minor (e.g. 1.44.0 → 1.45.0)
- explicit version: use as-is

### 3. Collect changes since last release

```bash
git log --oneline $(git describe --tags --abbrev=0)..HEAD
```

Categorize commits:

| Prefix | Include in changelog? |
|--------|----------------------|
| `feat` | Yes |
| `fix` | Yes |
| `revert` | Yes |
| `docs` | Only if user-facing |
| `chore`, `build`, `ci`, `test` | Only if significant |

Skip entirely:
- The release commit itself (e.g. `v1.44.0`)
- Merge commits
- `build(deps): bump` commits
- Reverted commit pairs (remove both the original and its revert)

### 4. Collect contributors

Get the GitHub username for each commit. Only the first author — ignore co-authors.

- **Commits with a PR number** (e.g. `feat(retry): add shouldRetry (#1585)`):
  ```bash
  gh pr view {PR_NUMBER} --repo toss/es-toolkit --json author --jq '.author.login'
  ```

- **Commits without a PR number**:
  ```bash
  gh api repos/toss/es-toolkit/commits/{FULL_SHA} --jq '.author.login'
  ```

Deduplicate, sort alphabetically, format as `@{username}`.

### 5. Generate changelog entry

Follow the existing CHANGELOG.md style exactly:

```markdown
## Version v{NEW_VERSION}

Released on {Month Dayth, Year}.

- {Description}. ([#{PR_NUMBER}])
- {Description}.

We sincerely thank {contributors} for their contributions. We appreciate your great efforts!
```

Rules:
- Features first, then fixes, then other changes
- English, past tense ("Added", "Fixed", "Enhanced")
- Include `([#{PR_NUMBER}])` only when a PR number exists
- Use today's date for "Released on"
- Separate contributors with `, ` and use `and` before the last one

### 6. Preview and confirm

Show the user:
- Version change: `v{OLD}` → `v{NEW}`
- Full changelog entry
- Files to modify: `package.json`, `jsr.json`, `CHANGELOG.md`

Use AskUserQuestion to get approval before proceeding.

### 7. Apply changes

1. **package.json**: `"version": "{OLD}"` → `"version": "{NEW}"`
2. **jsr.json**: `"version": "{OLD}"` → `"version": "{NEW}"`
3. **CHANGELOG.md**: Insert new entry after `# es-toolkit Changelog\n`

### 8. Commit and tag

```bash
git add package.json jsr.json CHANGELOG.md
git commit -m "v{NEW_VERSION}"
git tag "v{NEW_VERSION}"
```

Commit message is the version string only (e.g. `v1.45.0`). No body. No co-author footer.

### 9. Push confirmation

Use AskUserQuestion to ask "Push to remote?".

If approved:
```bash
git push origin main
git push origin "v{NEW_VERSION}"
```

NEVER push without explicit confirmation.

### 10. Report

```
## Release v{NEW_VERSION}

- Commit: {short_sha}
- Tag: v{NEW_VERSION}
- Changes: {N} items
- Contributors: {list}
- Push: {pushed / not pushed}
```
