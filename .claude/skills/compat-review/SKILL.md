---
name: compat-review
description: Verify compat PR claims by running lodash vs es-toolkit/compat at runtime
argument-hint: '<PR number or function name>'
allowed-tools: Bash, Read, Write, Grep, Glob
---

# Compat Layer Review

Verify that a compat PR actually fixes a real lodash inconsistency.

## Input

$ARGUMENTS — PR number (e.g. `1234`) or function name (e.g. `chunk`)

## Workflow

### 1. Identify target function and PR claims

**PR number**:

```bash
gh pr view {number} --repo toss/es-toolkit --json title,body,files
```

From the PR description and diff, extract:

- Which compat function is being fixed
- What inconsistency the contributor claims (expected vs actual behavior)
- Any test examples the contributor provides

**Function name**: Read the function source and its spec to understand current behavior.

### 2. Build comparison test

Create a temporary vitest spec at `src/compat/{category}/_compat-review-{fn}.spec.ts`.

```typescript
import { describe, expect, it } from 'vitest';
import { fn as compatFn } from 'es-toolkit/compat';
import { fn as lodashFn } from 'lodash';
```

Include two groups of test cases:

**A. Contributor's claimed examples** — Extract directly from the PR description or test diff. These are the cases the PR claims to fix.

**B. ~10 additional edge cases you generate** — Based on the function's signature and lodash's known behavior patterns:

- Empty inputs: `[]`, `{}`, `''`, `0`
- Nullish: `null`, `undefined`
- Negative/zero/float numbers: `-1`, `0`, `1.5`, `NaN`, `Infinity`
- Type coercion: string numbers (`'3'`), boolean, mixed types
- Boundary: single-element arrays, very long strings, deeply nested objects
- Pick cases that are relevant to the specific function

Each test:

```typescript
it('description', () => {
  let lodashResult, compatResult;
  let lodashErr: any, compatErr: any;
  try {
    lodashResult = lodashFn(args);
  } catch (e) {
    lodashErr = e;
  }
  try {
    compatResult = compatFn(args);
  } catch (e) {
    compatErr = e;
  }

  if (lodashErr && compatErr) return; // both throw = consistent
  if (lodashErr || compatErr) {
    throw new Error(`Behavior mismatch: ${lodashErr ? 'lodash throws' : 'compat throws'}`);
  }
  expect(compatResult).toEqual(lodashResult);
});
```

### 3. Run comparison BEFORE the PR change

```bash
yarn vitest run src/compat/{category}/_compat-review-{fn}.spec.ts
```

Record which tests fail — these are real inconsistencies that exist on main.

### 4. Apply PR changes and re-run

```bash
gh pr diff {number} --repo toss/es-toolkit | git apply
```

Run the same test again. Confirm that:

- The contributor's claimed examples now pass
- The additional edge cases still pass (no regressions)

Revert after testing:

```bash
git checkout -- .
```

### 5. Clean up

Delete `_compat-review-*.spec.ts`.

### 6. Report

```
## {fn} — Compat Review

### PR Claim
{What the contributor says they're fixing}

### Verification (BEFORE fix)
| # | Input | lodash | compat | Match? | Source |
|---|-------|--------|--------|--------|--------|
| 1 | ...   | ...    | ...    | MISMATCH | PR example |
| 2 | ...   | ...    | ...    | MATCH    | Edge case |

### Verification (AFTER fix)
| # | Input | lodash | compat | Match? | Source |
|---|-------|--------|--------|--------|--------|

### Verdict
- [ ] PR claim is valid (inconsistency confirmed on main)
- [ ] Fix resolves the claimed inconsistency
- [ ] No regressions in edge cases
- [ ] Existing tests still pass
```
