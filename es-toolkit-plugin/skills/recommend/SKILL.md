---
name: recommend
description: Find the right es-toolkit function for a task. Use when the user asks which es-toolkit function to use, needs a utility for something, or wants to replace a hand-written helper.
argument-hint: '<what you need, or paste your code>'
allowed-tools: Read, Grep, Glob, Bash
---

# Function Recommendation

## Verify before you recommend

Never recommend from memory. Two failures are common and both produce code that compiles and then breaks at runtime:

- recommending a function that does not exist
- recommending a real function from the wrong entry point

Measured with Claude Haiku 4.5, the second one hit 7 of 15 lodash-equivalent functions and reproduced 21/21 across repeated runs. Verifying costs one command, so do it regardless of which model you are.

The entry points are `es-toolkit` (strict), `es-toolkit/fp` (data-last with `pipe`), `es-toolkit/server` (Node-only), `es-toolkit/types` (type-only), and `es-toolkit/compat` (lodash-compatible). Counts and contents shift between versions, so resolve them with the script below rather than from memory.

## Step 1 — Find candidates and where they live

Search what the installed version actually exports, **running from the project root** (from `/tmp` the import fails):

```bash
node --input-type=module -e "
const pattern = /merge|assign/i;
const entries = ['es-toolkit','es-toolkit/fp','es-toolkit/server','es-toolkit/compat'];
const mods = await Promise.all(entries.map(e => import(e)));
const hits = new Map();
mods.forEach((m, i) => Object.keys(m).filter(n => pattern.test(n)).forEach(n => hits.set(n, [...(hits.get(n) ?? []), entries[i]])));
for (const [n, where] of [...hits].sort()) console.log(n.padEnd(20), where.join(', '));
"
```

Adjust `pattern` to the task. The output is authoritative — it reflects the version the user installed, so it never goes stale.

If nothing matches, say so plainly and suggest a plain-JavaScript approach. Do not invent a function name.

Note that **a function can live in several entry points at once** — `map` and `filter` are in both `fp` and `compat` but not in strict, while `chunk` is in all three. Read the whole list, not the first hit.

## Step 2 — Choose the entry point

`es-toolkit`, `es-toolkit/fp`, `es-toolkit/server`, and `es-toolkit/types` are all first-class — recommend whichever fits the task:

- `es-toolkit` — the default
- `es-toolkit/fp` — data-last functions for `pipe` composition
- `es-toolkit/server` — Node-only helpers (`exec`, `colors`)
- `es-toolkit/types` — type utilities; **type-only, so the search above cannot see it** (`import('es-toolkit/types')` throws `ERR_PACKAGE_PATH_NOT_EXPORTED`). Use `import type` and read `./node_modules/es-toolkit/types.d.ts` directly.

**Recommend `es-toolkit/compat` only when there is a specific reason** — the function exists nowhere else, or the user explicitly needs lodash-exact behavior. compat is a migration layer, not the destination: it is feature-complete and receives no new functions. When you do recommend it, say why, and mention the strict alternative if one exists.

## Step 3 — Read the real signature

Read `./node_modules/es-toolkit/dist/{category}/{fn}.d.ts` (or `dist/compat/...`, `dist/fp/...`). It carries the full JSDoc, parameter docs, and `@example`. Take the signature and example from there rather than recalling them.

Watch for arity and mutation, which are the details most often gotten wrong — for instance `merge(target, source)` takes exactly two arguments and mutates `target`, while `toMerged` returns a new object.

## Step 4 — Answer

For each recommendation give: the function name, the exact import line, what it does (from its JSDoc), and a short example.

When several functions could fit, add a small table contrasting them on the axis that actually decides the choice — mutation vs. copy, arity, input type — and a one-line "use X when…" for each. Skip the table when there is only one sensible answer.

Mention edge cases you saw in the source that would surprise the caller (for example: deep merge combines arrays index by index, so `['a','b']` merged with `['c']` yields `['c','b']`).

If the user is porting existing lodash code, point them to `/es-toolkit:migrate`.

## Linking to docs

Function pages need the `.html` suffix or the site 404s:

- strict: `https://es-toolkit.dev/reference/{category}/{fn}.html`
- compat: `https://es-toolkit.dev/compat/reference/{category}/{fn}.html`
- fp: `https://es-toolkit.dev/fp/reference/{fn}.html` (flat, no category)

If you are unsure a page exists, omit the link rather than guessing one.
