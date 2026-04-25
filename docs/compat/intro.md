# es-toolkit/compat

`es-toolkit/compat` mirrors [Lodash](https://lodash.com)'s interface and behavior 1:1. It exists so you can lift an existing Lodash codebase into `es-toolkit` without rewriting call sites, and migrate to the strict API at your own pace.

If your project does not already use Lodash, please use [`es-toolkit`](/intro) instead.

::: tip ✅ 100% compatibility since v1.39.3
`es-toolkit/compat` passes Lodash's own test suite, so behavior is identical while staying lighter and faster.
:::

```ts
// Same call signature as lodash, but coming from es-toolkit/compat
import { chunk } from 'es-toolkit/compat';

chunk([1, 2, 3, 4], 0);
// Returns [], identical to lodash
```

## Migration flow

Recommended path for removing Lodash from an existing codebase:

1. Swap the import path from `lodash` / `lodash-es` to `es-toolkit/compat`. Leave call sites as they are.
2. Clean up call sites over time and switch the import to [`es-toolkit`](/intro). Once done, you get a smaller bundle and faster runtime.

## How it differs from `es-toolkit`

- **API shape**: matches Lodash 1:1, including implicit type coercions, multiple argument shapes, and deprecated helpers. [`es-toolkit`](/intro) only exposes the type-safe, modern forms.
- **Bundle size and speed**: slightly larger and slightly slower than [`es-toolkit`](/intro), because it carries extra logic to match Lodash's behavior.
- **Deprecated functions**: kept in `compat` for parity, not in [`es-toolkit`](/intro). Clean them up during migration.

For function-level documentation, see the [Compat Reference](/compat/reference/array/castArray).

## Design Principles

::: info
Design principles are subject to change.
:::

Our compatibility layer aims to achieve feature parity with 100% accuracy for:

- Features that are written as a test case in lodash.
- Features that can be inferred from types of `@types/lodash` or `@types/lodash-es`.
- Feature differences identified while migrating code from lodash to es-toolkit (please report these to our [issues page](https://github.com/toss/es-toolkit/issues)).

However, the following are out of scope for `es-toolkit/compat`:

- Implicit type conversions, such as converting an empty string to zero or false.
- Functions that have specialized implementations for specific types of arrays, like [sortedUniq](https://lodash.com/docs/4.17.15#sortedUniq).
- Handling cases where internal object prototypes, like `Array.prototype`, have been modified.
- Managing cases with JavaScript realms.
- Method chaining support through "Seq" methods.

## Implementation Status

::: info
The following emojis indicate the status of each feature:

- ✅: Completed (The function is fully implemented and has passed all tests with lodash test code.)
- 📝: In Review (The function is implemented but hasn't been tested with lodash test code yet.)
- ❌: Not Implemented (The function hasn't been implemented.)

Even if a feature is marked "in review," it might already be under review to ensure it matches lodash perfectly, and it could already offer the same functionality.
:::

<CompatibilityStatus lang="en"/>
